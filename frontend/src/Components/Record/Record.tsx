import { Devices, initDevice } from "device-decoder";
import { DataStream8Ch } from "../../util/Interfaces";
import { DeviceAbstractFactory, ConcreteCytonStream, ConcreteGanglionStream, AbstractGanglionStream, AbstractCytonStream } from '../../util/DeviceAbstractFactory';


function Record() {
    var deviceType:string;
    var device: AbstractGanglionStream | AbstractCytonStream;
    
    async function doRecording() {
        // Later create new instance of parent class, which decides which constructor to utilize
        // based on device type string
        switch (deviceType) {
            case "cyton":
                device = new ConcreteCytonStream();
                break;
            case "ganglion": 
                device = new ConcreteGanglionStream();
                break;      
            default: return;
        }
        
        device.initializeConnection();
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