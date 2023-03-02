import { MusicSettings, DataStream4Ch, DataStream8Ch, CytonSettings, GanglionSettings } from "../Interfaces";
// import { getNoteData } from './Playback'
import {getMillisecondsFromBPM, findNumSamples, getIntFromNoteTypeString} from './MusicHelperFunctions';
import * as Enums from '../Enums';
import * as Constants from '../Constants';
import { instrumentList } from "./InstOvertoneDefinitions";


import MidiWriter from 'midi-writer-js';
import {encode, decode } from 'js-base64';
import musicGenerationSettingsSlice from "../../Redux/slices/musicGenerationSettingsSlice";
import { createModifiersFromModifierFlags } from "typescript";

export class MIDIManager {
    // Settings
    public MIDIChannels:MidiWriter.Track[] = [];
    public channel0:any;
    public settings:MusicSettings
    public MIDIURI:string;

    private stopFlag;

    public setStopFlag() {
        this.stopFlag = true;
        this.audioContext.close();
    }
    
    // Playback
    public audioQueue:any[] = [];
    private audioContext:AudioContext;
    private audioWorklet:AudioWorkletNode;
    
    // private numContexts:number[] = [];
    private timeForEachNoteArray:Array<number>;

    constructor(settings:MusicSettings, timeForEachNoteArray:Array<number>) {
        this.MIDIURI = "";
        var channel0 = new MidiWriter.Track();
        this.channel0 = channel0;
        var channel1 = new MidiWriter.Track();
        var channel2 = new MidiWriter.Track();
        var channel3 = new MidiWriter.Track();
        this.MIDIChannels.push(channel0, channel1, channel2, channel3)

        /*  This block initializes 4 more channels to write MIDI to in the case that
            we are using the cyton board, it does this by looking at the number of channels
            in the instrument setting since it is specific to the device. */
        // console.log(Object.keys(settings.deviceSettings.instruments))
        if((Object.keys(settings.deviceSettings.instruments).length) === 8) {
            var channel4 = new MidiWriter.Track();
            var channel5 = new MidiWriter.Track();
            var channel6 = new MidiWriter.Track();
            var channel7 = new MidiWriter.Track();
            this.MIDIChannels.push(channel4, channel5, channel6, channel7)
        }

        this.settings = settings;
        this.stopFlag = false;
        this.initializeSettings(settings);
        this.timeForEachNoteArray = timeForEachNoteArray;
        this.audioContext = new AudioContext();
        this.audioWorklet = new AudioWorkletNode(this.audioContext, "name");

    }
    
    public initializeSettings(settings:MusicSettings) {
        
        /* This is just a start, we're going to work on a condition here
           where the number of tempos get set by the type of settings */
        for(var i = 0; i < this.MIDIChannels.length; i++) {
            this.MIDIChannels[i].setTempo(settings.bpm, 0);
            this.MIDIChannels[i].setTimeSignature(4, 4);
        } 
    }

