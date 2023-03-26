/* The DeviceAbstractFactory handles the connection and operation of any EEG collection device you may want to use.
    follow the AbstractCytonFactory's code in order to understand how to create a new connection yourself, almost all of the hard
    work in connecting and accessing the data stream is handled by the device-decoder library by BrainsAtPlay. To
    define a new device all you have to do is look through the Devices from device-decoder by simply using console.log(Devices) or
    by reading the documentation for all the supported devices: https://github.com/brainsatplay/device-decoder/blob/master/README.md#getting-started.
    use the initDevice() function, and define the options onconnect, ondisconnect, and ondecoded.
    The ondecoded function is the most essential one in handling the data, it defines a loop that produces the EEG stream while the device is connected
    to the application, we simply extend this logic to another function that exports it to a class (NoteHandler) to process the conversion of EEG to readable
    MIDI.
    For more reference on how the connection works if you're finding yourself having issues look at the Webwrapper by BrainsAtPlay, which is a wrapper for the
    Web Serial API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API. Keep in mind that if you don't have HTTPS certification on your
    application that this will not work in production. */

import { Devices, initDevice } from "device-decoder";
import {Devices as Devices3rdParty} from 'device-decoder.third-party'
 
import ganglion from '@brainsatplay/ganglion'
import Ganglion from 'ganglion-ble';

import { ganglionSettings } from "device-decoder.third-party";
import { DataStream8Ch, DataStream4Ch, MusicSettings } from "./Interfaces";
import { MIDIManager } from "./MusicGeneration/MIDIManager";
import { Stream } from "stream";
import { useSelector } from "react-redux";

import { NoteHandler } from "./MusicGeneration/OriginalNoteGeneration";
import { WebSerial } from "webserial-wrapper";

import EventEmitter from "events";
import { Random } from "unsplash-js/dist/methods/photos/types";

/* So we can leave specific debug statements in 
 * which will only show in dev */
var debug = require('debug');

// Device factory for separate connection methods. (This is because either ganglion will require
// the old connection code, or we will need to create our own custom device.)
export interface DeviceAbstractFactory {
    createTestStream(): AbstractTestStream;
    createGanglionStream(): AbstractGanglionStream;
    createCytonStream(): AbstractCytonStream;
    setDebugOutput(): void;
}

// Used to send random data stream values
export interface AbstractTestStream {
    stopFlag:boolean;
    settings:MusicSettings;
    initializeConnection(): any; 
    stopDevice(): Promise<string>;
    recordInputStream(data: any): void
}

export interface AbstractGanglionStream { 
    device:any;
    stopFlag:boolean;
    settings:MusicSettings;
    initializeConnection(): any; //datastreams.dataDevice;
    stopDevice(): Promise<string>;
    recordInputStream(data: any): void
}

export interface AbstractCytonStream {
    device:any;
    stopFlag:boolean;
    settings:MusicSettings;
    initializeConnection(): any;
    stopDevice(): Promise<string>;
    recordInputStream(data:any): void
}


/*  The test stream is one that is only used in development, it provides us a way to test out implementations to
    the MIDI production without having to set up a device connection, this is primarily for our
    own sanity, if you're running into playback issues/MIDI generation this is incredibly useful. */
export class ConcreteTestStream implements AbstractTestStream {
    public stopFlag:boolean;
    public settings:MusicSettings;
    public noteHandler;
    private debugOutput:boolean;
    private counter:number;

    // borrowed from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    private getRandomInt(min:number, max:number){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    constructor(settings:MusicSettings) {

        console.log("Constructed Test Stream");
        
        this.stopFlag = false;
        this.settings = settings;
        this.noteHandler = new NoteHandler(this.settings);

        this.debugOutput = false;
        this.noteHandler.setDebugOutput(false);
        this.counter = 0;
    }

    public async initializeConnection() { 
        this.stopFlag = false; 

        do {
            this.recordInputStream()
        }
        while(!this.stopFlag)
    }

    public recordInputStream() {
        // Check for flag to disconnect the device and return
        if(this.stopFlag) {
            console.log("stopping");
            return false;
        }
        let currentData:DataStream8Ch = {
            channel00: this.getRandomInt(20000, 120000),
            channel01: this.getRandomInt(20000, 120000),
            channel02: this.getRandomInt(20000, 120000),
            channel03: this.getRandomInt(20000, 120000),
            channel04: this.getRandomInt(20000, 120000),
            channel05: this.getRandomInt(20000, 120000),
            channel06: this.getRandomInt(20000, 120000),
            channel07: this.getRandomInt(20000, 120000),
            timeStamp: Date.now(),
        }

        if (this.debugOutput) { console.log("DeviceStream:", currentData); }

        this.noteHandler.originalNoteGeneration(currentData);
        return true;
    }

    public async stopDevice() {
        this.stopFlag = true;
        this.noteHandler.setStopFlag();

        return await this.noteHandler.returnMIDI();
    }

    public setDebugOutput(b:boolean) { this.debugOutput = b; }
    
}

