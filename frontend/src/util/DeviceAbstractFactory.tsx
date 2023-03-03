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
    stopFlag:boolean;
    settings:MusicSettings;
    // userSettings:CytonSettings;
    initializeConnection(): any;
    stopDevice(): string;
    recordInputStream(data:any): any;
}

export class ConcreteCytonStream implements AbstractCytonStream {
    public device:any;
    public stopFlag:boolean;
    public settings:MusicSettings;
    public noteHandler;

    constructor(settings:MusicSettings) {
        this.stopFlag = false;
        this.settings = settings;
        this.noteHandler = new NoteHandler(this.settings);
        this.noteHandler.setDebugOutput(false);                         // Debug
    }

    /*  The initializeConnection function is where the magic happens here, it uses the device-decoder library
        from BrainsAtPlay (Big thanks to Josh Brew for a lot of help with hooking this up). The documentation
        for this library can be found here: https://github.com/brainsatplay/device-decoder/. */
    public async initializeConnection() {
        this.stopFlag = false;
        /* Devices['USB']['cyton] from BrainsAtPlay stores all the information needed to setup a connection using USB,
            if you are looking to init */
        await initDevice(Devices['USB']['cyton'],
        {   // this pushes the data from the headband as it is received from the board into the channels array
            ondecoded: (data) => { this.recordInputStream(data) }, 
            onconnect: (deviceInfo) => console.log(deviceInfo), 
            ondisconnect: (deviceInfo) => console.log(deviceInfo),
        }).then((res) => {
            this.device = res; // store the connected device's stream into the global variable
        }).catch((err)=> {
            console.log(err);
        })
    }

    /*  This function records the input stream from the device and inputs it into the MIDIManager class which 
        is turning the DataStream into a note to be played back in real time and generates a MIDI file in the process.
        This is being called continuously as the data is input */
    public recordInputStream(data:any) {
        if(this.stopFlag === true) {
            console.log('disconnect');
            this.device.disconnect();
        }
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
        this.noteHandler.originalNoteGeneration(currentData);
    }

    /*  Technically all the stopDevice function does is set a boolean to let the rest of the running methods
        of the class know that we're stopping. This is sort of an ugly way to do this since ideally the stopDevice
        method has access to the device instance, but since the intializeConnection function never halts because it
        is continuously decoding, we have to check in there to see if we're wanting to stop. Once we let the other
        instances know we're no longer needing them, we return the MIDI, the noteHandler.returnMIDI is further expanded
        upon in the MIDIManager.tsx file. */
    public stopDevice() {
        this.noteHandler.setStopFlag();
        this.stopFlag = true;

        return this.noteHandler.returnMIDI();
    }
}

// Concreate Ganglion factory 
export class ConcreteGanglionStream implements AbstractGanglionStream {
    public device:any;
    public flag:boolean = false;
    public settings:MusicSettings;
    public noteHandler;

    constructor(settings:MusicSettings) {
        this.settings = settings;
        this.noteHandler = new NoteHandler(this.settings);
        this.noteHandler.setDebugOutput(true);
    }

    public async initializeConnection() {
        console.log("Starting Ganglion Connection");
        this.flag = false;

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
        let currentData:DataStream4Ch = {
            channel00: data[0][0],
            channel01: data[1][0],
            channel02: data[2][0],
            channel03: data[3][0],
            timeStamp: data['timestamp'][0]
       }
    //    console.log(currentData);

    //    this.noteHandler.originalNoteGeneration(currentData);
       // This should be passed to the note manager
        
        return currentData;
    }

    public stopDevice() {
        this.flag = true;
        this.device.disconnect();
        return this.noteHandler.returnMIDI();
    }
}


export {}