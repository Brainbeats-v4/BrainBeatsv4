import react, { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentTypes, NoteDurations } from '../../util/Enums';
import { KEY_SIGNATURES } from '../../util/Constants';
import { CytonSettings } from '../../util/Interfaces';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks';

// Redux state to hold settings for specificed board
import { set } from '../../Redux/slices/cytonMusicGenerationSettingsSlice';

import './TrackSettings.css';


/* uploadPost will be moved from here into the record, the logic is useful for now though */

/*  This function just maps the enum InstrumentTypes into an options list to be displayed on the settings to keep the
    code cleaner, it starts at -3 since it is the initial value described in the Enum, adding the NULL value at the end */
const InstrumentSettings = memo(() => {
    var instrumentArray:any[] = [];
    for(var i = -3; i <= 7; i++) {
        let instrument = { value: i, name: InstrumentTypes[i] }
        instrumentArray.push(instrument);
    }
    instrumentArray.push({value: -Infinity, name: "NULL"})
    return( 
        <>
            {instrumentArray.map((instrument) =>
                <option key={instrument.name} value={instrument.value}>{instrument.name}</option>)
            }
        </>
    )    
})

/* This function serves the same purpose as the InstrumentSettings function above with the same logic just extended for NoteDuration */
const NoteSettings = memo(() => {
    var noteArray:any[] = [];
    for(var i = 0; i <= 4; i++) {
        let noteDuration = { value: i, name: NoteDurations[i] }
        noteArray.push(noteDuration);
    }
    noteArray.push({value: -Infinity, name: "NULL"})
    return( 
        <>
            {noteArray.map((noteDuration) =>
                <option key={noteDuration.name} value={noteDuration.value}>{noteDuration.name}</option>)
            }
        </>
    )    
});




