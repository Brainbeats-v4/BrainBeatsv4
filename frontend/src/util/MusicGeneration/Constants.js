// This file is all stuff that isn't changed often, and are referred to by different parts of the software.

// The highest and lowest possible values of the headset's data that we will actually use and parse into musical data.
// Anything under the maximum and above the minimum will be sorted into respective notes, but anything above the maximum
// or below the minimum will be treated as rests. 
export const MAX_AMPLITUDE = 0.001;
export const MIN_AMPLITUDE = -0.001;

// The distance between the ceiling amplitude and the floor amplitude.
export const MIN_MAX_AMPLITUDE_DIFFERENCE = MAX_AMPLITUDE - MIN_AMPLITUDE;

// An offset that is equal to the absolute value of MIN_AMPLITUDE. This offset is used to turn the negative MIN value 
// into effectively zero, and the MAX value into itself plus this offset. This just removes negative numbers from all
// of the calculation, making it simpler for humans to both read and write the code.
export const AMPLITUDE_OFFSET = 0.001;

export const instrumentEnums =
{
    SineWave: -3,
    TriangleWave: -2,
    SquareWave: -1,
    Flute: 0,
    Oboe: 1,
    Clarinet: 2,
    Bassoon: 3,
    Trumpet: 4,
    FrenchHorn: 5,
    Trombone: 6,
    Tuba: 7
}

export const KEY_SIGNATURES_MAJOR =
    [
        ["C", "D", "E", "F", "G", "A", "B"], // 0 done
        ["C#", "D#", "F", "F#", "G#", "A#", "C"], // 1 done
        ["D", "E", "F#", "G", "A", "B", "C#"], // 2 done
        ["D#", "F", "G", "G#", "A#", "C", "D"], // 3 done
        ["E", "F#", "G#", "A", "B", "C#", "D#"], // 4 done
        ["F", "G", "A", "A#", "C", "D", "E"], // 6 done
        ["F#", "G#", "A#", "B", "C#", "D#", "E#"], // 7 done
        ["G", "A", "B", "C", "D", "E", "F#"], // 8 done
        ["G#", "A#", "C", "C#", "D#", "F", "G"], // 9 done
        ["A", "B", "C#", "D", "E", "F#", "G#"], // 10 done
        ["A#", "C", "D", "D#", "F", "G", "A"], // 11 done 
        ["B", "C#", "D#", "E", "F#", "G#", "A#"] // 12 done
    ];
export const KEY_SIGNATURES_MINOR =
    [
        ["C", "D", "D#", "F", "G", "G#", "A#"], // 0 done
        ["C#", "D#", "E", "F#", "G#", "A", "B"], // 1 done
        ["D", "E", "F", "G", "A", "A#", "C"], // 2 done 
        ["D#", "F", "F#", "G#", "A#", "B", "C#"], // 3 done 
        ["E", "F#", "G", "A", "B", "C", "D"], // 4 done 
        ["F", "G", "G#", "A#", "C", "C#", "D#"], // 6 done
        ["F#", "G#", "A", "B", "C#", "D", "E"], // 7 done
        ["G", "A", "A#", "C", "D", "D#", "F"], // 8 done
        ["G#", "A#", "B", "C#", "D#", "E", "F#"], // 9 done
        ["A", "B", "C", "D", "E", "F", "G"], // 10 done
        ["A#", "C", "C#", "D#", "F", "F#", "G#"], // 11 done
        ["B", "C#", "D", "E", "F#", "G", "A"] // 12 done
    ];
export const KEY_SIGNATURES = [KEY_SIGNATURES_MAJOR, KEY_SIGNATURES_MINOR]

export var sampleRate = 44100;

//Default volume value
export const DEFAULT_VOLUME = 0.1;