    private sliceIntoChunks(fileBuild:Uint8Array, chunkSize:number) {
        const res = [];
        for (let i = 0; i < fileBuild.length; i += chunkSize) {
            const chunk = fileBuild.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    public returnMIDI() {
        var write = new MidiWriter.Writer(this.MIDIChannels);
        var base64String = write.base64();
        var prefix = "data:audio/midi;base64,"
        prefix = prefix.concat(base64String);
        return prefix;
    }

    /* This function is a helper in order to return the proper type to assign to the
       pitch in the MidiWriter. There may be a better solution to this in the future
       but for now it's practical to use this implementation */
    private definePitch(note:string, octave:number) {
        var pitch:MidiWriter.Pitch;
        switch(note) {
            case 'A':
                pitch = `A${octave}`;
                break;
            case 'A#':
                pitch = `A#${octave}`;
                break;
            case 'B':
                pitch = `B${octave}`;
                break;
            case 'C':
                pitch = `C${octave}`
                break;
            case 'C#':
                pitch = `C#${octave}`
                break;
            case 'D':
                pitch = `D${octave}`
                break;
            case 'D#':
                pitch = `D#${octave}`
                break;
            case 'E':
                pitch = `E${octave}`
                break;
            case 'F':
                pitch = `F${octave}`
                break;
            case 'F#':
                pitch = `F#${octave}`
                break;
            case 'G':
                pitch = `G${octave}`
                break;
            case 'G#':
                pitch = `G#${octave}`
                break;
            default:
                pitch = `A${octave}`
                break;
        }
        return pitch;
    }

    public convertInput(noteData:any[]) {
        for(var i = 0; i < noteData.length; i++) {
            var noteDuration:MidiWriter.Duration = '1';

            /* This code block sets the data from the note manager into usable data for
               the midi-writer-js API. */
            if (noteData[i].writer.noteLength === "sixteenth") noteDuration = '16';
            else if (noteData[i].writer.noteLength === "eigth") noteDuration = '8';
            else if (noteData[i].writer.noteLength === "quarter") noteDuration ='4';
            else if (noteData[i].writer.noteLength === "half") noteDuration = '2';
            else if (noteData[i].writer.noteLength === "whole") noteDuration = '1';
            var generatedNote;
            var pitch:MidiWriter.Pitch = this.definePitch(noteData[i].writer.note, noteData[i].writer.octave);

            if (noteData[i].writer.note === -1)  continue;// Rest
                // generatedNote = new MidiWriter.NoteEvent({wait: noteDuration, duration: noteDuration, pitch: pitch});
                // generatedNote = new MidiWriter.NoteEvent({pitch: pitch, duration: noteDuration});

            else {
                generatedNote = new MidiWriter.NoteEvent({pitch: pitch, duration: noteDuration});
                this.MIDIChannels[i].addEvent(generatedNote);
            }
        }
    }

    private async playWhiteNoise() {
        const audioCtx = new window.AudioContext;

        // Create an empty three-second stereo buffer at the sample rate of the AudioContext
        const myArrayBuffer = audioCtx.createBuffer(
          2,
          audioCtx.sampleRate * 3,
          audioCtx.sampleRate
        );
        
        // Fill the buffer with white noise;
        //just random values between -1.0 and 1.0
        for (let channel = 0; channel < myArrayBuffer.numberOfChannels; channel++) {
          // This gives us the actual ArrayBuffer that contains the data
          const nowBuffering = myArrayBuffer.getChannelData(channel);
          
          
          for (let i = 0; i < myArrayBuffer.length; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]
            var arr = [-.2, -.7, 0, .4, .9];

            nowBuffering[i] = Math.random() * 2 - 1;
          }
        }
        
        // Get an AudioBufferSourceNode.
        // This is the AudioNode to use when we want to play an AudioBuffer
        const source = audioCtx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        source.buffer = myArrayBuffer;
        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioCtx.destination);
        // start the source playing
        source.start();
    }

    // random-noise-processor.js
    // class RandomNoiseProcessor extends AudioWorkletProcessor {
    //     super();
    //     process(inputs, outputs, parameters) {
    //     const output = outputs[0];
    //     output.forEach((channel) => {
    //         for (let i = 0; i < channel.length; i++) {
    //         channel[i] = Math.random() * 2 - 1;
    //         }
    //     });
    //     return true;
    //     }
    // }
    
    // registerProcessor("random-noise-processor", RandomNoiseProcessor);

    public async realtimeGenerate(noteData:any[]) {
        if(this.stopFlag) {
            this.audioContext.close();
            return;
        }
        
        var BPM = this.settings.bpm;
        var instruments = this.settings.deviceSettings.instruments;
        var instrumentsArr = [];

        var durations = this.settings.deviceSettings.durations;
        var durationsArr = [];

        // Convert instruments to array
        let inst: keyof typeof instruments;
        for (inst in instruments) {
          instrumentsArr.push(instruments[inst]);
        }

        let dur: keyof typeof durations;
        for (dur in durations) {
          durationsArr.push(durations[dur]);
        }        

        /*  This for loop is going to iterate through each EEG channel and generate a real time sound
            using the AudioContext WebAPI. For reference, the docs can be found here:   */
        for (var i = 0; i < noteData.length; i++) {  
            
            var playerInfo = noteData[i].player;

            // Setup for their vars
            var soundType = instrumentsArr[i];
            var duration = durationsArr[i];
            var amplitude = noteData[i].player.amplitude;
            
            
            

            this.audioQueue.push({
                freq: playerInfo.noteFrequency,
                playing: false,
                ctx: this.audioContext,
                buffer: this.getNoteData(soundType, playerInfo.noteFrequency, amplitude, this.audioContext, duration),
                node: this.audioContext.createBufferSource(),
                gain: this.audioContext.createGain(),
                needToClose: false,
            })


            if(this.audioQueue[i].playing) {
                // console.log("we are continuing");
                continue;
            }
            this.audioQueue[i].node.buffer = null;
            this.audioQueue[i].node.buffer = this.audioQueue[i].buffer;     // < ----------


            this.audioQueue[i].node.connect(this.audioQueue[i].gain);
            this.audioQueue[i].gain.connect(this.audioQueue[i].ctx.destination);


            this.audioQueue[i].gain.gain.value = amplitude;
            
            this.audioQueue[i].node.loop = false;
            
            //URGENT : THe commented line ONLY MAKES QUARTER NOTES (THANKS V3 <3)
            var qtr = getMillisecondsFromBPM(BPM) / 1000;
            var allLen = this.timeForEachNoteArray[i] / 1000;

            this.audioQueue[i].node.start(0, 0, qtr); // "0, i, qtr"
            this.audioQueue[i].buffer = null;
        }
        this.audioQueue[i].node.disconnect();

        
        return true;
    }

