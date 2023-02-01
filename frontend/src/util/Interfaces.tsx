export interface DataStream {
    channel00:number;
    channel01:number;
    channel02:number;
    channel03:number;
    channel04:number;
    channel05:number;
    channel06:number;
    channel07:number;
    timeStamp:number;
}

export interface IMusicSettings {
    // Defines what instument sound is to be associated with each node
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

    // Defines what duration of note each node will have
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

    // Defines the Beats per Minute (BPM) of the output track
    bpm: number;
}

export interface IMusicSettingsPreset1 extends IMusicSettings {

    
    // -3, 0, 4, 7, 2, 1, 1, 0, 100
    // -3, 2, 5, 6, 2, 2, 1, 1, 120
    // 4, 2, 3, 0, 3, 3, 2, 2, 140
    // -3, 0, 4, 3, 4, 4, 3, 3, 160

}

export interface IMusicSettingsPreset2 extends IMusicSettings {}
export interface IMusicSettingsPreset3 extends IMusicSettings {}
export interface IMusicSettingsPreset4 extends IMusicSettings {}
            