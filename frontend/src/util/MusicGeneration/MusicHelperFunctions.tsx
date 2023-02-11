// This file houses functions related to interperating music from inputed EEG frequencies.

import * as Constants from '../Constants'
import { InstrumentTypes, NoteDurations, KeyGroups} from '../Enums';


// ------------------------------------------------------------------------------ NOTE TYPE/LENGTH FUNCTIONS ------------------------------------------------------------------------------

// Takes an int, returns the respective note type in string form.
export function getNoteLengthStringFromInt(input:number)
{
    if (input == 0) return "whole";
    else if (input == 1) return "half";
    else if (input == 2) return "quarter";
    else if (input == 3) return "eighth";
    else if (input == 4) return "sixteenth";
}

// Takes a string, returns the respective note type in int form.
export function getIntFromNoteTypeString(input:String) {
    if (input.localeCompare("sixteenth") == 0) return 0;
    else if (input.localeCompare("eighth") == 0) return 1;
    else if (input.localeCompare("quarter") == 0) return 2;
    else if (input.localeCompare("half") == 0) return 3;
    else if (input.localeCompare("whole") == 0) return 4;
}

// Takes a string, returns the respective note type in int form, but using the values that MidiWriterJS wants.
export function getIntFromNoteTypeStringWithMidiWriterJsValues(input:String)
{
    if (input.localeCompare("sixteenth") == 0) return 16;
    else if (input.localeCompare("eighth") == 0) return 8;
    else if (input.localeCompare("quarter") == 0) return 4;
    else if (input.localeCompare("half") == 0) return 2;
    else if (input.localeCompare("whole") == 0) return 1;
}

// This if/else stack returns a note length multiplier based off an int. Quarter notes are used as the baseline (x1.0 multiplier).
// Input should just be a lowercase string of the note type. Ex: "quarter", "half"
export function getNoteLengthMultiplier(noteType:string) {
    var noteLengthMultiplier = 1;
    if (noteType.localeCompare("sixteenth") == 0) // A sixteenth note is 1/4 the length of a quarter note.
        noteLengthMultiplier = 0.25;
    else if (noteType.localeCompare("eighth") == 0)
        noteLengthMultiplier = 0.5;
    else if (noteType.localeCompare("quarter") == 0)
        noteLengthMultiplier = 1;
    else if (noteType.localeCompare("half") == 0)
        noteLengthMultiplier = 2;
    else if (noteType.localeCompare("whole") == 0) // A whole note is 4x the length of a quarter note
        noteLengthMultiplier = 4;

    return noteLengthMultiplier;
}

// ------------------------------------------------------------------------------ INSTRUMENT FUNCTIONS ------------------------------------------------------------------------------

// Takes an int, returns the respective instrument in string form.
export function getInstrumentNameFromInt(input:number) {
    if (input == -3) return "Sine Wave";
    else if (input == -2) return "Triangle Wave";
    else if (input == -1) return "Square Wave";
    else if (input == 0) return "Flute";
    else if (input == 1) return "Oboe";
    else if (input == 2) return "Clarinet";
    else if (input == 3) return "Bassoon";
    else if (input == 4) return "Trumpet";
    else if (input == 5) return "French Horn";
    else if (input == 6) return "Trombone";
    else if (input == 7) return "Tuba";
}

// ------------------------------------------------------------------------------ OTHER FUNCTIONS ------------------------------------------------------------------------------

// Takes in a BPM int and returns the length of one QUARTER NOTE in milliseconds at that BPM.
export function getMilliecondsFromBPM(bpm:number) {
    return 60000 / bpm;
}

export function GetFloorOctave(numberNotes:number) {
    if (numberNotes == 7 || numberNotes == 14)
        return 5;
    if (numberNotes == 21)
        return 4;
    return 5;
}

// Finds the amount of samples that fit into the given amount of time in ms
export function findNumSamples(ms:number) {
    // Sample rate is number of samples every second
    // numSamples is the number of total samples played
    // ms is how many milliseconds we want something to play for
    let relationToSecond = 1000 / ms;
    let numSamples = Constants.sampleRate / relationToSecond;
    return numSamples;
}

// Borrowed from https://gist.github.com/stuartmemo/3766449. Thanks!!
// Takes in a note and octave in string form (ex: 'C#6', 'F4') and returns the raw frequency for that note.
export function getFrequencyFromNoteOctaveString(note:String)
{
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], octave:number, keyNumber:number;

    if (note.length === 3)
        octave = parseInt(note.charAt(2));
    else
        octave = parseInt(note.charAt(1));

    keyNumber = notes.indexOf(note.slice(0, -1));

    if (keyNumber < 3)
        keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
    else
        keyNumber = keyNumber + ((octave - 1) * 12) + 1;

    // Return frequency of note
    return 440 * Math.pow(2, (keyNumber - 49) / 12);
};


// Return a number from min inclusive to max exclusive
function getRandomArbitrary(min:number, max:number) {
    return Math.random() * (max - min) + min;
  }
  
export function getRandomInstrument() {
    let length = Object.keys(InstrumentTypes).length / 2;
    return InstrumentTypes[getRandomArbitrary(-3, length + 1)];
}

export function getRandomDuration() {
    let length = Object.keys(NoteDurations).length / 2;
    return NoteDurations[getRandomArbitrary(0, length + 1)];
}

export function getRandomScale() {
    return Constants.KEYS[getRandomArbitrary(0, 8)];
}

export function getRandomKeyGroup() {
    let length = Object.keys(KeyGroups).length / 2;
    return KeyGroups[getRandomArbitrary(0, length + 1)];
}

