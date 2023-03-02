import { ConcreteCytonStream, ConcreteGanglionStream, AbstractGanglionStream, AbstractCytonStream } from '../../util/DeviceAbstractFactory';
import { useAppSelector } from "../../Redux/hooks";
import React, {useState} from 'react';
import CardCarousel from '../CardCarousel/CardCarousel';

import './Record.css'
import RecordCards from '../ScriptContainer/Scripts/Cards/RecordCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Record() {
    const settings = useAppSelector(state => state.musicGenerationSettingsSlice)
    const scriptCards = useAppSelector(state => state.cardArraySlice);
    const [MIDIUri, setMIDIURI] = useState('');
    const [isRecording, setRecording] = useState(false);
    console.log(scriptCards);

    var deviceType:string;
    var device: AbstractGanglionStream | AbstractCytonStream;
    
    async function doRecording() {
        // Later create new instance of parent class, which decides which constructor to utilize
        // based on device type string
        if((Object.keys(settings.deviceSettings.instruments).length) === 8)
            deviceType = 'cyton';
        else
            deviceType = 'ganglion'
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
        setRecording(true);

        // Create instance of MIDIDriver class containing impl of interface for both
            // interface MIDIPlayer
            // interface MIDIWriter
                // Each containes init() begin() end()
            // Begin each passing the data channels callback, and the music settings
    }
    
    function stopRecording() {
        console.log("stopping...");
        // The purpose of this if case is to prevent errors when pressing stop if there is no device
        if(device !== undefined) {
            /* When the device is stopped it signals the call to return the MIDI since
               we are no longer recording input. This sets a use state here that spits
               it out for our own use later. */
            setMIDIURI(device.stopDevice());
        }
        setRecording(false);
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