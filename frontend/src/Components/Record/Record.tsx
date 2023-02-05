import { Devices, initDevice } from "device-decoder";
import { DataStream8Ch } from "../../util/Interfaces";

function Record() {
    var device:any;
    
    /*  This function tells the device to begin storing input, the initDevice function
        will be dynamic based on whether we input ganglion/cyton */
    async function initializeConnection () {
        // Devices['USB']['cyton']
        await initDevice(Devices['USB']['hegduino'],
                {   // this pushes the data from the headband as it is received from the board into the channels array
                    ondecoded: (data) => { handleChannels(data)}, 
                    onconnect: (deviceInfo) => console.log(deviceInfo), 
                    ondisconnect: (deviceInfo) => console.log(deviceInfo)
                }).then((res) => {
                    device = res; // store the connected device's stream into the global variable
                }).catch((err)=> {
                    console.log(err);
                })
    }

    

    // Device output passed here
    function handleChannels(data:any) {

        // Convert to our interface
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

       // Pass to MIDIManager class

        console.log(currentData);
    }

    /*  Tells our global device to stop recording, this will also end up triggeing the modal
        with the track in MIDI format */
    function stopRecording() {
        device.disconnect();
    }

    return(<div>
        <button onClick={initializeConnection}>Record</button>
        <button onClick={stopRecording}>Stop</button>
    </div>)
}

export default Record;