export class ConcreteCytonStream implements AbstractCytonStream {
    public device:any;
    public stopFlag:boolean;
    public settings:MusicSettings;
    public noteHandler;
    private debugOutput:boolean;

    constructor(settings:MusicSettings) {
        this.stopFlag = false;
        this.settings = settings;
        this.noteHandler = new NoteHandler(this.settings);
        
        
        /* If in dev, and you click "toggle debug", it will cascade and set them all.
         * (Planning to change to event system if time.)
         * or, individually set this to true to enable music related output during recording.
         * Ex: 
         * Channel 1: At Rest 
         * ... 
         * Channel k: Playing G#  
         */
        this.debugOutput = false;
        this.noteHandler.setDebugOutput(false); 
    }

    public setDebugOutput(b:boolean) { this.debugOutput = b;}

    /*  The initializeConnection function is where the magic happens here, it uses the device-decoder library
        from BrainsAtPlay (Big thanks to Josh Brew for a lot of help with hooking this up). The documentation
        for this library can be found here: https://github.com/brainsatplay/device-decoder/. */
    public async initializeConnection() {
        this.stopFlag = false;
        /* Devices['USB']['cyton] from BrainsAtPlay stores all the information needed to setup a connection using USB,
            if you are looking to init */

        await initDevice(Devices['USB']['cyton'],
        {   // this pushes the data from the headband as it is received from the board into the channels array
            ondecoded: (data) => {
                this.recordInputStream(data);
            }, 
            onconnect: (deviceInfo) => {
                this.device = deviceInfo;
                
                if (this.debugOutput) console.log(deviceInfo);
                
            }, 
            ondisconnect: (deviceInfo) => {
                if (this.debugOutput) console.log("on disconnect: ", deviceInfo)
            }
        }).then((res) => {
            //this.device = res; // store the connected device's stream into the global variable
        }).catch((err)=> {
            console.error("Forcefully halted record!");
        })
    }

    /*  This function records the input stream from the device and inputs it into the MIDIManager class which 
        is turning the DataStream into a note to be played back in real time and generates a MIDI file in the process.
        This is being called continuously as the data is input */
    public recordInputStream(data:any) {
        
        // Check for flag to disconnect the device and return
        if(this.stopFlag) {
            this.device.disconnect();
            return;
        }

        // Package the data so it is easier to handle
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
        
        if (this.debugOutput) { console.log("DeviceStream:", currentData); }

        this.noteHandler.originalNoteGeneration(currentData);
    }

    /*  Technically all the stopDevice function does is set a boolean to let the rest of the running methods
        of the class know that we're stopping. This is sort of an ugly way to do this since ideally the stopDevice
        method has access to the device instance, but since the intializeConnection function never halts because it
        is continuously decoding, we have to check in there to see if we're wanting to stop. Once we let the other
        instances know we're no longer needing them, we return the MIDI, the noteHandler.returnMIDI is further expanded
        upon in the MIDIManager.tsx file. */
    public async stopDevice() {
        this.stopFlag = true;
        this.noteHandler.setStopFlag();

        var res:string;

        try {
            var res = await this.noteHandler.returnMIDI();
            return res;
        }
        catch {
            console.error("Error returning midi");
            return "Error";
        }

        return res;
        // res.then((res:string) => {return res}).catch((e:any) => {return "Faled to generate midi: " + e})

        // console.log(res);
        // return "";
    }
}

// Concreate Ganglion factory 
export class ConcreteGanglionStream implements AbstractGanglionStream {
    public device:any;
    public stopFlag:boolean;
    public settings:MusicSettings;
    public noteHandler:NoteHandler;
    private debugOutput:boolean;

    constructor(settings:MusicSettings) {
        this.settings = settings;
        this.noteHandler = new NoteHandler(this.settings);
        this.noteHandler.setDebugOutput(true);
        this.stopFlag = false;
        this.debugOutput = false;
    }

    public setDebugOutput(b:boolean) {
        this.debugOutput = b;
    }

    public async initializeConnection() {
        console.log("Starting Ganglion Connection");
        this.stopFlag = false;

        // let device = DevicesThirdParty['BLE_CUSTOM']['ganglion'];
        let device = new Ganglion();
        console.log(device);
        let conn = await device.connect();
        console.log(conn);
        let start = await device.start();
        console.log(start);
    }

    /* This function records input stream from the device and inputs it into
       the MIDIManager class which will return us a MIDI file upon request. */
    public recordInputStream(data:any) {
        // Check for flag to disconnect the device and return
        if(this.stopFlag) {
            this.device.disconnect();
            return;
        }

        let currentData:DataStream4Ch = {
            channel00: data[0][0],
            channel01: data[1][0],
            channel02: data[2][0],
            channel03: data[3][0],
            timeStamp: data['timestamp'][0]
       }

       this.noteHandler.originalNoteGeneration(currentData);
    }

    public async stopDevice() {
        this.stopFlag = true;
        this.device.disconnect();
        
        return await this.noteHandler.returnMIDI();
    }
}


export {}