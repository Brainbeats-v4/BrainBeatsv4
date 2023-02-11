// // Import all ganglion conection libs here
// import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; // Data acquisition
// import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.

// Import all cyton connection libs here

import { Devices, initDevice } from "device-decoder";
import {Devices as DevicesThirdParty} from 'device-decoder.third-party'
 

import { DataStream8Ch, DataStream4Ch, MusicSettings } from "./Interfaces";
import { MIDIManager } from "./MusicGeneration/MIDIManager";
import { Stream } from "stream";
import { useSelector } from "react-redux";


// Device factory for separate connection methods. (This is because either ganglion will require
// the old connection code, or we will need to create our own custom device.)
export interface DeviceAbstractFactory {
    createGanglionStream(): AbstractGanglionStream;

    createCytonStream(): AbstractCytonStream;
}

export interface AbstractGanglionStream { 
    device:any;
    flag:boolean;
    settings:MusicSettings;

    initializeConnection(): any; //datastreams.dataDevice;
    stopDevice(): string;
    recordInputStream(data: any): DataStream4Ch
}

export interface AbstractCytonStream {
    device:any;
    flag:boolean;
    settings:MusicSettings;
    // userSettings:CytonSettings;
    initializeConnection(): any;
    stopDevice(): string;
    recordInputStream(data:any): DataStream8Ch;
}

export class ConcreteCytonStream implements AbstractCytonStream {
    public device:any;
    public flag:boolean = false;
    public settings:MusicSettings;
    public midiManager;

    constructor(settings:MusicSettings) {
        this.settings = settings;
        this.midiManager = new MIDIManager(this.settings);
    }

    public async initializeConnection() {
        this.flag = false;
        await initDevice(Devices['USB']['cyton'],
                {   // this pushes the data from the headband as it is received from the board into the channels array
                    ondecoded: (data) => { this.recordInputStream(data) }, 
                    onconnect: (deviceInfo) => console.log(deviceInfo), 
                    ondisconnect: (deviceInfo) => console.log(deviceInfo)
                }).then((res) => {
                    if(res) {
                        this.device = res; // store the connected device's stream into the global variable
                    }
                }).catch((err)=> {
                    console.log(err);
                })
    }

    /* This function records input stream from the device and inputs it into
       the MIDIManager class which will return us a MIDI file upon request. */
    public recordInputStream(data:any) {
        let currentData:DataStream8Ch = {
            channel00: data[0][0],
            channel01: data[1][0],
            channel02: data[2][0],
            channel03: data[3][0],
            channel04: data[4][0],
            channel05: data[5][0],
            channel06: data[6][0],
            channel07: data[7][0],
            timeStamp: data['timestamp'][0]
       }

       // This should be passed to the note manager
        
        return currentData;
    }

    public stopDevice() {
        this.flag = true;
        this.device.disconnect();
        return this.midiManager.returnMIDI();
    }
}

// Concreate Ganglion factory 
export class ConcreteGanglionStream implements AbstractGanglionStream {
    public device:any;
    public flag:boolean = false;
    public settings:MusicSettings;
    public midiManager;

    constructor(settings:MusicSettings) {
        this.settings = settings;
        this.midiManager = new MIDIManager(this.settings);
    }

    public async initializeConnection() {
        this.flag = false;
        await initDevice(DevicesThirdParty['BLE']['ganglion'],
                {   // this pushes the data from the headband as it is received from the board into the channels array
                    ondecoded: (data) => { this.recordInputStream(data) }, 
                    onconnect: (deviceInfo) => console.log(deviceInfo), 
                    ondisconnect: (deviceInfo) => console.log(deviceInfo)
                }).then((res) => {
                    if(res) {
                        this.device = res; // store the connected device's stream into the global variable
                    }
                }).catch((err)=> {
                    console.log(err);
                })
    }

    /* This function records input stream from the device and inputs it into
       the MIDIManager class which will return us a MIDI file upon request. */
    public recordInputStream(data:any) {
        let currentData:DataStream4Ch = {
            channel00: data[0][0],
            channel01: data[1][0],
            channel02: data[2][0],
            channel03: data[3][0],
            timeStamp: data['timestamp'][0]
       }

       // This should be passed to the note manager
        
        return currentData;
    }

    public stopDevice() {
        this.flag = true;
        this.device.disconnect();
        return this.midiManager.returnMIDI();
    }
}


// export class GanglionRecording implements DeviceFactory {
// }

export {}