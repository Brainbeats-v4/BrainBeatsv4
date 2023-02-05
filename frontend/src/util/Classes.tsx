import {IMusicSettings} from "./Interfaces"
import {InstrumentTypes, NoteDurations} from "./Enums"

export class MusicGenerationSettings implements IMusicSettings {
    instruments: [
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4
        _04: number,
        _05: number,
        _06: number,
        _07: number,
    ]

    durations: [
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4
        _04: number,
        _05: number,
        _06: number,
        _07: number,
    ]

    bpm: number;

    constructor([],[], bpm:number);
    constructor(instrument: [_00: number, _01: number, _02: number, _03: number, _04: number, _05: number, _06: number, _07: number],
                duration: [_00: number, _01: number, _02: number, _03: number, _04: number, _05: number, _06: number, _07: number],
                bpm: number) {
                    this.resetSettings();

                    this.instruments = instrument;
                    this.durations = duration;
                    this.bpm = bpm;
                }

    public getInstruments() {
        return this.instruments;
    }

    public getDurations() {
        return this.durations;
    }

    public getBPM() {
        return this.bpm;
    }

    public resetSettings() {
        this.instruments.fill(InstrumentTypes.NULL);
        this.durations.fill(NoteDurations.NULL);
    }
}

// function setNoteSpeed(speed) {
//     switch (speed) {
//         case speed === slow:
//             applyNoteSpeed(-3, 0, 4, 7, 2, 1, 1, 0, 100);
//             break;
//         case speed === med:
//             applyNoteSpeed(-3, 2, 5, 6, 2, 2, 1, 1, 120);
//             break;
//         case speed === quick:
//             applyNoteSpeed(4, 2, 3, 0, 3, 3, 2, 2, 140);
//             break;
//         case speed === fast:
//             applyNoteSpeed(-3, 0, 4, 3, 4, 4, 3, 3, 160);
//             break;
//     }
// }