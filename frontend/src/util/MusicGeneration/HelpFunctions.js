// This file houses functions that are commonly used by multiple different parts of the software

import * as Constants from './Constants.js'

// ------------------------------------------------------------------------------ NOTE TYPE/LENGTH FUNCTIONS ------------------------------------------------------------------------------

// Takes an int, returns the respective note type in string form.
export function getNoteLengthStringFromInt(input)
{
    if (input == 0) return "whole";
    else if (input == 1) return "half";
    else if (input == 2) return "quarter";
    else if (input == 3) return "eighth";
    else if (input == 4) return "sixteenth";
}

// Takes a string, returns the respective note type in int form.
export function getIntFromNoteTypeString(input) {
    if (input.localeCompare("sixteenth") == 0) return 0;
    else if (input.localeCompare("eighth") == 0) return 1;
    else if (input.localeCompare("quarter") == 0) return 2;
    else if (input.localeCompare("half") == 0) return 3;
    else if (input.localeCompare("whole") == 0) return 4;
}

// Takes a string, returns the respective note type in int form, but using the values that MidiWriterJS wants.
export function getIntFromNoteTypeStringWithMidiWriterJsValues(input)
{
    if (input.localeCompare("sixteenth") == 0) return 16;
    else if (input.localeCompare("eighth") == 0) return 8;
    else if (input.localeCompare("quarter") == 0) return 4;
    else if (input.localeCompare("half") == 0) return 2;
    else if (input.localeCompare("whole") == 0) return 1;
}

// This if/else stack returns a note length multiplier based off an int. Quarter notes are used as the baseline (x1.0 multiplier).
// Input should just be a lowercase string of the note type. Ex: "quarter", "half"
export function getNoteLengthMultiplier(noteType) {
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
export function getInstrumentNameFromInt(input) {
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
export function getMilliecondsFromBPM(bpm) {
    return 60000 / bpm;
}

export function GetFloorOctave(numberNotes) {
    if (numberNotes == 7 || numberNotes == 14)
        return 5;
    if (numberNotes == 21)
        return 4;
}

// Finds the amount of samples that fit into the given amount of time in ms
export function findNumSamples(ms) {
    // Sample rate is number of samples every second
    // numSamples is the number of total samples played
    // ms is how many milliseconds we want something to play for
    let relationToSecond = 1000 / ms;
    let numSamples = Constants.sampleRate / relationToSecond;
    return numSamples;
}

// Borrowed from https://gist.github.com/stuartmemo/3766449. Thanks!!
// Takes in a note and octave in string form (ex: 'C#6', 'F4') and returns the raw frequency for that note.
export function getFrequencyFromNoteOctaveString(note)
{
    var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'], octave, keyNumber;

    if (note.length === 3)
        octave = note.charAt(2);
    else
        octave = note.charAt(1);

    keyNumber = notes.indexOf(note.slice(0, -1));

    if (keyNumber < 3)
        keyNumber = keyNumber + 12 + ((octave - 1) * 12) + 1;
    else
        keyNumber = keyNumber + ((octave - 1) * 12) + 1;

    // Return frequency of note
    return 440 * Math.pow(2, (keyNumber - 49) / 12);
};