const TrackSettings = () => {

    const settings = useAppSelector(state => state.cytonMusicGenerationSettingsSlice)
    const [generationType, setGenerationType] = react.useState('slowAndMelodic');
    // Function for toggling between Basic and Advanced Settings.
    const[advSettingsOpen, setAdvSettingsOpen] = react.useState(false);
    const toggle = () => setAdvSettingsOpen(!advSettingsOpen);
    const [device, setDevice] = useState('cyton');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* These useStates set the music generation settings to be passed to the classes for each respective device,
        the first 4 of each case are used for ganglion and cyton and the next four are for the cyton board. */
    
    /* These define the instrument type that will play based on the readings from each electrode. */
    const [instrument00, setInstrument00] = useState(InstrumentTypes.NULL)
    const [instrument01, setInstrument01] = useState(InstrumentTypes.NULL)
    const [instrument02, setInstrument02] = useState(InstrumentTypes.NULL)
    const [instrument03, setInstrument03] = useState(InstrumentTypes.NULL)
    const [instrument04, setInstrument04] = useState(InstrumentTypes.NULL)
    const [instrument05, setInstrument05] = useState(InstrumentTypes.NULL)
    const [instrument06, setInstrument06] = useState(InstrumentTypes.NULL)
    const [instrument07, setInstrument07] = useState(InstrumentTypes.NULL)
    /* These define the duration of each note. */
    const [duration00, setDuration00] = useState(NoteDurations.NULL)
    const [duration01, setDuration01] = useState(NoteDurations.NULL)
    const [duration02, setDuration02] = useState(NoteDurations.NULL)
    const [duration03, setDuration03] = useState(NoteDurations.NULL)
    const [duration04, setDuration04] = useState(NoteDurations.NULL)
    const [duration05, setDuration05] = useState(NoteDurations.NULL)
    const [duration06, setDuration06] = useState(NoteDurations.NULL)
    const [duration07, setDuration07] = useState(NoteDurations.NULL)

    let curSettingsState = useAppSelector(state => state.cytonMusicGenerationSettingsSlice);

    const [settingsChoices, setSettingsChoices] = useState(curSettingsState);

    const [bpm, setBpm] = useState(120);
    const [octaves, setOctaves] = useState(1);
    const [numNotes, setNumNotes] = useState(7);
    const [key, setKey] = useState('');


    function applySettingsEvent() {

        
        if(device === 'cyton') {
            
            setNumNotes(octaves*7);


            var generationSettings:CytonSettings = {
                // Used to store the instrument each node should be used to output
                instruments: {
                    _00: instrument00, // FP1 Node
                    _01: instrument01, // FP2 Node
                    _02: instrument02, // C3 Node
                    _03: instrument03, // C4 Node
                    _04: instrument04,
                    _05: instrument05,
                    _06: instrument06,
                    _07: instrument07,
                },
                // Used to store the duration of each note a given node should be used to output
                durations: {
                    _00: duration00, // FP1 Node
                    _01: duration01, // FP2 Node
                    _02: duration02, // C3 Node
                    _03: duration03, // C4 Node
                    _04: duration04,
                    _05: duration05,
                    _06: duration06,
                    _07: duration07,
                },

                
                // numNotes: octaves * 7,
                // octaves,

                numNotes,
                octaves,
                bpm,
                key,
            }

            // Apply settings to redux
            dispatch(set(generationSettings));
        
            navigate("/script-settings")
        }

    }

    return (
        <div className='container' id='main-container'>
            {/* Displays on Basic Settings */}
            <div id="settings1" style={{display: advSettingsOpen? "none" : "block"}}>
                <h1 className='heading'>Music Settings</h1>
                <form className='justify-content-center' id='settings-container1'>
                    <h2 id='settings-text'>Basic Settings</h2>
                    <p id='settings-text'>Please select your input device:</p>                    
                    <select className="dropdowns" name="instrument2-note" onChange={(e) => setDevice(e.target.value)}>
                        <option value="cyton">Cyton Board</option>
                        <option value="ganglion">Ganglion Board</option>
                    </select>
                    <br /><br />
                    <p id='settings-text'>Please select one of the following music generation options:</p>                    
                    <div className='row' id='checkbox-div'>
                        <div className='justify-content-center' id="setting-options-div">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="slowAndMelodic" onClick={() => setGenerationType('slowAndMelodic')} defaultChecked/>
                                <label className="form-check-label" htmlFor="inlineRadio1"><span>Slow and Melodic</span></label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="moderateAndTimely" onClick={() => setGenerationType('moderateAndTimely')}/>
                                <label className="form-check-label" htmlFor="inlineRadio2"><span>Moderate and Timely</span></label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="quickAndLively" onClick={() => setGenerationType('quickAndLively')}/>
                                <label className="form-check-label" htmlFor="inlineRadio3"><span>Quick and Lively</span></label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="fastAndFrenzied" onClick={() => setGenerationType('fastAndFrenzied')}/>
                                <label className="form-check-label" htmlFor="inlineRadio4"><span>Fast and Frenzied</span></label>
                            </div>
                        </div>
                    </div>

                    <div className='form-group row justify-content-center'>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" id='next-btn' onClick={() => applySettingsEvent()}>Next</button>
                        </div>
                    </div>
                </form>

                <br />
                <h2 id='OR'>OR</h2>
                <br />

                <form className='justify-content-center' id='settings-container2'>
                    <h2 id='settings-text'>Advanced Settings</h2>
                    <p id='settings-text'>Press the button below to go to advanced music generation settings:</p>

                    <div className='form-group row justify-content-center'>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary" id='adv-btn' onClick={toggle}>Advanced Settings</button>
                        </div>
                    </div>

                </form>
            </div>

            {/* Displays on Advanced Settings */}
            <div id="settings2" style={{display: advSettingsOpen? "block" : "none"}}>
                <h1 className='heading'>Advanced Music Settings</h1>
                <form className='justify-content-center adv-settings-container'>
                    <h2 id='settings-text'>Instruments</h2>
                    <div className='row instruments-div'>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument1">Instrument 1:</label>
                            <select className="dropdowns" name="instrument1" id="instrument1-options" onChange={(e => {setInstrument00(Number(e.target.value))})}>         
                               <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument1-note">Instrument 1 Note Type:</label>
                            <select className="dropdowns" name="instrument1-note" id="instrument1-notes" onChange={(e => {setDuration00(Number(e.target.value))})}>
                                <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument2">Instrument 2:</label>
                            <select className="dropdowns" name="instrument2" id="instrument2-options" onChange={(e => {setInstrument01(Number(e.target.value))})}>
                                <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument2-note">Instrument 2 Note Type:</label>
                            <select className="dropdowns" name="instrument2-note" id="instrument2-notes" onChange={(e => {setDuration01(Number(e.target.value))})}>
                                <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument3">Instrument 3:</label>
                            <select className="dropdowns" name="instrument3" id="instrument3-options" onChange={(e => {setInstrument02(Number(e.target.value))})}>
                                <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument3-note">Instrument 3 Note Type:</label>
                            <select className="dropdowns" name="instrument3-note" id="instrument3-notes" onChange={(e => {setDuration02(Number(e.target.value))})}>
                                <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument4">Instrument 4:</label>
                            <select className="dropdowns" name="instrument4" id="instrument4-options" onChange={(e => {setInstrument03(Number(e.target.value))})}>
                                <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument4-note">Instrument 4 Note Type:</label>
                            <select className="dropdowns" name="instrument4-note" id="instrument4-notes" onChange={(e => {setDuration03(Number(e.target.value))})}>
                               <NoteSettings />
                            </select>
                        </div>
                        {/* This conditional here will render the advanced settings to have more electrode options */}
                        {(device === 'cyton') && 
                            <>
                            <div className='col instrument-box'>
                            <label htmlFor="instrument5">Instrument 5:</label>
                            <select className="dropdowns" name="instrument5" id="instrument5-options" onChange={(e => {setInstrument04(Number(e.target.value))})}>
                                <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument5-note">Instrument 5 Note Type:</label>
                            <select className="dropdowns" name="instrument5-note" id="instrument5-notes" onChange={(e => {setDuration04(Number(e.target.value))})}>
                               <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument6">Instrument 6:</label>
                            <select className="dropdowns" name="instrument6" id="instrument6-options" onChange={(e => {setInstrument05(Number(e.target.value))})}>
                                <InstrumentSettings />
                            </select>
                            <br></br>
                            <label htmlFor="instrument6-note">Instrument 6 Note Type:</label>
                            <select className="dropdowns" name="instrument6-note" id="instrument6-notes" onChange={(e => {setDuration05(Number(e.target.value))})}>
                               <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument7">Instrument 7:</label>
                            <select className="dropdowns" name="instrument7" id="instrument7-options" onChange={(e => {setInstrument06(Number(e.target.value))})}>
                                <InstrumentSettings />
          
                            </select>
                            <br></br>
                            <label htmlFor="instrument7-note">Instrument 7 Note Type:</label>
                            <select className="dropdowns" name="instrument7-note" id="instrument7-notes" onChange={(e => {setDuration06(Number(e.target.value))})}>
                               <NoteSettings />
                            </select>
                        </div>
                        <div className='col instrument-box'>
                            <label htmlFor="instrument8">Instrument 8:</label>
                            <select className="dropdowns" name="instrument8" id="instrument8-options" onChange={(e => {setInstrument07(Number(e.target.value))})}>
                            <option value={-Infinity}>NULL</option>
                            <InstrumentSettings />

                            </select>
                            <br></br>
                            <label htmlFor="instrumeny8-note">Instrument 8 Note Type:</label>
                            <select className="dropdowns" name="instrument8-note" id="instrument8-notes" onChange={(e => {setDuration07(Number(e.target.value))})}>
                               <NoteSettings />
                            </select>
                        </div>
                        </>
                        }
                        
                    </div>
                </form>
                <br></br>
                <form className='justify-content-center adv-settings-container'>
                    <h2 id='settings-text'>Other</h2>
                    <div className='row instruments-div'>
                        <div className='col instrument-box-other'>
                            <label htmlFor="octave">Number of Octaves:</label>
                            <select className="dropdowns2" name="octave" id="octave-option" onChange={(e) => setOctaves(Number(e.target.value))}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className='col instrument-box-other'>
                            <label htmlFor="tempo">Set Bpm:</label>
                            <select className="dropdowns2" name="tempo" id="tempo-option" onChange={(e) => setBpm(Number(e.target.value))}>
                                <option value="100">100</option>
                                <option value="120">120</option>
                                <option value="140">140</option>
                                <option value="160">160</option>

                            </select>
                        </div>
                        <div className='col instrument-box-other'>
                            <label htmlFor="key-signature">Key Signature:</label>
                            <select className="dropdowns2" name="key-signature" id="key-signature-option" onChange={(e) => setKey(e.target.value)}>
                                <option value="Major">Major</option>
                                <option value="Minor">Minor</option>
                            </select>
                        </div>
                        <div className='col instrument-box-other'>
                            <label htmlFor="scale">Scale:</label>
                            <select className="dropdowns2" name="scale" id="scale-option">
                                <option value="scale-example">  </option>
                                <option value="scale-example1">scale example</option>
                            </select>
                        </div>
                    </div>
                </form>
                <br></br>
                <div className='form-group row justify-content-center'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" id='back-btn-adv' onClick={toggle}>Back</button>
                        <br />
                        <button type="button" className="btn btn-primary" id='next-btn' onClick={() => applySettingsEvent()}>Next</button>
                    </div>
                </div>
             </div>
        </div>
        
        );
}

export default TrackSettings;