    private getNoteData(soundType:number, freq:number, amplitude:number, ctx:any, noteLength:number) {
        var buffer; // Local buffer variable.
        console.log("numsamples", findNumSamples(this.timeForEachNoteArray[noteLength]));


        // For each supported sound type we call the correct function.
        if (soundType === Enums.InstrumentTypes.SINEWAVE) {
            buffer = this.generateSineWave(findNumSamples(this.timeForEachNoteArray[noteLength]), freq, amplitude, ctx);
        }
        else if (soundType === Enums.InstrumentTypes.TRIANGLEWAVE) {
            buffer = this.generateTriangleWave(findNumSamples(this.timeForEachNoteArray[noteLength]), freq, amplitude, ctx);
        }
        else if (soundType === Enums.InstrumentTypes.SQUAREWAVE) {
            buffer = this.generateSquareWave(findNumSamples(this.timeForEachNoteArray[noteLength]), freq, amplitude, ctx);
        }
        else {
            buffer = this.generateInstrumentWave(findNumSamples(this.timeForEachNoteArray[noteLength]), freq, ctx, soundType);
        }

        return buffer;
    }

    private generateSineWave(numSamples:number, frequency:number, amplitude:number, ctx:any) {
        let PI_2 = Math.PI * 2;

        // Create the buffer for the node.
        let buffer = ctx.createBuffer(1, numSamples, Constants.sampleRate);
    
        // Create the buffer into which the audio data will be placed.
        let buf = buffer.getChannelData(0);
    
        // Loop numSamples times -- that's how many samples we will calculate and store.
        for (let i = 0; i < numSamples; i++) {
            // Calculate and store the value for this sample.
            buf[i] = Math.sin(frequency * PI_2 * i / Constants.sampleRate) * amplitude;
        }
    
        // Return the channel buffer.
        return buffer;
    }

    private generateTriangleWave(numSamples:number, frequency:number, amplitude:number, ctx:any) {

        // Here we calculate the number of samples for each wave oscillation.
        var samplesPerOscillation = Constants.sampleRate / frequency;
        // This is the first quarter of the oscillation. 0 - 1/4
        var first = samplesPerOscillation / 4;
        // This is the second quarter of the oscillation. 1/4 - 1/2
        var second = samplesPerOscillation / 2;
        // This is the third quarter of the oscillation. 1/2 - 3/4
        var third = (samplesPerOscillation / 2) + (samplesPerOscillation / 4);
        // We will count the samples as we go.
        var counter = 0;
    
        // Step value. This is how much the sample value changes per sample.
        var step = 1 / first;
    
        // Create the buffer for the node.
        var buffer = ctx.createBuffer(1, numSamples, Constants.sampleRate);
    
        // Create the buffer into which the audio data will be placed.
        var buf = buffer.getChannelData(0);
    
        // Loop numSamples times -- that's how many samples we will calculate and store.
        for (var i = 0; i < numSamples; i++) {
            // Increment the counter.
            counter++;
    
            // See if this is the first quarter.
            if (counter <= first) {
                // Store the value.
                buf[i] = step * counter * amplitude;
            }
            // See if this is the second quarter.
            else if (counter <= second) {
                // We want the count relative to this quarter.
                var cnt = counter - first;
    
                // Store the value.
                buf[i] = 1 - step * cnt * amplitude;
            }
            // See if this is the third quarter.
            else if (counter <= third) {
                // We want the count relative to this quarter.
                var cnt = counter - second;
    
                // Store the value.
                buf[i] = -(step * cnt) * amplitude;
            }
            // This is the fourth quarter.
            else {
                // We want the count relative to this quarter.
                var cnt = counter - third;
    
                // Store the value.
                buf[i] = -1 + (step * cnt) * amplitude;
    
                // See if we are done with this cycle.
                if (counter >= samplesPerOscillation) {
                    // Set to zero so we are ready for another cycle.
                    counter = 0;
                }
            }
        }
        return buffer;
    }

