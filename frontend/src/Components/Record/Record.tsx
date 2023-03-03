import { ConcreteCytonStream, ConcreteGanglionStream, AbstractGanglionStream, AbstractCytonStream } from '../../util/DeviceAbstractFactory';
import { useAppSelector } from "../../Redux/hooks";
import {useState} from 'react';

import './Record.css'
import RecordCards from '../ScriptContainer/Scripts/Cards/RecordCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Record() {
    const settings = useAppSelector(state => state.musicGenerationSettingsSlice)
    const [MIDIUri, setMIDIURI] = useState('');
    const [isRecording, setRecording] = useState(false);
    /*  Add the interface of a new stream here in the case that you've created a new one, you should define it in the DeviceAbstractFactory
    and import it. */
    const [device, setDevice] = useState<AbstractGanglionStream | AbstractCytonStream>();
    
    /*  doRecording simply creates an instance of the device we're using, in our case we only have the ganglion board and the
        cyton board, the if condition that assigns the deviceType is checking to see the number of channels accepted, here you
        could define this earlier and pass it down to this function (in the case that you have different EEG device with the same
        number of channels) but we didn't see a need for it in our case. */
    async function doRecording() {
        var deviceType:string;
        if((Object.keys(settings.deviceSettings.instruments).length) === 8) deviceType = 'cyton';
        else deviceType = 'ganglion'
        switch (deviceType) {
            case "cyton":
                setDevice(new ConcreteCytonStream(settings));
                break;
            case "ganglion": 
                setDevice(new ConcreteGanglionStream(settings));
                break;
            default: return;
        }
        /*  Once we have defined the class we can initialize it. If you're to add another one of these it's important 
            to make sure that its class has an initializeConnection function to keep this function clean and avoid 
            conditionals here. In the case that somebody didn't connect a proper device, it's important not to call the
            initialize connection function to avoid errors. */
        if(device) {
            device.initializeConnection();
            setRecording(true); // Used for the record button in the HTML.
        } 
    }
    
    function stopRecording() {
        /* When the device is stopped it signals the call to return the MIDI since
            we are no longer recording input. This sets a use state here that stores
            it in base64 to be stored in the database and make it easily downloadable.
            Technically, the if conditional here isn't necessary since the stop button
            won't show up unless the device connects, but react can't think that hard. */
        console.log('stopping device');
        console.log(device);
        
        if(device) setMIDIURI(device.stopDevice()); 


    }

    return(
        <div className='container' id='record-container'>
            <h2 className='record-heading'>Recording Music</h2>
            <div id='record-container-body'>
                <div id='script-div'>
                    <RecordCards></RecordCards>
                </div>
                <div id='record-btns-div'>
                   {!isRecording && <button type="button" className="btn btn-secondary" id='recording-play-btn' onClick={doRecording}>
                        <FontAwesomeIcon icon={["fas", "circle"]} />
                        Record
                    </button>}
                   {isRecording &&  <button type="button" className="btn btn-secondary" id='recording-stop-btn' onClick={stopRecording}>
                        <FontAwesomeIcon icon={["fas", "square"]} />
                        Stop
                    </button>}
                    <a id='download-midi-btn' download={'currentMIDI.MID'} href={MIDIUri}>
                        <FontAwesomeIcon icon={["fas", "arrow-up-from-bracket"]} />
                        download the midi
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Record;