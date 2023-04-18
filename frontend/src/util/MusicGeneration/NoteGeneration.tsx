import {getNoteLengthStringFromInt, getMillisecondsFromBPM, GetFloorOctave, getFrequencyFromNoteOctaveString} from './MusicHelperFunctions';

// import {initMIDIWriter, addNoteToMIDITrack, printTrack, generateMIDIURIAndDownloadFile, generateMIDIURI, generateMIDIFileFromURI} from '../MusicGeneration/MIDIWriting';
import * as Constants from '../Constants';
import { CytonSettings, GanglionSettings, MusicSettings, DataStream8Ch, DataStream4Ch } from '../Interfaces';
import { KeyGroups, Keys } from '../Enums';
import { MIDIManager } from './MIDIManager';
import { TDebugOptionsObject } from '../Types';

export class NoteHandler {

    /*  debugOutput functions in the same way as the other classes which have this boolean, if we are in dev then
        checkboxes will display on the record page that allow us to select if we want console logs for data, if you
        want to implement logs that will show up on dev but not production, simply add an if conditional with this
        boolean before them. */
    private debugOutput:boolean;    
    
    // Universally used settings
    private numNotes:number;
    private BPM:number;
    private keyGroup:number;
    private scale:number;
    private octaves:number
    private keySignature;
    
    /* The min and max value arrays store the minimum and maximum EEG data from each channel, the purpose of storing
        these is to determine how weak/strong the input from each channel is, a weak connection can occur if you have an 
        electrode that has hair blocking the signal for example. This allows us to calculate the percentiles we use when
        defining the increment array */
    private minValue:Array<number> = []; 
    private maxValue:Array<number> = []; 

    /*  The avgArray is similar to the min and max value arrays, it however stores the average value from each channel,
        it is used to determine the average data over all of the arrays currently, this is done through storing the EEG 
        values over a certain number of inputs (in our case 1000) in the previousThousandEEG array and continuously updating
        the average based on those, this is because there will be cases where the input stream is weak and then if the
        headset is re-adjusted during recording, the input will become stronger and therefore the average will be different. */
    private avgArray:Array<number> = [];
    private previousThousandEEG:Array<Array<number>> = [[]];

    private instrumentNoteSettings:CytonSettings | GanglionSettings;

    private midiGenerator;

    private stopFlag:boolean = false;

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
    private incrementArr:Array<number> = [];
    
    // The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM
    private timeForEachNoteArray:Array<number>;


    constructor(settings:MusicSettings, debugOptionsObject: TDebugOptionsObject) {
        this.debugOutput = debugOptionsObject.debugOption2;
        
        if (this.debugOutput) {
            console.log("Constructing originalNoteGeneration Class with the following settings: ");
            console.log(settings);
        }

        this.octaves = settings.octaves;        
        this.numNotes = settings.numNotes;
        this.BPM = settings.bpm;

        this.timeForEachNoteArray = this.setTimeForEachNoteArray(this.BPM);
        
        this.keyGroup = KeyGroups[settings.keyGroup as keyof typeof KeyGroups];
        this.scale = Keys[settings.scale as keyof typeof Keys];

        this.keySignature = Constants.KEY_SIGNATURES[this.keyGroup][this.scale];
        this.instrumentNoteSettings = settings.deviceSettings;

        this.midiGenerator = new MIDIManager(settings, this.timeForEachNoteArray, debugOptionsObject);
        this.stopFlag = false;
        
        /* Here we are just filling the increment array with zeroes for initialization purposes */
        this.incrementArr = new Array(this.numNotes).fill(0);

        /*  On initialization, the minimum and maximum values are going to be null, but to set the
            initial increment array it makes sense to have the highest and lowest possible number
            values for comparisons in the future, we pass in 0 as the ampvalue to avoid calculating
            the global averages since there isn't any data yet. */
        for (var i = 0; i < 8; i++) {
            this.minValue[i] = Number.POSITIVE_INFINITY;
            this.maxValue[i] = Number.NEGATIVE_INFINITY;
            
            /* The previous previous 1000 values are  */
            this.previousThousandEEG[i] = new Array(8).fill(0);
            this.InitIncrementArr(0);            
        }
        /* Set this to true to enable real-time playback related output during recording.
         * Ex: 
         * Channel 1: At Rest 
         * ... f
         * Channel k: Playing G#  
         */
        this.midiGenerator.setDebugOutput(debugOptionsObject.debugOption3); // debug
    }

