import { Devices, initDevice } from "device-decoder";
import { DataStream8Ch } from "../../util/Interfaces";
import { ConcreteCytonStream } from '../../util/DeviceAbstractFactory';



function Record() {
    var deviceType:string;
    var device:any
    
    function doRecording() {
        // Later create new instance of parent class, which decides which constructor to utilize
        // based on device type string
        
        if(deviceType === 'cyton')
            device = new ConcreteCytonStream();
        // else if (deviceType === 'ganglion')
        //     device = new ConcreateGanglionStream();
        device.initializeConnection();
    }

    function stopRecording() {
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