import { Devices, initDevice } from "device-decoder";
import { DataStream8Ch } from "../../util/Interfaces";
import { ConcreteCytonStream } from '../../util/DeviceAbstractFactory';



function Record() {
    var deviceType:string;
    var device:any
    
    async function doRecording() {
        // Later create new instance of parent class, which decides which constructor to utilize
        // based on device type string

        deviceType = 'cyton';
        if(deviceType === 'cyton')
            device = new ConcreteCytonStream();
        // else if (deviceType === 'ganglion')
        //     device = new ConcreateGanglionStream();

        let a = await device.initializeConnection();

    }

    function stopRecording() {
        console.log("stopping...");
        if(device !== undefined) {
            device.setStopFlag();
        }
    }

    return(<div>
        <button onClick={doRecording}>Record</button>
        <button onClick={stopRecording}>Stop</button>
    </div>)
}

export default Record;