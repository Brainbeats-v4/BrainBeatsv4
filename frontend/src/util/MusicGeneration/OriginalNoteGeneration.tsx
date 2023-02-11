import {getNoteLengthStringFromInt, getInstrumentNameFromInt, getIntFromNoteTypeString, getIntFromNoteTypeStringWithMidiWriterJsValues,
	getNoteLengthMultiplier, getMilliecondsFromBPM, GetFloorOctave, findNumSamples, getFrequencyFromNoteOctaveString} from './MusicHelperFunctions';

// import {initMIDIWriter, addNoteToMIDITrack, printTrack, generateMIDIURIAndDownloadFile, generateMIDIURI, generateMIDIFileFromURI} from '../MusicGeneration/MIDIWriting';
import { useAppSelector } from '../../Redux/hooks.js';
import * as Constants from '../Constants.js';
import { CytonSettings, GanglionSettings, MusicSettings, DataStream8Ch, DataStream4Ch } from '../Interfaces';
import { KeyGroups, Keys } from '../Enums';
import { ganglionSettings } from 'device-decoder.third-party';
import { ConcreteCytonStream } from '../DeviceAbstractFactory';

export class NoteHandler {

    private debugOutput:boolean;    
    
    // Universally used settings
    private numNotes:number;
    private octaves:number;
    private BPM:number;
    
    private keyGroup:number;
    private scale:number;
    private keySignature;
    
    private instrumentNoteSettings:CytonSettings | GanglionSettings;

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
    
    public incrementArr:Array<number>; 
    
    // The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM
    private timeForEachNoteArray:Array<number>;


    constructor(settings:MusicSettings) {
        this.debugOutput = false;
        this.octaves = settings.octaves;        
        this.numNotes = settings.numNotes;
        this.BPM = settings.bpm;

        this.incrementArr = new Array(this.numNotes);        
        this.timeForEachNoteArray = this.setTimeForEachNoteArray(this.BPM);
        
        
        this.keyGroup = KeyGroups[settings.keyGroup as keyof typeof KeyGroups];
        this.scale = Keys[settings.scale as keyof typeof Keys];

        this.keySignature = Constants.KEY_SIGNATURES[this.keyGroup][this.scale];
        this.instrumentNoteSettings = settings.deviceSettings;
    }

    // Helper function for constructor. 
    // Gets Ms for each note type based on BPM.
    private setTimeForEachNoteArray(BPM:number) {
        
        return new Array(

            // sixteenth
            getMilliecondsFromBPM(BPM) / 4,
            // eighth
            getMilliecondsFromBPM(BPM) / 2,
            // quarter
            getMilliecondsFromBPM(BPM),
            // half
            getMilliecondsFromBPM(BPM) * 2,
            // whole
            getMilliecondsFromBPM(BPM) * 4
        )
    }

    // This creates the array in which different "increments" for notes are housed. 
    // For more info see the comment for "var incrementArr"
    private InitIncrementArr() {
        
        // Dividing the total range by the number of notes
        var incrementAmount = Constants.MIN_MAX_AMPLITUDE_DIFFERENCE / this.numNotes; 

        // First index will always be 0
        this.incrementArr[0] = 0; 
        
        // Last index will always be the max value + the offset
        this.incrementArr[this.numNotes - 1] = Constants.MAX_AMPLITUDE + Constants.AMPLITUDE_OFFSET; 

        // Fill out the array so that each index is populated with incrementAmount * index
        for (var i = 1; i < this.numNotes - 1; i++)
            this.incrementArr[i] = incrementAmount * i + Constants.AMPLITUDE_OFFSET;
        
    }

    // Takes in a raw value from the headset and assigns a note.
    private NoteDeclarationRaw(ampValue:number) {
        let ampValue2 = 0;
        ampValue2 = (ampValue - -Constants.AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

        // For every possible note, check to see if ampValue falls between two array positions. 
        // If so, return that position. If not, it will be treated as a rest (returning -1).
        for (var i = 0; i <= this.numNotes - 1; i++) {
            if (ampValue2 >= this.incrementArr[i] && ampValue2 <= this.incrementArr[i + 1])
                return i;
        }
        return -1;
    }

    // Gets the actual note from `the previously-obtained note INCREMENT (see NoteDeclarationRaw())
    // WRT stands for "with respect to", so this is "get note with respect to key"
    private GetNoteWRTKey(note:number) {

        // If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
        if (note <= 7 && note >= 1)
            return { note: this.keySignature[note - 1], octave: 0 };

        // If the note increment is less than zero, return -1 which will be treated as a rest.
        else if (note <= 0)
            return { note: -1, octave: 0 };

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
    public originalNoteGeneration = async (dataArray:DataStream8Ch|DataStream4Ch, /*instrument:number, noteType:number, noteVolume:number, numNotes:number*/) => {
        var size = Object.keys(dataArray).length / 2;
        
        this.InitIncrementArr();
        
        // let cur: keyof typeof this.instrumentNoteSettings.instruments;
        // let index:number = 0;
        // for (cur in this.instrumentNoteSettings.instruments) {

        for (var i = 0; i < size; i++){
            var data = Object.values(dataArray).at(i);
        

            // Get note increment
            var declaredNote = this.NoteDeclarationRaw(data); 

            // Get the actual note and its octave
            var noteAndOctave = this.GetNoteWRTKey(declaredNote); 
            
            // Get the lowest octave that will be used in the song
            var floorOctave = GetFloorOctave(this.numNotes); 
            
            // Combination string of note and octave (ex: 'C#5', 'F4')
            var noteOctaveString; 
            var noteFrequency;

            // If the generated note is not a rest
            if (noteAndOctave.note != -1) 
            {
                noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave).toString();
                noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
            }

            // If the generated note is not a rest
            if (noteAndOctave.note != -1  && this.debugOutput) 
            {
                // // This if/else stack is just for console output, nothing important happens here.
                // if (track.contentHint.localeCompare("FP1") == 0)
                //     console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP1Instrument) + " playing " + noteType + " notes] " + data);
                // else if (track.contentHint.localeCompare("FP2") == 0)
                //     console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP2Instrument) + " playing " + noteType + " notes] " + data);
                // else if (track.contentHint.localeCompare("C3") == 0)
                //     console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C3Instrument) + " playing " + noteType + " notes] " + data);
                // else if (track.contentHint.localeCompare("C4") == 0)
                //     console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C4Instrument) + " playing " + noteType + " notes] " + data);




                    // This if/else stack is just for console output, nothing important happens here.

                console.log("Track: " + noteOctaveString + " [" + getInstrumentNameFromInt(this.instrumentNoteSettings.instruments._00) + " playing " + noteType + " notes] " + data);
                
            }				

            if (noteAndOctave.note != -1) // If the generated note is not a rest, return all the generated data
                return {
                    player:{noteFrequency, /*, noteVolume, instrument, noteType*/},
                    writer:{}
                };
            else return -1; // If the note is a rest (or something went wrong), return -1.


        }    
    };

    public prepNotesForMIDI(){
        let res;

        return res;
    }


    public setDebugOutput(b:boolean){
        this.debugOutput = b;
    }

}