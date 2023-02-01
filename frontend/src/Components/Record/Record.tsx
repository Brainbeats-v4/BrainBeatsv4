import { Devices, initDevice } from "device-decoder";

function Record() {
    
    /* This function will take input in from the device, for now it is received as input into the function
        but we will change this into taking in the input from the settings components */
    function initializeConnection (deviceName:string) {
        var device;
        if(deviceName==='cyton') {
            device = Devices['USB'][deviceName];
        }
    
        /*  Creates a stream of EEG data from the headband, there are other customizable options referrenced by the
            documentation for device-decoder, but for our purposes we leave them out */
        var deviceReader = initDevice(device, {
            ondecoded: (data) => {handleChannels(data)}, // this pushes the data from the headband as it is received from the board into the channels array
            onconnect: (deviceInfo) => console.log(deviceInfo), // on connection this will print out the information our device contains
            ondisconnect: (deviceInfo) => console.log(deviceInfo) // will do the same as above but on disconnect
        });
    };

    function handleChannels(data:any) {
        console.log(data);
    }

    return(<div>
        <button onClick={() => initializeConnection('cyton')}>Connect Device</button>
    </div>)
}

export default Record;