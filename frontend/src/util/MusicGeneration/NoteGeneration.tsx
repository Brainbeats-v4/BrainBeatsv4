import {getNoteLengthStringFromInt, getInstrumentNameFromInt, getIntFromNoteTypeString, getIntFromNoteTypeStringWithMidiWriterJsValues,
	getNoteLengthMultiplier, getMillisecondsFromBPM, GetFloorOctave, findNumSamples, getFrequencyFromNoteOctaveString, roundTo7Decimal} from './MusicHelperFunctions';

// import {initMIDIWriter, addNoteToMIDITrack, printTrack, generateMIDIURIAndDownloadFile, generateMIDIURI, generateMIDIFileFromURI} from '../MusicGeneration/MIDIWriting';
import { useAppSelector } from '../../Redux/hooks';
import * as Constants from '../Constants';
import { CytonSettings, GanglionSettings, MusicSettings, DataStream8Ch, DataStream4Ch } from '../Interfaces';
import { KeyGroups, Keys } from '../Enums';
import { ganglionSettings } from 'device-decoder.third-party';
import { ConcreteCytonStream } from '../DeviceAbstractFactory';
import { MIDIManager } from './MIDIManager';
import { TDebugOptionsObject } from '../Types';

export class NoteHandler {

    private debugOutput:boolean;    
    // Universally used settings
    private numNotes:number;
    private octaves:number;
    private BPM:number;
    
    private keyGroup:number;
    private scale:number;
    private keySignature;
    
    private minValue:number = Number.POSITIVE_INFINITY;
    private maxValue:number = Number.NEGATIVE_INFINITY;
    
    private instrumentNoteSettings:CytonSettings | GanglionSettings;

    private midiGenerator;

    private stopFlag:boolean = false;
    private previousAmp:number = 0;

    private curTime:number;

    public setStopFlag() {
        this.stopFlag = true;
    }

    /* An array of size numNotes is used to store the cutoff values for each increment. 
    * 
    * The MIN_MAX_AMPLITUDE_DIFFERENCE is divided by numNotes to create evenly spaced sections in the array. 
    * 
    * incrementArr[0] is always 0 and incrementArr[numNotes - 1] is always Constants.MAX_AMPLITUDE + AMPLITUDE_OFFSET. 
    * Each subsequent value in the array is calculated by multiplying the previous value by the result of the division. 
    * 
    * In runtime, the headset data is compared to the array to determine which note it corresponds to. 
    * The note is determined by taking the floor of the two values in the array the data falls between.
    */
    private incrementArr:Array<number>; 
    
    // The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM
    private timeForEachNoteArray:Array<number>;


    constructor(settings:MusicSettings, debugOptionsObject: TDebugOptionsObject) {
        // console.log("Constructing originalNoteGeneration Class with the following settings: ");
        // console.log(settings);

        this.octaves = settings.octaves;        
        this.numNotes = settings.numNotes;
        this.BPM = settings.bpm;

        this.incrementArr = new Array(this.numNotes);        
        this.timeForEachNoteArray = this.setTimeForEachNoteArray(this.BPM);
        
        this.keyGroup = KeyGroups[settings.keyGroup as keyof typeof KeyGroups];
        this.scale = Keys[settings.scale as keyof typeof Keys];

        this.keySignature = Constants.KEY_SIGNATURES[this.keyGroup][this.scale];
        this.instrumentNoteSettings = settings.deviceSettings;

        this.midiGenerator = new MIDIManager(settings, this.timeForEachNoteArray, debugOptionsObject);
        this.stopFlag = false;
        this.curTime = Date.now()
        
        this.InitIncrementArr(Constants.MIN_AMPLITUDE, Constants.MAX_AMPLITUDE);

        /* Set this to true to enable real-time playback related output during recording.
         * Ex: 
         * Channel 1: At Rest 
         * ... f
         * Channel k: Playing G#  
         */
        this.debugOutput = debugOptionsObject.debugOption2;
        this.midiGenerator.setDebugOutput(debugOptionsObject.debugOption3); // debug
    }

