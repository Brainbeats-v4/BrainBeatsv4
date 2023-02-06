enum InstrumentTypes {
    NULL = -99,
    SINEWAVE = -3,
    TRIANGLEWAVE = -2,
    SQUAREWAVE = -1,
    FLUTE = 0,
    OBOE = 1,
    CLARINET = 2,
    BASSOON = 3,
    TRUMPET = 4,
    FRENCHHORN = 5,
    TROMBONE = 6,
    TUBA = 7,
}

enum NoteDurations {
    NULL = -99,
    WHOLE = 0,
    HALF = 1,
    QUARTER = 2,
    EIGHTH = 3,
    SIXTEENTH = 4,
}

abstract class MusicGenerationSettings {
    abstract getInstrumentSettings(): any;
    abstract getDurationSettings(): any;
    abstract getBPMSettings(): number;
    abstract resetSettings(): void;
}

class GanglionSettings extends MusicGenerationSettings {
    // Used to store the instrument each node should be used to output
    instrument: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
    }

    // Used to store the duration of each note a given node should be used to output
    duration: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
    }

    // Used to store the beats per minute (bpm) to be ouput
    bpm: number;

    constructor(instrument: {_00: number, _01: number, _02: number, _03: number},
                duration: {_00: number, _01: number, _02: number, _03: number},
                bpm: number) {
        super();
        this.instrument = instrument;
        this.duration = duration;
        this.bpm = bpm;
    }

    getInstrumentSettings(): any {
        return this.instrument;
    }

    getDurationSettings(): any {
        return this.duration;
    }

    getBPMSettings(): number {
        return this.bpm;
    }

    resetSettings(): void {
        this.instrument = null;
        this.duration = null;
        this.bpm = null;
    }
}

class CytonSettings extends MusicGenerationSettings {
    // Used to store the instrument each node should be used to output
    instrument: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
        _04: number;
        _05: number;
        _06: number;
        _07: number;
    }

    // Used to store the duration of each note a given node should be used to output
    duration: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
        _04: number;
        _05: number;
        _06: number;
        _07: number;
    }

    // Used to store the beats per minute (bpm) to be ouput
    bpm: number;

    constructor(instrument: {_00: number, _01: number, _02: number, _03: number, _04: number, _05: number, _06: number, _07: number},
                duration: {_00: number, _01: number, _02: number, _03: number, _04: number, _05: number, _06: number, _07: number},
                bpm: number) {
        super();
        this.instrument = instrument;
        this.duration = duration;
        this.bpm = bpm;
    }

    getInstrumentSettings(): any {
        return this.instrument;
    }

    getDurationSettings(): any {
        return this.duration;
    }

    getBPMSettings(): number {
        return this.bpm;
    }

    resetSettings(): void {
        this.instrument = null;
        this.duration = null;
        this.bpm = null;
    }
}



export { InstrumentTypes, NoteDurations, MusicGenerationSettings, GanglionSettings, CytonSettings};

//     switch (speed) {
//         case speed === slow:
//             applyNoteSpeed(InstrumentTypes.SINEWAVE, 0, 4, 7, 2, 1, 1, 0, 100);
//             break;
//         case speed === med:
//             applyNoteSpeed(InstrumentTypes.SINEWAVE, 2, 5, 6, 2, 2, 1, 1, 120);
//             break;
//         case speed === quick:
//             applyNoteSpeed(4, 2, 3, 0, 3, 3, 2, 2, 140);
//             break;
//         case speed === fast:
//             applyNoteSpeed(InstrumentTypes.SINEWAVE, 0, 4, 3, 4, 4, 3, 3, 160);
//             break;
//     }