import {getNoteLengthStringFromInt, getInstrumentNameFromInt, getIntFromNoteTypeString, getIntFromNoteTypeStringWithMidiWriterJsValues,
	getNoteLengthMultiplier, getMilliecondsFromBPM, GetFloorOctave, findNumSamples, getFrequencyFromNoteOctaveString} from './MusicHelperFunctions';

// import {initMIDIWriter, addNoteToMIDITrack, printTrack, generateMIDIURIAndDownloadFile, generateMIDIURI, generateMIDIFileFromURI} from '../MusicGeneration/MIDIWriting';
import { useAppSelector } from '../../Redux/hooks.js';
import * as Constants from '../Constants.js';
import { CytonSettings } from '../Interfaces';

class NoteHandler {
    private var curSettingsState:CytonSettings;

    function init() {

        // Get Current Settings
        var curSettingsState = useAppSelector(state => state.cytonMusicGenerationSettingsSlice);
        var numNotes = curSettingsState.numNotes;
    }

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
var incrementArr = new Array(numNotes);


// This creates the array in which different "increments" for notes are housed. For more info see the comment for "var incrementArr"
function InitIncrementArr() {
    var incrementAmount = Constants.MIN_MAX_AMPLITUDE_DIFFERENCE / numNotes; // Dividing the total range by the number of notes

    incrementArr[0] = 0; // First index will always be 0
    incrementArr[numNotes - 1] = Constants.MAX_AMPLITUDE + Constants.AMPLITUDE_OFFSET; // Last index will always be the max value + the offset

    // Fill out the array so that each index is populated with incrementAmount * index
    for (var i = 1; i < numNotes - 1; i++)
        incrementArr[i] = incrementAmount * i + Constants.AMPLITUDE_OFFSET;
    
}

// ! 
// Takes in a raw value from the headset and assigns a note.
function NoteDeclarationRaw(ampValue:number) {
    let ampValue2 = 0;
    ampValue2 = (ampValue - -Constants.AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

    // For every possible note, check to see if ampValue falls between two array positions. 
    // If so, return that position. If not, it will be treated as a rest (returning -1).
    for (var i = 0; i <= numNotes - 1; i++) {
        if (ampValue2 >= incrementArr[i] && ampValue2 <= incrementArr[i + 1])
            return i;
    }
    return -1;
}

// Gets the actual note from the previously-obtained note INCREMENT (see NoteDeclarationRaw())
// WRT stands for "with respect to", so this is "get note with respect to key"
function GetNoteWRTKey(note:number) {
    // If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
    if (note <= 7 && note >= 1)
        return { note: keySignature[note - 1], octave: 0 };
    // If the note increment is less than zero, return -1 which will be treated as a rest.
    else if (note <= 0)
        return { note: -1, octave: 0 };
    // If the note is valid and greater than 7
    else {
        var noteMod = note % 7; // Mod by 7 to find note increment
        var noteDiv = Math.floor(note / 7); // Divide by 7 to find octave WRT numNotes/3.
        return { note: keySignature[noteMod], octave: noteDiv };
    }
}

// This is the function that handles all of the note generation. It has various supporting functions that it calls, but it all stems from here.
export const originalNoteGeneration = async (track:any, data:any, instrument:number, noteType:number, noteVolume:number, numNotes:number) => {
    InitIncrementArr();
    var declaredNote = NoteDeclarationRaw(data); // Get note increment
    var noteAndOctave = GetNoteWRTKey(declaredNote); // Get the actual note and its octave
    var floorOctave = GetFloorOctave(numNotes); // Get the lowest octave that will be used in the song
    
    // Combination string of note and octave (ex: 'C#5', 'F4')
    var noteOctaveString; 
    var noteFrequency;

    // If the generated note is not a rest
    if (noteAndOctave.note != -1) 
    {
        noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave);
        noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
    }

    // // If the generated note is not a rest
    // if (noteAndOctave.note != -1  && showMusicRelatedConsoleOutput) 
    // {
    //     // This if/else stack is just for console output, nothing important happens here.
    //     if (track.contentHint.localeCompare("FP1") == 0)
    //         console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP1Instrument) + " playing " + noteType + " notes] " + data);
    //     else if (track.contentHint.localeCompare("FP2") == 0)
    //         console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP2Instrument) + " playing " + noteType + " notes] " + data);
    //     else if (track.contentHint.localeCompare("C3") == 0)
    //         console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C3Instrument) + " playing " + noteType + " notes] " + data);
    //     else if (track.contentHint.localeCompare("C4") == 0)
    //         console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C4Instrument) + " playing " + noteType + " notes] " + data);
    // }				

    // This adds the current note to the MIDI stream
    if (track.contentHint.localeCompare("FP1") == 0)
        addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
    else if (track.contentHint.localeCompare("FP2") == 0)
        addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
    else if (track.contentHint.localeCompare("C3") == 0)
        addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
    else if (track.contentHint.localeCompare("C4") == 0)
        addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)

    if (noteAndOctave.note != -1) // If the generated note is not a rest, return all the generated data
        return {noteFrequency, noteVolume, instrument, noteType};
    else return -1; // If the note is a rest (or something went wrong), return -1.
};