    /* setTimeForEachNoteArray does simple logic to return the values of each note in milliseconds as an array. 
       BPM affects the amount of time for each note, and the math logic can be explained on this website if you
       are interested: https://tuneform.com/tools/time-tempo-bpm-to-milliseconds-ms. The indices are arranged 
       from shortest note to longest note. */
    private setTimeForEachNoteArray(BPM:number) {
        return [
            getMillisecondsFromBPM(BPM) / 4, // Index 0: Sixteenth Note
            getMillisecondsFromBPM(BPM) / 2, // Index 1: Eighth Note
            getMillisecondsFromBPM(BPM), // Index 2: Quarter Note
            getMillisecondsFromBPM(BPM) * 2, // Index 3: Half Note
            getMillisecondsFromBPM(BPM) * 4 // Index 4: Whole Note
        ]
    }

    // This creates the array in which different "increments" for notes are housed. 
    // For more info see the comment for "var incrementArr"
    private InitIncrementArr(ampVal:number) {
        /*  The number for maximum will always be greater than 0 assuming there is a valid
            connection to the device, therefore we initialize it at 0, the value for minimum
            is just arbitrarily large. */
        var minAvg = Number.POSITIVE_INFINITY;
        var maxAvg = 0;
        
        /*  Here we find a the minimum and maximum average value of all of the
            channels in order to establish better connection for the weaker nodes,
            we use this to then calculate the 1/4 and 3/4 percentiles that define the
            minimum and maximum values accepted when converting into a note as shown
            below the for loop. The purpose of the if condition here is explained in the
            constructor for this class, whenever there is an actual amplitude being
            input from the device this condition will be met. */        
        if(ampVal > 0) {
            for(let i = 0; i < 8; i++) {
                var tempAvg = this.average(this.previousThousandEEG[i]);
                if (tempAvg < minAvg)
                    minAvg = tempAvg;
                if(tempAvg > maxAvg)
                    maxAvg = tempAvg;
            }
        }
        var range = maxAvg - minAvg;
        var quartile = range / 4;
        const p25 = minAvg + quartile;
        const p75 = maxAvg - quartile;

        /*  The ampDifference is the range of values from p25 through p75, this is what is
            used to generate the bounds of the increment array. The incrementAmount is simply
            splitting this range into equal values based on the number of possible notes that
            an amplitude can fall between. */
        let ampDifference:number = Math.abs(p75 - p25);
        var incrementAmount:number = ampDifference / this.numNotes; 

        /*  The first index will always be the 25th percentile of data calculated by the data received, this
            is to set a baseline so numbers that have lower values are calculated as rest notes in MIDI Generation.
            The last index will always be the 75th percentile for the same reason except in the case of high outliers. */
        this.incrementArr[0] = p25;
        this.incrementArr[this.numNotes - 1] = p75; 

        /*  Here we are filling out the array with a small offset to generate slight amounts of variety, this is because
            we would like to allow for a tiny amount of randomness as we cannot always predict the exact root cause of low connectivity
            with the device. */
        for (var i = 1; i < this.numNotes - 1; i++) {
            var offset = (Math.random() - 0.5) * incrementAmount / 2;
            this.incrementArr[i] = p25 + (incrementAmount * i) + offset;
        }
    }

    /* Calculates the average value of numbers in an array */
    private average = (arr:Array<number>) => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;