    private generateSquareWave(numSamples:number, frequency:number, amplitude:number, ctx:any) {

        // Here we calculate the number of samples for each wave oscillation.
        var samplesPerOscillation = Constants.sampleRate / frequency;
        // Create the value for the first oscillation change.
        var first = samplesPerOscillation / 2;
        // We will count the samples as we go.
        var counter = 0;
    
        // Create the buffer for the node.
        var buffer = ctx.createBuffer(1, numSamples, Constants.sampleRate);
    
        // Create the buffer into which the audio data will be placed.
        var buf = buffer.getChannelData(0);
    
        // Loop numSamples times -- that's how many samples we will calculate and store.
        for (var i = 0; i < numSamples; i++) {
            // Increment the counter.
            counter++;
    
            // This is the first half of the oscillation. it should be 1.
            if (counter <= first) {
                // Store the value.
                buf[i] = 1 * amplitude;
            }
            // This is the second half of the oscillation. It should be -1.
            else {
                // Store the value.
                buf[i] = -1 * amplitude;
    
                // See if we are done with this cycle.
                if (counter >= samplesPerOscillation) {
                    // Set to zero so we are ready for another cycle.
                    counter = 0;
                }
            }
        }
    
        // Return the channel buffer.
        return buffer;
    }

    private generateInstrumentWave(numSamples:number, frequency:number, ctx:any, soundType:number) {    
        // Get the instrument specs.
        let inst = this.getOvertoneFrequencies(soundType, frequency);
    
        // Precalculate 2PI
        let PI_2 = Math.PI * 2;
    
        // Create the buffer for the node.
        let buffer = ctx.createBuffer(1, numSamples, Constants.sampleRate);
    
        // Create the buffer into which the audio data will be placed.
        var buf = buffer.getChannelData(0);
    
        // Zero the buffer
        for (var i = 0; i < numSamples; i++) {
            buf[i] = 0;
        }
    
        // Loop through the instrument spec.
        for (var j = 0; j < inst.length / 2; j++) {
            // Get the frequency multiplier from the data array.
            var f = frequency * inst[j * 2];
            //console.log("f: ", f, ", which is ", frequency, " times ", inst[j*2])
            // Get the amplitude value from the data array.
            var a = inst[j * 2 + 1];
            //console.log("a: ", a)
            // Loop numSamples times -- that's how many samples we will calculate and store.
            for (var i = 0; i < numSamples; i++) {
                // Calculate and store the value for this sample.
                buf[i] += (Math.sin(f * PI_2 * i / Constants.sampleRate) * a);
                //buf[i] = frequency;
            }
        }
    
        // Return the channel buffer.
        return buffer;
    }

    private getOvertoneFrequencies(instrumentIndex:number, frequency:number) {
        // Get the list of note amplitude values for this instrument.
        let list = instrumentList[instrumentIndex];
        // We will start with a default value.
        let index = 0;
        //console.log("frequency : " + frequency, ", list: " + list + ", instrumentIndex: " + instrumentIndex);
        let diff = Math.abs(frequency - list[0][0]);
    
        // Loop through the list of frequencies/amplitudes and find the closest match.
        for (let i = 1; i < list.length; i++) {
            // Get the difference between incoming frequency value and the frequeny of this list element.
            let td = Math.abs(frequency - list[i][0]);
    
            // If this is less (we are closer to the specified frequency) then we record the index and remember the new difference.
            if (td < diff) {
                diff = td;
                index = i;
            }
        }
    
        // Here we take the current array and make a new array to return.
        let retList = [];
        for (let i = 1; i < list[index].length; i++) {
            retList.push(i); // Push the harmonic number.
            retList.push(list[index][i]); // Push the amplitude.
        }
    
        return retList;
    }

}