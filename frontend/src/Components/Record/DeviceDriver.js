import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; // Data acquisition
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.



function DeviceDriver() {
    /*  Initialize the connection to the device, input specification of device where device is a string and
        can be either ganglion or cyton */
    function initializeConnection(device) {
        var dataDevice;

        if(device === 'ganglion') {
            new datastreams.DataDevices().getUserDevice(device);
        }
        else if(device === 'cyton') {
            // handle usb connection with cyton board
        }
        return dataDevice
    }

    /*  Once the connection to the device is set we then can access the EEG from the board
        this runs asynchroniously, device is a DataDevice from datastreams that is
        aquired through the initializeConnection function  */
    async function aquireEEG(device) {
        const stream = device.stream; // The datastream aquired from our device

        var tracks = stream.tracks;
        for(var i = 0; i < tracks.length; i++) {
            
        }
    }
}


export default DeviceDriver;