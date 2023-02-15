export interface DataStream8Ch {
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

export interface DataStream4Ch {
    channel00:number;
    channel01:number;
    channel02:number;
    channel03:number;
    timeStamp:number;
}

export interface MusicSettings {
    // Defines the Beats per Minute (BPM) of the output track
    octaves: number;
    numNotes: number;
    bpm: number;
    keyGroup: string;
    scale: string;
    deviceSettings:CytonSettings|GanglionSettings;
}

export type GanglionSettings = {
    // Defines what instument sound is to be associated with each node
    instruments: {
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4
    }

    // Defines what duration of note each node will have
    durations: {
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4x
    }
}

export type CytonSettings = {
    // Used to store the instrument each node should be used to output
    instruments: {
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
    durations: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
        _04: number;
        _05: number;
        _06: number;
        _07: number;
    }
}

export type Picture = {
    width: number,
    height: number,
    color: string,
    description: string,
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        small_s3: string,
        thumb: string,
    },
}

export type Card = {
    textColor:{
        r: string,
        g: string,
        b: string,
        a: string,
    },
    backgroundColor: {
        r: string,
        g: string,
        b: string,
        a: string,
    },
    url: string,
    text: string,
    speed: number,
}

export interface Track {
    createdAt: string;
    id: string;
    likeCount: number;
    midi: string;
    public: boolean;
    thumbnail: string;
    title: string;
    userID: string;
    fullname: string;
}

/*
export interface GanglionSettings {
    // Defines what instument sound is to be associated with each node
    instruments: {
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4
    }

    // Defines what duration of note each node will have
    durations: {
        _00: number,    // FP1
        _01: number,    // FP2
        _02: number,    // C3
        _03: number,    // C4x
    }
}

export interface CytonSettings {
    // Used to store the instrument each node should be used to output
    instruments: {
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
    durations: {
        _00: number; // FP1 Node
        _01: number; // FP2 Node
        _02: number; // C3 Node
        _03: number; // C4 Node
        _04: number;
        _05: number;
        _06: number;
        _07: number;
    }
}
*/