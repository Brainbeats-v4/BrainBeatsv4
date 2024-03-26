import react, { memo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { InstrumentTypes, KeyGroups, NoteDurations, Keys } from '../../util/Enums';
import { KEY_SIGNATURES } from '../../util/Constants';
import { MusicSettings, Track } from '../../util/Interfaces';
import * as rand from '../../util/MusicGeneration/MusicHelperFunctions'

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks';
import isDev from '../../util/isDev';

// Redux state to hold settings for specificed board
import { set as setSettingsState } from '../../Redux/slices/musicGenerationSettingsSlice';
import { set as setDeviceState } from '../../Redux/slices/deviceSlice';


import './TrackSettings.css';
import { env } from 'process';
import sendAPI from '../../SendAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userModeState, userJWT } from '../../JWT';



/* uploadPost will be moved from here into the record, the logic is useful for now though */

/*  This function just maps the enum InstrumentTypes into an options list to be displayed on the settings to keep the
    code cleaner, it starts at -3 since it is the initial value described in the Enum, adding the NULL value at the end */
const InstrumentSettings = memo(() => {
    var instrumentArray:any[] = [];
    for(var i = 0; i < Object.values(InstrumentTypes).length / 2 - 1; i++) {

        let instrument = { value: i, name: InstrumentTypes[i] }
        
        // This sets only Sine and Piano for debug purposes
        // if(i == 0 || i == 11) 
        instrumentArray.push(instrument);
    }
    return( 
        <>
            {instrumentArray.map((instrument) =>
                <option key={instrument.name} value={instrument.value}>{instrument.name}</option>)
            }
        </>
    )    
})

const KeySetting = memo(() => {
    var keysArray:any[] = [];
    for(var i = 0; i < 12; i++) {
        let key = { value: Keys[i], name: Keys[i] }
        keysArray.push(key);
    }
    return( 
        <>
            {keysArray.map((key) =>
                <option key={key.name} value={key.value}>{key.name}</option>)
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
    return( 
        <>
            {noteArray.map((noteDuration) =>
                <option key={noteDuration.name} value={noteDuration.value}>{noteDuration.name}</option>)
            }
        </>
    )    
});

const TrackSettings = () => {

    const settings = useAppSelector(state => state.musicGenerationSettingsSlice)
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
    const [instrument00, setInstrument00] = useState(InstrumentTypes.SINEWAVE)
    const [instrument01, setInstrument01] = useState(InstrumentTypes.SINEWAVE)
    const [instrument02, setInstrument02] = useState(InstrumentTypes.SINEWAVE)
    const [instrument03, setInstrument03] = useState(InstrumentTypes.SINEWAVE)
    const [instrument04, setInstrument04] = useState(InstrumentTypes.SINEWAVE)
    const [instrument05, setInstrument05] = useState(InstrumentTypes.SINEWAVE)
    const [instrument06, setInstrument06] = useState(InstrumentTypes.SINEWAVE)
    const [instrument07, setInstrument07] = useState(InstrumentTypes.SINEWAVE)
    /* These define the duration of each note. */
    const [duration00, setDuration00] = useState(NoteDurations.QUARTER)
    const [duration01, setDuration01] = useState(NoteDurations.QUARTER)
    const [duration02, setDuration02] = useState(NoteDurations.QUARTER)
    const [duration03, setDuration03] = useState(NoteDurations.QUARTER)
    const [duration04, setDuration04] = useState(NoteDurations.QUARTER)
    const [duration05, setDuration05] = useState(NoteDurations.QUARTER)
    const [duration06, setDuration06] = useState(NoteDurations.QUARTER)
    const [duration07, setDuration07] = useState(NoteDurations.QUARTER)

    const [, updateState] = useState<any>();
    const forceUpdate = useCallback(() => updateState({}), [])


    const [bpm, setBpm] = useState(120);
    const [octaves, setOctaves] = useState(1);
    const [keyGroup, setKeyGroup] = useState("Major");
    const [scale, setScale] = useState("C");
    var numNotes;

    var getRandomMusicSettings = () => {

        console.log("Randomized!");
    
        setOctaves(rand.getRandomOctaves());
        setBpm(rand.getRandomBPM());
        setKeyGroup(rand.getRandomKeyGroup());
        setScale(rand.getRandomScale());
        numNotes = octaves * 7;
        
        setInstrument00(rand.getRandomInstrument());
        setInstrument01(rand.getRandomInstrument());
        setInstrument02(rand.getRandomInstrument());
        setInstrument03(rand.getRandomInstrument());
        setInstrument04(rand.getRandomInstrument());
        setInstrument05(rand.getRandomInstrument());
        setInstrument06(rand.getRandomInstrument());
        setInstrument07(rand.getRandomInstrument());

        setDuration00(rand.getRandomDuration());
        setDuration01(rand.getRandomDuration());
        setDuration02(rand.getRandomDuration());
        setDuration03(rand.getRandomDuration());
        setDuration04(rand.getRandomDuration());
        setDuration05(rand.getRandomDuration());
        setDuration06(rand.getRandomDuration());
        setDuration07(rand.getRandomDuration());
    }

    function applySettingsEvent() {       
        var numNotes = octaves * 7;

        // console.log(numNotes);
        
        
        var generationSettings:MusicSettings;
        var deviceSettings;

        if(device === 'cyton' || device === "random data") {
            deviceSettings = {
                instruments: {
                    _00: instrument00, 
                    _01: instrument01, 
                    _02: instrument02, 
                    _03: instrument03, 
                    _04: instrument04,
                    _05: instrument05,
                    _06: instrument06,
                    _07: instrument07,
                },
                // Used to store the duration of each note a given node should be used to output
                durations: {
                    _00: duration00, 
                    _01: duration01, 
                    _02: duration02, 
                    _03: duration03, 
                    _04: duration04,
                    _05: duration05,
                    _06: duration06,
                    _07: duration07,
                }
            };
        } else {
            deviceSettings = {
                instruments: {
                    _00: instrument00, // FP1 Node
                    _01: instrument01, // FP2 Node
                    _02: instrument02, // C3 Node
                    _03: instrument03, // C4 Node
                },
                // Used to store the duration of each note a given node should be used to output
                durations: {
                    _00: duration00, // FP1 Node
                    _01: duration01, // FP2 Node
                    _02: duration02, // C3 Node
                    _03: duration03, // C4 Node
                }
            };
        }

        generationSettings = {
            // Used to store the instrument each node should be used to output
            deviceSettings,
            numNotes,
            octaves,
            bpm,
            keyGroup,
            scale
        }

        // Apply settings to redux
        dispatch(setSettingsState(generationSettings));
        dispatch(setDeviceState(device));
        navigate("/script-settings");
    }

    // useEffect(() => {
    //     setDeviceState(device)
    //     console.log(device);
    // }, [device]);


    const [postTitle, setPostTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [likes, setLikes] = useState(0);
    const [user, setUser] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);

  
    // Shortcut for uploading posts
    function uploadPost() {

        if (!user) {
            console.error("You must be logged in to create a post");
            navigate('/login');
            return;
        }

        const info:Track = {
            id: "",
            userID: user.id,
            title: postTitle,
            bpm: 120,
            key: "major",
            scale: "A",
            midi: "",
            instruments: {},
            noteTypes: {},
            token: jwt,
            thumbnail: thumbnail,
            public: true,
            likeCount: likes
        }
        sendAPI('post', '/tracks/createTrack', info)
            .then(res => {
                // console.log(res);
            }).catch(err => {
                console.error(err);
            })
        
    }

    return (
        <div className='container' id='main-container'>
            {/* Displays on Basic Settings */}
            <h1 className='heading'></h1>
            <div id='track-settings-container'>
                <div id="settings1" style={{display: advSettingsOpen? "none" : "block"}}>
                    <form className='justify-content-center' id='settings-container1'>
                        <h2 className='settings-text'>Basic Track</h2>
                       
                        <div id='select-device-div'> 
                            <h6 className='centered-text' id='centered-text'>Please select your input device:</h6>                
                            <select className="dropdowns" id='board-dropdown' name="board-options" onChange={(e) => setDevice(e.target.value)}>
                                <option value="cyton">Cyton Board</option>
                                <option value="ganglion">Ganglion Board</option>
                                {isDev() && <option value="random data">(Dev) Random Data</option>}
                            </select>
                        </div>
                        <br></br>
                        <div id='checkbox-div'>
                        <p className='settings-text2'>Please select one of the following music generation options:</p>                    
                            <div id="settings-options-div">
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
                                <button type="button" className="btn btn-primary" id='next-btn' onClick={() => applySettingsEvent()}>Create Track</button>
                            </div>
                        </div>
                    </form>

                    <br />
                   
                    <br />

                    <form className='justify-content-center' id='settings-container2'>
                        <h2 className='settings-text'>Advanced Track</h2>
                        <p className='centered-text'>Press the button below to go to advanced music generation settings:</p>

                        <div className='form-group row justify-content-center'>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary" id='adv-btn' onClick={toggle}>Create Track</button>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Displays on Advanced Settings */}
                <div id="settings2" style={{display: advSettingsOpen? "block" : "none"}}>
                    <h1 className='heading'>Advanced Music Settings</h1>
                    <form className='justify-content-center adv-settings-container'>
                        <h2 className='settings-text'>Instruments</h2>
                        <button type="button" className="btn btn-secondary" id='random-btn-adv' onClick={getRandomMusicSettings}>Randomize!</button>
                        <div className='row instruments-div'>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument1">Instrument 1:</label>
                                <select className="dropdowns" name="instrument1" id="instrument1-options" value={instrument00} defaultValue={instrument00} onChange={(e => {setInstrument00(Number(e.target.value))})}>         
                                <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument1-note">Instrument 1 Note Type:</label>
                                <select className="dropdowns" name="instrument1-note" id="instrument1-notes" value={duration00} defaultValue={duration00} onChange={(e => {setDuration00(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument2">Instrument 2:</label>
                                <select className="dropdowns" name="instrument2" id="instrument2-options" value={instrument01} defaultValue={instrument01} onChange={(e => {setInstrument01(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument2-note">Instrument 2 Note Type:</label>
                                <select className="dropdowns" name="instrument2-note" id="instrument2-notes" value={duration01} defaultValue={duration01} onChange={(e => {setDuration01(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument3">Instrument 3:</label>
                                <select className="dropdowns" name="instrument3" id="instrument3-options" value={instrument02} defaultValue={instrument02} onChange={(e => {setInstrument02(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument3-note">Instrument 3 Note Type:</label>
                                <select className="dropdowns" name="instrument3-note" id="instrument3-notes" value={duration02} defaultValue={duration02} onChange={(e => {setDuration02(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument4">Instrument 4:</label>
                                <select className="dropdowns" name="instrument4" id="instrument4-options" value={instrument03} defaultValue={instrument03} onChange={(e => {setInstrument03(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument4-note">Instrument 4 Note Type:</label>
                                <select className="dropdowns" name="instrument4-note" id="instrument4-notes" value={duration03} defaultValue={duration03} onChange={(e => {setDuration03(Number(e.target.value))})}>
                                <NoteSettings />
                                </select>
                            </div>
                            {/* This conditional here will render the advanced settings to have more electrode options */}
                            {(device === 'cyton' || device == 'random data') && 
                                <>
                                <div className='col instrument-box'>
                                <label htmlFor="instrument5">Instrument 5:</label>
                                <select className="dropdowns" name="instrument5" id="instrument5-options" value={instrument04} defaultValue={instrument04} onChange={(e => {setInstrument04(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument5-note">Instrument 5 Note Type:</label>
                                <select className="dropdowns" name="instrument5-note" id="instrument5-notes" value={duration04} defaultValue={duration04} onChange={(e => {setDuration04(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument6">Instrument 6:</label>
                                <select className="dropdowns" name="instrument6" id="instrument6-options" value={instrument05} defaultValue={instrument05} onChange={(e => {setInstrument05(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrument6-note">Instrument 6 Note Type:</label>
                                
                                <select className="dropdowns" name="instrument6-note" id="instrument6-notes" value={duration05} defaultValue={duration05} onChange={(e => {setDuration05(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument7">Instrument 7:</label>
                                
                                <select className="dropdowns" name="instrument7" id="instrument7-options" value={instrument06} defaultValue={instrument06} onChange={(e => {setInstrument06(Number(e.target.value))})}>
                                    <InstrumentSettings />            
                                </select>

                                <br></br>
                                <label htmlFor="instrument7-note">Instrument 7 Note Type:</label>
                                
                                <select className="dropdowns" name="instrument7-note" id="instrument7-notes" value={duration06} defaultValue={duration06} onChange={(e => {setDuration06(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            <div className='col instrument-box'>
                                <label htmlFor="instrument8">Instrument 8:</label>
                                <select className="dropdowns" name="instrument8" id="instrument8-options" value={instrument07} defaultValue={instrument07} onChange={(e => {setInstrument07(Number(e.target.value))})}>
                                    <InstrumentSettings />
                                </select>
                                <br></br>
                                <label htmlFor="instrumeny8-note">Instrument 8 Note Type:</label>
                                <select className="dropdowns" name="instrument8-note" id="instrument8-notes" value={duration07} defaultValue={duration07} onChange={(e => {setDuration07(Number(e.target.value))})}>
                                    <NoteSettings />
                                </select>
                            </div>
                            </>
                            }
                            
                        </div>
                    </form>
                    <br></br>
                    <form className='justify-content-center adv-settings-container'>
                        <h2 className='settings-text'>Other</h2>
                        <div className='row instruments-other-div'>
                            <div className='col instrument-box-other'>
                                <label htmlFor="octave">Number of Octaves:</label>
                                <select className="dropdowns2" name="octave" id="octave-option" value={octaves} defaultValue={octaves} onChange={(e) => {setOctaves(Number(e.target.value))}}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className='col instrument-box-other'>
                                <label htmlFor="tempo">Set Bpm:</label>
                                <select className="dropdowns2" name="tempo" id="tempo-option" value={bpm} defaultValue={bpm} onChange={(e) => setBpm(Number(e.target.value))}>
                                    <option value="100">100</option>
                                    <option value="120">120</option>
                                    <option value="140">140</option>
                                    <option value="160">160</option>

                                </select>
                            </div>
                            <div className='col instrument-box-other'>
                                <label htmlFor="key-signature">Key Signature:</label>
                                <select className="dropdowns2" name="key-signature" id="key-signature-option" value={keyGroup} defaultValue={keyGroup} onChange={(e) => setKeyGroup(e.target.value)}>
                                    <option value={"Major"}>Major</option>
                                    <option value={"Minor"}>Minor</option>
                                </select>
                            </div>
                            <div className='col instrument-box-other'>
                                <label htmlFor="scale">Scale:</label>
                                <select className="dropdowns2" name="scale" id="scale-option" value={scale} defaultValue={scale} onChange={(e) => setScale(e.target.value)}>
                                    <KeySetting />
                                </select>
                            </div>
                        </div>
                    </form>
                    <br></br>
                    <div className='form-group row justify-content-center'>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-secondary" id='next-btn' onClick={toggle}>Back</button>
                            <br />
                            <button type="button" className="btn btn-primary" id='next-btn' onClick={() => applySettingsEvent()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shortcut for uloading posts in dev */}
           {isDev() && <div>
                <div>
                    <label className="form-label signup-text">Title</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Title" onChange={event => setPostTitle(event.target.value)}/>
                </div>
                <div>
                    <label className="form-label signup-text">Thumbnail</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Title" onChange={event => setThumbnail(event.target.value)}/>
                </div>
                <div>
                    <label className="form-label signup-text">Likes</label>
                    <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Title" onChange={event => setLikes(event.target.valueAsNumber)}/>
                </div>
                <button onClick={() => uploadPost()}>Click me</button>
            </div>}
        </div>
    
        );
}

export default TrackSettings;