    // Takes in a raw value from the headset and assigns a note, as well as the index of this channel
    private NoteDeclarationRaw(ampValue:number, idx:number) {
        /*  If a note is in the negative range, we want to still consider it. The logic behind multiplying by -2 is that
            a baseline value from our input stream is going to be within the range of active values if flipped, so doubling
            it will flip it to a value above the range of the incrementArray, and since the values in negative range that aren't
            baseline will be small enough to where doubling it won't cause enough impact on it to move it in the incrementArray. */
        if(ampValue < 0) ampValue *= -2; 
        
        /* returnedAmpValue is mapped down into a range that allows for offsetting, hence dividing by 10 to the 7th */
        let returnedAmpValue = ampValue / Math.pow(10, 7);
        if(this.previousThousandEEG[idx].length === 1000) {
            this.previousThousandEEG[idx].shift();
        }
       
        this.previousThousandEEG[idx].push(returnedAmpValue);
        
        let avg = this.average(this.previousThousandEEG[idx]);

        this.avgArray[idx] = avg;


        if(this.maxValue[idx] < returnedAmpValue) {
            this.maxValue[idx] = returnedAmpValue;
            this.InitIncrementArr(avg);
        }
        if(this.minValue[idx] > returnedAmpValue) {
            this.minValue[idx] = returnedAmpValue;
            this.InitIncrementArr(returnedAmpValue);
        }

        if (this.debugOutput) {
            console.log("ampval:", returnedAmpValue);
            console.log(this.incrementArr);
        } 

        // For every possible note, check to see if ampValue falls between two array positions. 
        // If so, return that position. If not, it will be treated as a rest (returning -1).
        var index = 0;
        for (var i = 0; i < this.numNotes; i++) {
            // If final index, prevent checking out of bounds
            if (i === this.numNotes - 1) {
                index = returnedAmpValue >= this.incrementArr[i] ? -1 : i;
                break;
            }

            if (returnedAmpValue >= this.incrementArr[i] && returnedAmpValue <= this.incrementArr[i + 1]) {
                index = i;
                break;
            }
        }

        if (index >= 0) {
            // Add some random jitter to the index to choose a nearby note
            var jitter = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            index += jitter;
        
            // Make sure the index is within bounds
            if (index < 0) {
                index = 0;
            } else if (index >= this.numNotes) {
                index = this.numNotes - 1;
            }
        }
        
        return index;
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
        
        // Grab values as arrays for easy looping    
        var dataArray = Object.values(EEGdataObj);
        var durations = Object.values(this.instrumentNoteSettings.durations);
        var generatedArr:any[] = [];
        var currentNoteData = {};   

        // Loop through each EEG channel
        for (var i = 0; i < size; i++){
            // Data for the current index
            var curChannelData:number = dataArray[i];
            var noteLength:number = durations[i];
            
            var noteLengthName = getNoteLengthStringFromInt(noteLength);
            
            // Get note increment
            var declaredNote = this.NoteDeclarationRaw(curChannelData, i); 
            
            if (this.debugOutput) console.log('channel ', i, " has note ", declaredNote);
            
            // Get the actual note and its octave
            var noteAndOctave = this.GetNoteWRTKey(declaredNote); 
            
            // Get the lowest octave that will be used in the song
            var floorOctave = GetFloorOctave(this.numNotes); 
            
            // Combination string of note and octave (ex: 'C#5', 'F4')
            var noteOctaveString; 
            var noteFrequency;

            // If the generated note is not a rest
            if (noteAndOctave.note !== -1) {
                noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave).toString();
                noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
            }

            // Debug -----------------------------------------
            if (this.debugOutput) {  // Test frequency of notes 
                let num = i+1;
                var frequencyArray:number[] = [];
                frequencyArray.fill(-1);

                if (noteAndOctave.note !== -1 && this.debugOutput) {
                    frequencyArray[i] = Number(noteAndOctave.note);

                    console.log("Channel " + num + ": Playing " + noteAndOctave.note);
                    
                } else if(this.debugOutput) {
                    console.log("Channel " + num + ": At Rest");
                } else {}
                frequencyArray.forEach((n:any) => console.log(n));
            } 
            // ------------------------------------- End Debug

            currentNoteData = {
                player:{noteFrequency, timeForEachNoteArray: this.timeForEachNoteArray, amplitude: curChannelData},
                writer:{noteLengthName, note: noteAndOctave.note, octave: noteAndOctave.octave+floorOctave}
            };
            generatedArr.push(currentNoteData);
        }

        // this.midiGenerator.convertInput(generatedArr);
        await this.midiGenerator.realtimeGenerate(generatedArr);        
    };

    // unused
    public prepNotesForMIDI(){
        let res;
        return res;
    }


    public setDebugOutput(b:boolean){
        this.debugOutput = b;
        if (this.debugOutput) console.log("Setting Notehandler debug to ", b);
    }

}