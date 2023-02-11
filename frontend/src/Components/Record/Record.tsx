import { ConcreteCytonStream, ConcreteGanglionStream, AbstractGanglionStream, AbstractCytonStream } from '../../util/DeviceAbstractFactory';
import { useAppSelector } from "../../Redux/hooks";
import React, {useState} from 'react';

function Record() {
    const settings = useAppSelector(state => state.musicGenerationSettingsSlice)
    console.log(settings);

    const [MIDIUri, setMIDIURI] = useState('');

    var deviceType:string;
    var device: AbstractGanglionStream | AbstractCytonStream;
    
    async function doRecording() {
        // Later create new instance of parent class, which decides which constructor to utilize
        // based on device type string
        switch (deviceType) {
            case "cyton":
                device = new ConcreteCytonStream(settings);
                break;
            case "ganglion": 
                device = new ConcreteGanglionStream(settings);
                break;      
            default: return;
        }
        
        device.initializeConnection();
        

        // Create instance of MIDIDriver class containing impl of interface for both
            // interface MIDIPlayer
            // interface MIDIWriter
                // Each containes init() begin() end()
            // Begin each passing the data channels callback, and the music settings
    }
    
    function stopRecording() {
        console.log("stopping...");
        if(device !== undefined) {
            /* When the device is stopped it signals the call to return the MIDI since
               we are no longer recording input. This sets a use state here that spits
               it out for our own use later. */
            setMIDIURI(device.stopDevice());
        }
    }

    return(<div>
        <button onClick={doRecording}>Record</button>
        <button onClick={stopRecording}>Stop</button>
        <span>{MIDIUri}</span>
    </div>)
}

export default Record;