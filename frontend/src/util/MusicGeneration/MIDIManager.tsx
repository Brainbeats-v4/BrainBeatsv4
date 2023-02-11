import { MusicSettings, DataStream4Ch, DataStream8Ch, CytonSettings, GanglionSettings } from "../Interfaces";

import MidiWriter from 'midi-writer-js';
import {encode, decode } from 'js-base64';

export class MIDIManager {
    public MIDIChannels:MidiWriter.Track[] = [];
    public channel0:any;
    public settings:MusicSettings
    public audioQueue:any[] = [];
    private numContexts = 0;
    public MIDIURI:string;

    constructor(settings:MusicSettings) {
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
        console.log(Object.keys(settings.deviceSettings.instruments))
        if((Object.keys(settings.deviceSettings.instruments).length) === 8) {
            var channel4 = new MidiWriter.Track();
            var channel5 = new MidiWriter.Track();
            var channel6 = new MidiWriter.Track();
            var channel7 = new MidiWriter.Track();
            this.MIDIChannels.push(channel4, channel5, channel6, channel7)
        }

        this.settings = settings;
        this.initializeSettings(settings);
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
        // var fileBuild = write.buildFile()
        // const midiFileChunks = this.sliceIntoChunks(fileBuild, 5000); 
        var base64String = write.base64();
        // const fileString = midiFileChunks.map((midiFileChunk:Uint8Array) => {
        //     return String.fromCharCode.apply(null, Array.from(midiFileChunk));
        // }).join("");

        var prefix = "data:audio/midi;base64,"
        
        prefix = prefix.concat(base64String);

        console.log(prefix);

        return prefix;


        // this.MIDIURI = writeURI 

        // return prefix + encode(fileString);




        
        // return base64;
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

    // public async realtimeGenerate(noteData:any[]) {
    //     if (this.numContexts >= 45) {
    //         this.audioQueue[0].ctx.close();
    //         this.audioQueue[0].node.disconnect();
    //         this.audioQueue.shift();
    //         this.numContexts--; // Decrement the numContexts variable because we removed one from the queue
    //     }
    //     this.audioQueue.push({ freq: noteData[i].player.frequency, playing: false, ctx: 0, buffer: 0, node: 0, gain: 0, needToClose: false, number: numContexts });
    
    //     //console.log("Number of current contexts: " + numContexts + ", array: " + queueOfAudio);
    
    //     if (queueOfAudio[numContexts].playing)
    //         return false;
    
    //     queueOfAudio[numContexts].playing = true;
    //     queueOfAudio[numContexts].needToClose = false;
    
    //     queueOfAudio[numContexts].ctx = new AudioContext();
    //     queueOfAudio[numContexts].buffer = getNoteData(soundType, queueOfAudio[numContexts].freq, amplitude, queueOfAudio[numContexts].ctx, noteLength);
    //     queueOfAudio[numContexts].node = queueOfAudio[numContexts].ctx.createBufferSource();
    //     queueOfAudio[numContexts].node.buffer = queueOfAudio[numContexts].buffer;
    
    //     // We need this gain object so that at the end of the note play we can taper the sound.
    //     queueOfAudio[numContexts].gain = queueOfAudio[numContexts].ctx.createGain();
    //     queueOfAudio[numContexts].node.connect(queueOfAudio[numContexts].gain);
    //     queueOfAudio[numContexts].gain.connect(queueOfAudio[numContexts].ctx.destination);
    //     queueOfAudio[numContexts].gain.gain.value = amplitude;
    
    //     // Set to loop, although there is sill a perceptable break at the end.
    //     queueOfAudio[numContexts].node.loop = false;
    
    //     // Start the note.
    //     // This needs to be edited; the third argument of the function will only ever make quarter notes.
    //     queueOfAudio[numContexts].node.start(0, 0, getMilliecondsFromBPM(BPM) / 1000);
    
    //     // Increment the numContexts variable to reflect the new AudioContext added to the queue.
    //     numContexts++;
    
    //     return true;
    // }
}