    // Helper function for constructor. 
    // Gets Ms for each note type based on BPM.
    private setTimeForEachNoteArray(BPM:number) {
        
        return [
            // sixteenth
            getMillisecondsFromBPM(BPM) / 4,
            // eighth
            getMillisecondsFromBPM(BPM) / 2,
            // quarter
            getMillisecondsFromBPM(BPM),
            // half
            getMillisecondsFromBPM(BPM) * 2,
            // whole
            getMillisecondsFromBPM(BPM) * 4
        ]
    }

    // This creates the array in which different "increments" for notes are housed. 
    // For more info see the comment for "var incrementArr"
    private InitIncrementArr(min:number, max:number) {

        let ampDifference = max - min;
        console.log(ampDifference);
        // Dividing the total range by the number of notes
        var incrementAmount = ampDifference / this.numNotes; 
        console.log(incrementAmount);
        // First index will always be 0
        this.incrementArr[0] = 0; 
        
        // Last index will always be the max value + the offset
        this.incrementArr[this.numNotes - 1] = max + Constants.AMPLITUDE_OFFSET; 

        // Fill out the array so that each index is populated with incrementAmount * index
        for (var i = 1; i < this.numNotes; i++) {
            this.incrementArr[i] = incrementAmount * i + Constants.AMPLITUDE_OFFSET;
        }

        // Debug
        if (this.debugOutput) {
            for (var i = 0; i < this.numNotes; i++) {
                console.error(i, ": ", this.incrementArr[i]);
            }
        }
    }

    // Takes in a raw value from the headset and assigns a note.
    private NoteDeclarationRaw(ampValue:number) {
        let returnedAmpValue = 0;
        returnedAmpValue = ampValue / Math.pow(10, 8);
        // returnedAmpValue = (returnedAmpValue + this.minValue); 

        // console.log(returnedAmpValue);
        // console.log(this.incrementArr);
        
        // console.log('MaxValue', this.maxValue);
        // console.log('MinValue', this.minValue);
        
        if(this.maxValue < returnedAmpValue) {
            this.maxValue = returnedAmpValue;
            this.InitIncrementArr(this.minValue, this.maxValue);
        }
        else if(this.minValue > returnedAmpValue) {
            this.minValue = returnedAmpValue;
            this.InitIncrementArr(this.minValue, this.maxValue);
        }

        if (this.debugOutput) console.log("ampval:", returnedAmpValue);
        // For every possible note, check to see if ampValue falls between two array positions. 
        // If so, return that position. If not, it will be treated as a rest (returning -1).
        for (var i = 0; i <= this.numNotes - 1; i++) {
            // If final index, prevent checking out of bounds
            if (i === this.numNotes - 1)
                return returnedAmpValue >= this.incrementArr[i] ? i : -1;

            if (returnedAmpValue >= this.incrementArr[i] && returnedAmpValue <= this.incrementArr[i + 1]) {
                return i;
            }
        }

        return -1;
    }

    /* This function is simply calling the MIDI Generator's function to return MIDI,
        it gets called here since the NoteGeneration class is responsible for passing values
        to MIDI and therefore the MIDI Generator is */
    public returnMIDI() { 
        return this.midiGenerator.returnMIDI();
    }

    // Gets the actual note from `the previously-obtained note INCREMENT (see NoteDeclarationRaw())
    // WRT stands for "with respect to", so this is "get note with respect to key"
    private GetNoteWRTKey(note:number) {
        // console.log('Get WRTKey note: ' + note);
        // If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
        if (note <= 7 && note >= 1) {
            return { note: this.keySignature[note - 1], octave: 0 };
        }
        // If the note increment is less than zero, return -1 which will be treated as a rest.
        else if (note <= 0) {
            return { note: -1, octave: 0 };
        }   
        // If the note is valid and greater than 7
        else {
            // Mod by 7 to find note increment
            var noteMod = note % 7; 

            // Divide by 7 to find octave WRT numNotes/3.
            var noteDiv = Math.floor(note / 7); 

            return { note: this.keySignature[noteMod], octave: noteDiv };
        }
    }


