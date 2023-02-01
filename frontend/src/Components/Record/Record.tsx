import { Devices, initDevice } from "device-decoder";
import { useEffect, useState } from "react";

function Record() {
    const [disconnectFlag, setDisconnectFlag] = useState(false);

    
    /* This function just tells the device to begin storing input, the connection should initialize on page load */
    async function initializeConnection () {
        var deviceReader = await initDevice(Devices['USB']['cyton'],
        {
            ondecoded: (data) => {
                if(!disconnectFlag) {
                    handleChannels(data)
                }
                else if(disconnectFlag) {
                    deviceReader.disconnect();
                }
            }, // this pushes the data from the headband as it is received from the board into the channels array
            onconnect: (deviceInfo) => console.log(deviceInfo), // on connection this will print out the information our device contains
            ondisconnect: (deviceInfo) => console.log(deviceInfo)
        });
    }

    function handleChannels(data:any) {
        console.log(data);
    }

    function stopRecording() {
        setDisconnectFlag(true);
    }


    return(<div>
        <button onClick={initializeConnection}> Device</button>
        <button onClick={stopRecording}>Disconnect Device</button>
    </div>)
}

export default Record;