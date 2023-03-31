import { ConcreteCytonStream, ConcreteGanglionStream, ConcreteTestStream } from '../../util/DeviceAbstractFactory';
import { useAppSelector } from "../../Redux/hooks";
import {useState, useEffect} from 'react';

import './Record.css'
import RecordCards from '../ScriptContainer/Scripts/Cards/RecordCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormGroup, ToggleButton } from 'react-bootstrap';
import isDev from '../../util/isDev';
import { Link } from 'react-router-dom';

function Record() {
    const settings = useAppSelector(state => state.musicGenerationSettingsSlice);
    const deviceName = useAppSelector(state => state.deviceSlice);
    const [MIDIUri, setMIDIURI] = useState('');
    const [isRecording, setRecording] = useState(false);
    const [debugOption1, setDebugOption1] = useState(false);
    const [debugOption2, setDebugOption2] = useState(false);
    const [debugOption3, setDebugOption3] = useState(false);
    const [setup, setSetup] = useState(false);
    
    /*  Add the interface of a new stream here in the case that you've created a new one, you should define it in the DeviceAbstractFactory
    and import it. */
    const [device, setDevice] = useState<ConcreteGanglionStream | ConcreteCytonStream | ConcreteTestStream>();

    // Dev Debug button ----------------------------------
    const [debugBool, setDebug] = useState(false);

    function toggleDebug(soption:number) {
        setDebug(!debugBool);
        console.log("debug: ", debugBool);
        device?.setDebugOutput(debugBool);
    }
    // ------------------------------- End Dev Debug button

    /* This useEffect is crucial!
     * This will set/unset the device once the change has been detected from "doRecording()" */
    useEffect(() => {
        // set
        if (device) {
            setTimeout(() => {
                setRecording(true); // Used for the record button in the HTML.
                device.setDebugOutput(debugBool);
            }, 3000);

            device.initializeConnection();
        }
        // unset 
        else {
            setRecording(false);
        }
      }, [device]);
    
    /*  doRecording simply creates an instance of the device we're using, in our case we only have the ganglion board and the
        cyton board, the if condition that assigns the deviceType is checking to see the number of channels accepted, here you
        could define this earlier and pass it down to this function (in the case that you have different EEG device with the same
        number of channels) but we didn't see a need for it in our case. */
    async function doRecording() {
        var dev:any;

        console.log("device:", deviceName);

        switch (deviceName) {
            case "random data":
                setDevice(new ConcreteTestStream(settings));
                break;
            case "cyton":
                setDevice(new ConcreteCytonStream(settings));
                break;
            case "ganglion": 
                setDevice(new ConcreteGanglionStream(settings));
                break;
            default: return;
        }

        /* ! Use Effect above will now be triggered */
        
        /*  Once we have defined the class we can initialize it. If you're to add another one of these it's important 
            to make sure that its class has an initializeConnection function to keep this function clean and avoid 
            conditionals here. In the case that somebody didn't connect a proper device, it's important not to call the
            initialize connection function to avoid errors. */
    }
    
    function stopRecording() {
        console.log('Clicked Stop');
        
        /* When the device is stopped it signals the call to return the MIDI since
            we are no longer recording input. 
            This will check for sucessful return of a MIDI base64 string to be stored 
            in the database and make it easily downloadable. */

        
        device?.stopDevice()?.then(
            (url:string) => {
                console.log("Midi URL from Record.tsx: ", url);
                setMIDIURI(url);
            }
        ).catch(err => {
            console.error('Unable to stop device: ', err);
        })

        setDevice(undefined);
        setRecording(false);
    }

    function handleForm(e:number) {
        switch(e) {
            case 1:
                setDebugOption1(!debugOption1);
                break;
            case 2:
                setDebugOption2(!debugOption2);
                break;
            case 3:
                setDebugOption3(!debugOption3);
                break;
            default: 
                break;
        }
    }

    function showSetup() {
        setSetup(true);
    }

    return(
        <div className='container' id='record-container'>
            <h2 className='record-heading'>Recording Music</h2>
            <div id='record-container-body'>
                <div id='script-div'>
                    <RecordCards></RecordCards>
                </div>

                <div id='record-btns-div'>
                    
                    {/* Debug checkboxes --------(from bootstrap)----------------- */}
                    {isDev() && <div className="devBox">
                        <h2>Debug options</h2>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault" checked={debugOption1} onClick={() => handleForm(1)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                device info & datastream <br/> (DeviceAbstractFactory)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="2" id="flexCheckDefault" checked={debugOption2} onClick={() => handleForm(2)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                note generation stream <br/> (OriginalNoteGeneration)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="3" id="flexCheckDefault" checked={debugOption3} onClick={() => handleForm(3)}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                midi playback <br/> (MIDIManager)
                            </label>
                        </div>
                    </div>}
   
                    {/* ------------------------------------- End Debug checkboxes */}
                    <div className="setupGuide">
                            <h2>New to BrainBeats?</h2>
                            <p onClick={showSetup}>If you need to understand how to get started, view our setup guide <Link to="/setup" target="_blank">here.</Link><br />
                            Otherwise, continue by hitting the record button below:</p>

                    </div>
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