    // This is the function that handles all of the note generation. 
    // It has various supporting functions that it calls, but it all stems from here.
    public originalNoteGeneration = async (EEGdataObj:DataStream8Ch|DataStream4Ch, /*instrument:number, noteType:number, noteVolume:number, numNotes:number*/) => {
        if (this.stopFlag) {
            console.log('stopped');
            this.midiGenerator.setStopFlag();   
            return;
        }
        
        // Grab num channels, ignore last index which contains timeStamp
        var size = Object.keys(EEGdataObj).length - 1;

        // let timeStamp = EEGdataObj.timeStamp;

        // var diff = Math.abs(timeStamp - this.curTime);

        // console.log({diff});
        
        // var smallestNoteInterval = (60000) / (this.BPM * (1/16))

        // if (diff < smallestNoteInterval) return;
        // else {
        //     setTimeout(() => {
        //         this.curTime = Date.now();
        //     },smallestNoteInterval)
        // }
        
        
        // Grab values as arrays for easy looping    
        var dataArray = Object.values(EEGdataObj);
        var instruments = Object.values(this.instrumentNoteSettings.instruments);
        var durations = Object.values(this.instrumentNoteSettings.durations);
        var generatedArr:any[] = [];
        var currentNoteData = {};   

        // Loop through each EEG channel
        for (var i = 0; i < size; i++){
            var channelNum = i+1;

            // Data for the current index
            var curChannelData:number = dataArray[i];
            var instrument:number = instruments[i];
            var noteLength:number = durations[i];
            
            var noteLengthName = getNoteLengthStringFromInt(noteLength);
            var instrumentName = getInstrumentNameFromInt(instrument);
        

            // Get note increment
            console.log('Amp Value for Node ', i, ':');
            var declaredNote = this.NoteDeclarationRaw(curChannelData); 
            
            // Get the actual note and its octave
            var noteAndOctave = this.GetNoteWRTKey(declaredNote); 
            console.log(noteAndOctave);
            // Get the lowest octave that will be used in the song
            var floorOctave = GetFloorOctave(this.numNotes); 
            
            // Combination string of note and octave (ex: 'C#5', 'F4')
            var noteOctaveString; 
            var noteFrequency;

            // If the generated note is not a rest
            if (noteAndOctave.note != -1) {
                noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave).toString();
                noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
            }

            let num = i+1;

            // Test frequency of notes
            var frequencyArray:number[] = [];
            frequencyArray.fill(-1);


            // Debug -----------------------------------------
            if (noteAndOctave.note != -1 && this.debugOutput) {
                frequencyArray[i] = Number(noteAndOctave.note);

                console.log("Channel " + num + ": Playing " + noteAndOctave.note);
                
            } else if(this.debugOutput) {
                console.log("Channel " + num + ": At Rest");
            } else {}
            // ------------------------------------- End Debug

            currentNoteData = {
                player:{noteFrequency, timeForEachNoteArray: this.timeForEachNoteArray, amplitude: curChannelData},
                writer:{noteLengthName, note: noteAndOctave.note, octave: noteAndOctave.octave+floorOctave}
            };
            generatedArr.push(currentNoteData);
            
            // Debug
            // if (this.debugOutput) frequencyArray.forEach((n:any) => console.log(n));

        }

        // this.midiGenerator.convertInput(generatedArr);
        await this.midiGenerator.realtimeGenerate(generatedArr);        
    };

    public prepNotesForMIDI(){
        let res;

        return res;
    }


    public setDebugOutput(b:boolean){
        this.debugOutput = b;
    }

}