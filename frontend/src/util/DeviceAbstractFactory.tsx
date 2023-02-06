// // Import all ganglion conection libs here
// import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; // Data acquisition
// import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.

// Import all cyton connection libs here
import { Devices, initDevice } from "device-decoder";


import { DataStream8Ch, DataStream4Ch } from "./Interfaces";
import { Stream } from "stream";


// Device factory for separate connection methods. (This is because either ganglion will require
// the old connection code, or we will need to create our own custom device.)
interface DeviceAbstractFactory {
    createGanglionStream(): AbstractGanglionStream;

    createCytonStream(): AbstractCytonStream;
}

interface AbstractGanglionStream { 
    initializeConnection(): any; //datastreams.dataDevice;
    setStopFlag(): boolean;
    handleChannels(stream: any): DataStream4Ch
}

interface AbstractCytonStream {
    device:any;
    initializeConnection(): any;
    setStopFlag(): boolean;
    handleChannels(data:any): DataStream8Ch;
}

export class ConcreteCytonStream implements AbstractCytonStream {
    public device:any;
        
    public async initializeConnection() {
        await initDevice(Devices['USB']['cyton'],
                {   // this pushes the data from the headband as it is received from the board into the channels array
                    ondecoded: (data) => { this.handleChannels(data)}, 
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

    public handleChannels(data:any) {
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

        return currentData;
    }

    public setStopFlag() {
        if(this.device.disconnect()) return true;
        return false;
    }
}

// // Concreate Ganglion factory 
// class ConcreteGanglionStream implements AbstractGanglionStream {
    
//     private stopFlag = false;

//     // Returns the ganglion stream
//     public initializeConnection(): datastreams.dataDevice {
//         this.stopFlag = false;
//         let dataDevices = datastreams.DataDevices();
//         dataDevices.load(ganglion);
        
//         const dataDevice = await dataDevices.getUserDevice({ label:'ganglion' });

//         return dataDevice.stream;
//     }
//     public setStopFlag(): boolean {
//         this.stopFlag = true;
//         return this.stopFlag;
//     }

//     public handleChannels(stream: any): DataStream4Ch {
//         // Handle all tracks
//         stream.tracks.forEach(this.handleTrack);
//         stream.onaddtrack = (e: any) => this.handleTrack(e.track);
        
        
        
//         let temp = {
//             channel00: stream[0][0],
//             channel01: stream[0][1],
//             channel02: stream[0][2],
//             channel03: stream[0][3],
//             timeStamp: stream['timestamp'][0];
//         }
//         return temp;
//     }

//     private handleTrack(track: any){
//         const allData = [];
//         let channels = 0;
//         let trackMap = new Map();
//         let contentHintToIndex = {};
        
//         /*
//         while (!this.stopFlag) {

//             track.subscribe((data: any) => {

//                 // Map track information to index
//                 if (!trackMap.has(track.contentHint)) {
//                     const index = trackMap.size;
//                     contentHintToIndex[track.contentHint] = index;
//                     trackMap.set(index, track);
//                 }

//                 // Grab index
//                 const i = contentHintToIndex[track.contentHint];
//                 channels = i > channels ? i : channels; // Assign channels as max track number

//             })
//         }
//         */
//     }
// }


// // export class GanglionRecording implements DeviceFactory {
// // }

export {}