import React, { useContext, useState, useEffect, useCallback} from 'react';
import { Carousel } from "react-responsive-carousel";
import { SketchPicker } from 'react-color'
import './record.css'
import { FaAngleRight, FaAngleLeft, FaQuestion } from "react-icons/fa";
import {Accordion, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Img from '../Navbar/Logo.jpg'

import { useNavigate } from 'react-router-dom';

// **** If more devices are needed, here are the node modules to begin their acquisition. **** \\
// import muse from "https://cdn.jsdelivr.net/npm/@brainsatplay/muse@0.0.1/dist/index.esm.js"; // Muse board retrieval
// import hegduino from "https://cdn.jsdelivr.net/npm/@brainsatplay/hegduino@0.0.3/dist/index.esm.js"; // Hegduino 8 channel board retrieval
import * as components from "https://cdn.jsdelivr.net/npm/brainsatplay-ui@0.0.7/dist/index.esm.js"; // UI
import * as datastreams from "https://cdn.jsdelivr.net/npm/datastreams-api@latest/dist/index.esm.js"; // Data acquisition
import ganglion from "https://cdn.jsdelivr.net/npm/@brainsatplay/ganglion@0.0.2/dist/index.esm.js"; // This is the device aquisition for BrainBeats AKA the ganglion device.
import * as XLSX from 'xlsx';
import MidiPlayer from 'midi-player-js';
import _, {cloneDeep, first} from 'lodash'
import { useRecoilValue } from "recoil";
import {userJWT, userModeState} from '../context/GlobalState'
import sendAPI from '../sendAPI';

import {getNoteLengthStringFromInt, getInstrumentNameFromInt, getIntFromNoteTypeString, getIntFromNoteTypeStringWithMidiWriterJsValues,
	getNoteLengthMultiplier, getMilliecondsFromBPM, GetFloorOctave, findNumSamples, getFrequencyFromNoteOctaveString} from './HelperFunctions.js';
import * as Constants from '../Constants.js';



import {playMidiNote, playMidiFile} from './Playback.js';
import {initMIDIWriter, addNoteToMIDITrack, printTrack, generateMIDIURIAndDownloadFile, generateMIDIURI, generateMIDIFileFromURI} from './MIDIWriting.js';



// This variable is for devs. Yes, you reading this! Set this to true if you want console output that shows what's happening musically in
// real-time, and set to false if not. I don't *think* this has any effect on the live server, only when running on your local machine.
var showMusicRelatedConsoleOutput = true;
function Record() {
    //needed states
    const user = useRecoilValue(userModeState);
	const jwt = useRecoilValue(userJWT);
	const navigate = useNavigate();

	const [stage, setStage] = useState(0);

	//Music Generation States
	const [numNotes, setNumNotes] = useState(21);
	const [FP1, setFP1Inst] = useState(4);
	const [FP2, setFP2Inst] = useState(2);
	const [C3, setC3Inst] = useState(3);
	const [C4, setC4Inst] = useState(0);
	const [FP1Note, setFP1Note] = useState(2);
	const [FP2Note, setFP2Note] = useState(2);
	const [C3Note, setC3Note] = useState(1);
	const [C4Note, setC4Note] = useState(1);
	const [keyNum, setKey] = useState(0);
	const [scale, setScale] = useState(0);
	const [BPMArray, setBPMArray] = useState([]);
	const [BPM, setBPM] = useState(120);
	const [MIDIFile, setMIDIFile] = useState("");
	const [currentSlide, setCurrentSlide] = useState(0);
	const [autoplay, setAutoplay] = useState(true);

	//Setting Up Script
	//Text Cards
	const initialBackground = {
		displayColorPicker: false,
		color: {
		  r: '242',
		  g: '242',
		  b: '242',
		  a: '1',
		},
	}
	const initialTextColor = {
		displayColorPicker: false,
		color: {
		  r: '0',
		  g: '0',
		  b: '0',
		  a: '1',
		},
	}
	const [cards, setCards] = useState([])
	const [cardText, setCardTextState] = useState('');
	const [speed, setSpeed] = useState(1)
	const [backgroundColor, setBackgroundColor] =useState(initialBackground);
	const [textColor, setTextColor] =useState(initialTextColor);
	const [thumbnail, setThumbnail] = useState(user.thumbnail);
	const [errorMsg, setErrorMsg] = useState('');
	
	//Youtube Link
	const [youtubeLink, setYoutubeLink] = useState('')
	//Posting States
	const [title, setTitle] = useState('');
	const [msg, setMsg] = useState('');

	

	const [finishRec, setFinishRec] = useState();
	
	//passing these to Music Generation
	const instrumentList = [parseInt(FP1), parseInt(FP2), parseInt(C3), parseInt(C4)];
	const noteDuration = [parseInt(FP1Note), parseInt(FP2Note), parseInt(C3Note), parseInt(C4Note)];

	// API call to BE to get updated user info to input fields
	useEffect(() => {
		sendAPI('get', `/users/getUserPostsByID?id=${user.id}`, null)
			.then(function (res) {
				setThumbnail(res.data.thumbnail);
				console.log(user)
			})
			.catch(function (err) {
				setErrorMsg(err.response.data.msg);
			})
	}, [])

	const updateProfilePic = (file) => {
        var file = document.querySelector('input[type=file]')['files'][0];
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            setThumbnail(baseString); 
        };
        reader.readAsDataURL(file);
    }

	const path = require('../Path')
	const KEY=
	[
		"C", "C#", "D","D#", "E", "F","F#", "G", "G#", "A","A#","B"
	];
	const SCALE =
	[
		'Major', 'Minor'
	]

	//get BPM from database
	useEffect(()=>{

		
		sendAPI('get', '/music/getBPMValues')
			.then((res) =>{
				setBPMArray(res.data);
				console.log(BPMArray);
			})
			.catch((err) =>{
				console.log(err);
			})
	},[])

	const goNext = () => {
		setStage(stage + 1)
	}
	const goBack = () => {
		setStage(stage - 1)
	}
	const addCard = () => {
		if(cardText === ''){
			alert("Invalid Card format")
			return
		}
		let newCard ={
			textColor: textColor.color,
			backGroundColor: backgroundColor.color,
			speed: speed * 1000,
			text: cardText,
		}
		//set input back to default
		setBackgroundColor(initialBackground);
		setTextColor(initialTextColor);
		setCardTextState('');
		setSpeed(1);
		setCards([...cards, newCard])
	}
	const noScript = () => {
		setStage(4);
	}

	const postFile = () => {
		const bodyData = {
		"userID": user.id,
		"title": title,
		"bpm": BPM,
		"instruments" : instrumentList,
		"noteTypes" : noteDuration,
		"midi": MIDIFile,
		"key": KEY[scale],
		"thumbnail": thumbnail,
		'token': jwt,
	}
		sendAPI('post', '/posts/createPost', bodyData)
			.then((res) =>{
				setMsg('Song posted')
			})
	}
	
	  //Background Color Picker Function
	  const openBackgroundColor = () => {
		setBackgroundColor({ displayColorPicker: !backgroundColor.displayColorPicker, color: backgroundColor.color });
	  };
	  const closeBackgroundColor = () => {
		setBackgroundColor({ displayColorPicker: false, color: backgroundColor.color });
	  };
	  const setColorBackground = (color) => {
		setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
	  };

	  //Text Color Picker Function
	  const openTextColor = () => {
		setTextColor({ displayColorPicker: !textColor.displayColorPicker, color: textColor.color });
	  };
	  const closeTextColor = () => {
		setTextColor({ displayColorPicker: false, color: textColor.color });
	  };
	  const setColorText = (color) => {
		console.log(color)
		setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
	  };

	  //Default Selections for music generation
	  function setToSlow(){
		setFP1Inst(-3);
		setFP2Inst(0);
		setC3Inst(4);
		setC4Inst(7);
		setFP1Note(2);
		setFP2Note(1);
		setC3Note(1);
		setC4Note(0);
		setBPM(100);
	  }
	  function setToMed(){
		setFP1Inst(-3);
		setFP2Inst(2);
		setC3Inst(5);
		setC4Inst(6);
		setFP1Note(2);
		setFP2Note(2);
		setC3Note(1);
		setC4Note(1);
		setBPM(120);
	  }
	  function setToQuick(){
		setFP1Inst(4);
		setFP2Inst(2);
		setC3Inst(3);
		setC4Inst(0);
		setFP1Note(3);
		setFP2Note(3);
		setC3Note(2);
		setC4Note(2);
		setBPM(140);
	  }
	  function setToFast(){
		setFP1Inst(-3);
		setFP2Inst(0);
		setC3Inst(4);
		setC4Inst(3);
		setFP1Note(4);
		setFP2Note(4);
		setC3Note(3);
		setC4Note(3);
		setBPM(160);
	  }
	  const handel = () => {
		  console.log('_____________________________________________')
		  console.log(FP1)
		  console.log(FP2)
		  console.log(C3)
		  console.log(C4)
		  console.log(FP1Note)
		  console.log(FP2Note)
		  console.log(C3Note)
		  console.log(C4Note)
	  }
	  const renderBasicTips = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Choose your desired tempo
		</Tooltip>
	  );
	  const renderAdvanceTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Customize your own experience
		</Tooltip>
	  );
	  const renderScriptTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Influence your brainwave via youtube link, creating your own cards or just skip this step
		</Tooltip>
	  );
	  const renderRecordTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
		  Click start to start recording, and stop to stop
		</Tooltip>
	  );
	  const renderPublishTip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			You can now publish your song to the world
		</Tooltip>
	  );

	  

	return <>
	<div className="scriptBox">
		{stage == 0 && (
			<>
			  <div>
				<div className="row">
				  <p className="textHeader">Music Settings</p>
				</div>
				<Accordion defaultActiveKey="0">
				  <Accordion.Item eventKey="0">
					<Accordion.Header>Basic Settings
							
					</Accordion.Header>
					<Accordion.Body>
						<div>
						<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderBasicTips}>
							<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
						</OverlayTrigger>
						</div>
						<div>
        					<input type="radio"  onChange={setToSlow} className='defaultRadio' name='tempo' value='slow' /> <label>Slow and Melodic</label>
        					<input type="radio" onChange={setToMed} className='defaultRadio' name='tempo' value='normal' /><label>Moderate and Timely</label> 
        					<input type="radio" onChange={setToQuick} className='defaultRadio' name='tempo' value='normal' checked/><label>Quick and Lively</label> 
							<input type="radio" onChange={setToFast} className='defaultRadio' name='tempo' value='fast'/> <label>Fast and Frenzy</label>
      					</div>
					</Accordion.Body>
				  </Accordion.Item>
				  <Accordion.Item eventKey="1">
					<Accordion.Header>Advanced Settings</Accordion.Header>
					<Accordion.Body>
						<div>
						<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderAdvanceTip}>
							<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
						</OverlayTrigger>
						</div>
					  <div className="row">
						<div className="col">
						  <div>FP1 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP1Inst(e.target.value)} value={FP1}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
						  </select>
						  <div>FP2 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP2Inst(e.target.value)} value={FP2}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
						  </select>
						  <div>C3 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC3Inst(e.target.value)} value={C3}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
						  </select>
						  <div>C4 Instrument</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC4Inst(e.target.value)} value={C4}>
							<option value={-3}>SineWave</option>
							<option value={-2}>TriangleWave</option>
							<option value={-1}>SquareWave</option>
							<option value={0}>Flute</option>
							<option value={1}>Oboe</option>
							<option value={2}>Clarinet</option>
							<option value={3}>Bassoon</option>
							<option value={4}>Trumpet</option>
							<option value={5}>FrenchHorn</option>
							<option value={6}>Trombone</option>
							<option value={7}>Tuba</option>
						  </select>
						</div>
						<div className="col">
						  <div>FP1 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP1Note(e.target.value)} value={FP1Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>FP2 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setFP2Note(e.target.value)} value={FP2Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>C3 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC3Note(e.target.value)} value={C3Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						  <div>C4 Note Type</div>
						  <select className='advanceInputBoxes' onChange={(e) => setC4Note(e.target.value)} value={C4Note}>
							<option value={0}>Whole</option>
							<option value={1}>Half</option>
							<option value={2}>Quarter</option>
							<option value={3}>Eighth</option>
							<option value={4}>Sixteenth</option>
						  </select>
						</div>
						<div className="col">
						  <div>Number of Octaves</div>
						  <select className='advanceInputBoxes' onChange={(e) => setNumNotes(e.target.value * 7)} value={numNotes/7}>
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
						  </select>
						  <div>Tempo</div>
						  <select className='advanceInputBoxes' onChange={(e) => setBPM(BPMArray[e.target.value])} value={BPM}>
							{BPMArray.map((item, index) => {
							  return <option value={item} key={index}>{item}</option>;
							})}
						  </select>
						  <div>Key Signature</div>
	  
						  <select
							onChange={(e) => setKey(e.target.value)}
							value={keyNum}
							className='advanceInputBoxes'
						  >
							<option value={0}>C</option>
							<option value={1}>C#/Db</option>
							<option value={2}>D</option>
							<option value={3}>D#/Eb</option>
							<option value={4}>E</option>
							<option value={5}>F</option>
							<option value={6}>F#/Gb</option>
							<option value={7}>G</option>
							<option value={8}>G#/Ab</option>
							<option value={9}>A</option>
							<option value={10}>A#/Bb</option>
							<option value={11}>B</option>
						  </select>
						  <div>Scale</div>
						  <select
							onChange={(e) => setScale(e.target.value)}
							value={scale}
							className='advanceInputBoxes' 
						  >
							<option value={0}>Major</option>
							<option value={1}>Minor</option>
						  </select>
						</div>
					  </div>
					</Accordion.Body>
				  </Accordion.Item>
				</Accordion>
			  </div>
			  	<button className="arrowButtonMain" onClick={goNext}>
			  		Next {<FaAngleRight />}
				</button>
			
		  </>
		)}
        {stage == 1 && (
        <div>
			<div>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderScriptTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<br />
			<div>
			<p className="textHeader">Script</p>
			</div>
			</div>
          
          <div>
            <input
              className="InputForYoutube"
              placeholder="YouTube Link"
              onChange={(e) => setYoutubeLink(e.target.value)}
            />
            <p className="line">
              <span className="wordInLine">OR</span>
            </p>
            <br />
            <input
              className="inputForCard"
              placeholder="YOUR TEXT HERE"
              onChange={(e) => setCardTextState(e.target.value)}
              style={{
                color: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
              }}
              value={cardText}
            />
          </div>
		  <br></br>
          <div className="row">
            <div className="col-sm-2">
			<p>Text Color</p>
              <div>
                <div
                  style={{
                    padding: "2px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={openTextColor}
                >
					
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "2px",
                      background: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                    }}
                  />
                </div>
                {textColor.displayColorPicker ? (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "2",
                      bottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        position: "fixed",
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        left: "0px",
                      }}
                      onClick={closeTextColor}
                    />
                    <SketchPicker
                      color={textColor.color}
                      onChange={setColorText}
                    />
                  </div>
                ) : null}
				<br />
				
              </div>
            </div>
            <div className="col-sm-2">
              <div>
			  <p style={{position: 'relative', left: '0px'}}>Background Color</p>
              
                <div
                  style={{
                    padding: "2px",
                    background: "#fff",
                    borderRadius: "1px",
                    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={openBackgroundColor}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "2px",
                      background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                    }}
                  />
                </div>
                {backgroundColor.displayColorPicker ? (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "2",
                      bottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        position: "fixed",
                        top: "0px",
                        right: "0px",
                        bottom: "0px",
                        left: "0px",
                      }}
                      onClick={closeBackgroundColor}
                    />
                    <SketchPicker
                      color={backgroundColor.color}
                      onChange={setColorBackground}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="col">
				<p>Card Duration</p>
              <input
                type="number"
                placeholder="Seconds"
                className="timeInput"
                onChange={(e) => setSpeed(e.target.value)}
                value={speed}
              />
            </div>

            <div className="col">
              <Button
                style={{ width: "100px", float: "center", marginTop: '20px'}}
                onClick={addCard}
              >
                Add
              </Button>
            </div>
          </div>
          <button className="arrowButtonMain" onClick={goBack}>
            {<FaAngleLeft />} Script{" "}
          </button>
          <button className="arrowButtonMain" onClick={goNext} disabled={(cards.length === 0) ^ (youtubeLink !== '')}>
            Record {<FaAngleRight />}
          </button>
          <p className="line">
            <span className="wordInLine">OR</span>
          </p>
		  <br />
          <Button
            style={{ width: "100px", marginTop: "10px" }}
            onClick={noScript}
          >
            SKIP
          </Button>
        </div>
      )}
		{//User does not want to script
		stage == 4 && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<h2>Record</h2>
			<img src={Img} className="scriptless"/>
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
			<button className='arrowButtonMain' onClick={() => {setStage(1)}}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={() => {setStage(3)}}>Publish {<FaAngleRight />}</button>
			</>
		)}
		{//This displays cards
		stage == 2 && youtubeLink === '' && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
					<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<div><h2>Record</h2></div>
			<div className='alignSlide'>
				
				<ValidScript slides={cards} setCurrentSlide={setCurrentSlide} autoplay={autoplay} currentSlide={currentSlide}/>
			</div>
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
			
			</>
		)}
		{//This shows youtube
		stage == 2 && cards.length === 0 && (
			<>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderRecordTip}>
				<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<h2>Record</h2>
			<VidLink link={youtubeLink} />
			<Setting numNotes={numNotes} instrumentArr={instrumentList} noteDuration={noteDuration} scale={scale} keyNum={keyNum} BPM={BPM} setMIDIFile={setMIDIFile}/>
			<button className='arrowButtonMain' onClick={goBack}>{<FaAngleLeft />} Script </button>
			<button className='arrowButtonMain' onClick={goNext}>Publish {<FaAngleRight />}</button>
			
			</>
		)}
		{stage == 3 && (
			<>
			<div>
			<div>
				<OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderPublishTip}>
				<button style={{display: 'flex', border: 'none', background: 'none', justifyContent: 'left'}}><FaQuestion /></button>
				</OverlayTrigger>
			</div>
			<div>
				<h2>Publish</h2>
			</div>
			<div>
				<img src={thumbnail} style = {{height: "400px", width: "400px"}} />
				
			</div>
			<div> 
				<label for="file-upload" className="custom-file-upload">
    				Upload Image (optional)
				</label>
				<input id="file-upload" onChange={(event) => updateProfilePic(event.target.files[0])} type="file"/>
			</div>
			<div> <input type="text" className='titleInput' onChange={(e) => setTitle(e.target.value)}/></div>
			</div>
			<p>Post Title</p>
			<button onClick={generateMIDIURIAndDownloadFile} className="downloadMidiButton">Download</button>
			<button className='publishButton' onClick={postFile}>Publish</button>
			
			<br />
			<p>{msg}</p>
			<button className='arrowButtonMain' onClick={() => setStage(0)}>{<FaAngleLeft />} Record </button>
			
			</>
		)}
		</div>
	</>
		
}

function VidLink({link}) {
    //two type of YT URLS
    //https://www.youtube.com/watch?v=DSBBEDAGOTc
    //https://www.youtube.com/watch?v=ScMzIvxBSi4&ab_channel=BenMarquezTX
	let id;
	if(link.includes('youtube')){
		//get everything after the =
		let tempID = link.split('=');
		tempID = tempID[1];
		//this discards discards everything after the & sign giving the correct URL if the URL
		//in the second form
		tempID = tempID.split('&');
		//offical youtube ID
		id = tempID[0];
	}else{
		id = 'wvttb2_AZag'
	}
	
    return (
        <>
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="Embedded youtube"
                className='YtVideo'
            />

        </>
    )
}

function ValidScript({slides, setCurrentSlide, currentSlide, autoplay}) {
	const changeCarosel = useCallback((slide) => {
		setCurrentSlide(slide)
	},[])
	console.log(autoplay)
    return (
        <>
            <Carousel className='scriptDisplayCard' autoPlay width={700} showThumbs={false} showIndicators={false}
                infiniteLoop={true} dynamicHeight={true} interval={slides[currentSlide].speed} onChange={changeCarosel}>
                {slides.map(
                    (slide,index) =>
                        {console.log(currentSlide)
							
						return <div key={index} style={{ 
							background: `rgba(${slide.backGroundColor.r}, ${slide.backGroundColor.g}, ${slide.backGroundColor.b}, ${slide.backGroundColor.a})`,
							color: `rgba(${slide.textColor.r}, ${slide.textColor.g}, ${slide.textColor.b}, ${slide.textColor.a})`, 
							padding: '250px'}}>
                            {slide.text}
                        </div>})}
            </Carousel>

        </>
    )


}

function Setting({numNotes, instrumentArr, noteDuration, scale, keyNum, BPM, setMIDIFile}) {
    let st = {
        height: '100px',
        position: 'fixed',
        bottom: '0%',
        width: '100%',
        backgroundColor: '#393838',
        opacity: '1',
    }

	// Just some console logs for debug purposes
	if (showMusicRelatedConsoleOutput)
	{
		console.log("numNotes: " + numNotes)
		console.log("instrumentArr: " + instrumentArr)
		console.log("noteDuration: " + noteDuration)
		console.log("Scale: " + scale)
		console.log("keyNum: " + keyNum)
		console.log("BPM: " + BPM)
	}

	const [record, setRecord] = useState(false);

	// ------------------------------------------------------------------------------ DEFINED BY USER IN EARLY STAGES OF RECORD PAGE ------------------------------------------------------------------------------

	// Beats Per Minute of the track [aka tempo]
	var BPM = 120;

	// This isnt a constant its a user variable but it needs to be at the top I'm sorry I can move it later probably hopefully
	// The type of note for each channel. sixteenth, eighth, quarter, half, or whole. Don't forget the ""!
	var FP1NoteType = getNoteLengthStringFromInt(noteDuration[0]),
		FP2NoteType = getNoteLengthStringFromInt(noteDuration[1]),
		C3NoteType = getNoteLengthStringFromInt(noteDuration[2]),
		C4NoteType = getNoteLengthStringFromInt(noteDuration[3]);

	// The instrument that each channel will be "playing" SineWave as a default unless changed from GUI
	var FP1Instrument = instrumentArr[0],
		FP2Instrument = instrumentArr[1],
		C3Instrument = instrumentArr[2],
		C4Instrument = instrumentArr[3];

	// ------------------------------------------------------------------------------ "GLOBAL" VARIABLES (TRYING TO ELIMINATE) ------------------------------------------------------------------------------

	// The amount of time (in milliseconds) that each of the supported notes would take at the specified BPM.
	const timeForEachNoteARRAY =
	[
		getMilliecondsFromBPM(BPM) / 4,
		getMilliecondsFromBPM(BPM) / 2,
		getMilliecondsFromBPM(BPM),
		getMilliecondsFromBPM(BPM) * 2,
		getMilliecondsFromBPM(BPM) * 4
	];

	// Number of total notes that are able to be assigned. 7 is one octave, 14 is two octaves, 21 is three octaves.
	// Going above 21 is NOT recommended and has NOT been tested, but should theoretically work. DO NOT use values 
	// that aren't multiples of 7. Works best with 7, 14, and 21. Do not ever exceed 63.
	// NOTE: This software works using 7-note octaves, meaning that the root note's octave jump is not included in
	//       the scale. For example, C major is C, D, E, F, G, A, B. It does NOT include the C of the next octave.
	// var numNotes = 7;

	// The array of size numNotes that is used to house the cutoffs for each of the numNotes incremements. 
	// The value of MIN_MAX_AMPLITUDE_DIFFERENCE is divided by numNotes, and the result (let's call this X) is then used to 
	// create evenly-spaced "sections" in the array. 
	// incrementArr[0] will always be 0, and incrementArr[numNotes - 1] will always be Constants.MAX_AMPLITUDE + AMPLITUDE_OFFSET.
	// incrementArr[1] will be X. incrementArr[2] will be X * 2. incrementArr[3] will be X * 3.
	// In runtime, the data that the headset relays will be compared to entries in incrementArr simultaneously to find
	// which values it falls between, and from there a note will be declared. For example, let's say incrementArr[0] is 0,
	// incrementArr[1] is 0.5, and incrementArr[2] is 1.0. The headset relays data equal to 0.75. Because 0.75 falls
	// between incrementArr[1] and [2], it will be assigned to note 1, the floor of the indexes it fell between.
	var incrementArr = new Array(numNotes);

	// These booleans are used to allow and disallow new notes to be generated for each channel. 
	// Turned off (false) when a channel is generating and/or playing back a real-time note, and turned on when the channel is inactive (AKA ready to generate a note)
	var FP1Ready = true, FP2Ready = true, C3Ready = true, C4Ready = true, 
		TempoCounterReady = true; // This one is used for console debugging, you can probably ignore it.

	// The length in milliseconds of each channel's note type.
	var FP1NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP1NoteType)],
		FP2NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(FP2NoteType)],
		C3NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C3NoteType)],
		C4NoteLengthMS = timeForEachNoteARRAY[getIntFromNoteTypeString(C4NoteType)];

	// We do not currently support volume changes, but you can use these values to implement that if you want!
	// These are the differences between the default volume and target volume, per channel. Positive values make it louder, negative values make it quieter.
	var FP1VolDelta = 0, FP2VolDelta = 0, C3VolDelta = 0, C4VolDelta = 0
	// These are the variables that are used in the program to determine volume. Currently all channels are the same volume but you can adjust the deltas above
	// to achieve different results, and it should just work since we've already added them in below.
	var FP1Volume = Constants.DEFAULT_VOLUME + FP1VolDelta,
		FP2Volume = Constants.DEFAULT_VOLUME + FP2VolDelta,
		C3Volume = Constants.DEFAULT_VOLUME + C3VolDelta,
		C4Volume = Constants.DEFAULT_VOLUME + C4VolDelta;

	// Scale and keynum are retrieved from the user's choice of major/minor [index] and key signature [index], respectively
	var keySignature = Constants.KEY_SIGNATURES[scale][keyNum];

	let rec; // Used to stop the infinite loop from track.subscribe
	let dataDevices; // Holds data regarding the connection to the headset.
	
	// "Global" variables for bluetooth and headset data retrieval
	const allData = [];
	let channels = 0;
	let trackMap = new Map();
	let contentHintToIndex = {};

	// ------------------------------------------------------------------------------ THE IMPORTANT PART ------------------------------------------------------------------------------

    useEffect(() => {

		initMIDIWriter(BPM); // Prepares the program to store/write MIDI data

		// Setup for data streaming
		dataDevices = new datastreams.DataDevices();
		dataDevices.load(ganglion);

		// This runs when the headset is successfully connected via Bluetooth
		const startAcquisition = async (label) => {
			// Get device stream
			const dataDevice = await dataDevices.getUserDevice({ label });

			// Grab datastream from device
			const stream = dataDevice.stream;

			// Handle all tracks
			stream.tracks.forEach(handleTrack);
			stream.onaddtrack = (e) => handleTrack(e.track);
		};

		// Track handler
		const handleTrack = (track) => {
			// Map track information to index
			if (!trackMap.has(track.contentHint)) {
				const index = trackMap.size;
				contentHintToIndex[track.contentHint] = index;
				trackMap.set(index, track);
			}

			// Grab index
			const i = contentHintToIndex[track.contentHint];
			channels = i > channels ? i : channels; // Assign channels as max track number

			// This track.subscribe block is essentially a big infinite loop that iterates every time a new "tick" of data is sent from the headset,
			// which happens many times per second. Think of it as a listener for data from the headset.
			track.subscribe((data) => {
				// Stops/pauses the recording. Simple but works!
				if (!rec){}
					//console.log("Recording stopped");
				else
				{
					// Store and organize new data
					let arr = [];
					for (let j = 0; j <= channels; j++)
						i === j ? arr.push(data) : arr.push([]);

					// This is a block meant for debugging only; it prints some information every time a quarter note elapses. Think of it as a metronome. 
					if (TempoCounterReady == true && showMusicRelatedConsoleOutput) {
						TempoCounterReady = false;
						setTimeout(() => {
							console.log("----- It's been " + getMilliecondsFromBPM(BPM) + "ms (one quarter note at " + BPM + "bpm) -----");
							TempoCounterReady = true;
						}, getMilliecondsFromBPM(BPM));
					}

					// This is to save the raw headset data (shortened to 7 decimal points). It writes the most recent headset data (the data that caused track.subscribe to iterate) into an array,
					// and then later on the user has the ability to download a .csv file with all of the values.
					// if (data[0] != null) {
					// 	allData.push(
					// 		[
					// 			track.contentHint,
					// 			Math.round(`${data[0]}` * 10000000) / 10000000,
					// 		]
					// 	);
					// }

					// These asynchronously call the driver function for music generation, allowing the program at-large to continue running while handling multiple notes at once.
					// To add more tracks, you'd simply copy what's below but change the variable names (after declaring them, of course) and string comparisons to match your sensor names.
					// You should be able to swap out the generation algorithm as you please, as long as your algorithm function(s) ultimately return something in the form of:
					// 1 object with 4 parameters:
					//     - noteFrequency: a float, with a value (hopefully) between 20 and 20,000
					//     - noteVolume: a float, between 0 and 1. You could probably go higher but we didn't try to.
					//     - instrument: an int that corresponds to the chosen instrument (see instrumentEnums in Constants.js)
					//     - noteType: a string that says the note type. v3 supports "sixteenth" "eighth" "quarter" "half" and "whole", nothing else.
					// If your driver function returns an object that abides by all of the above standards, it should be plug-and-play!
					if (track.contentHint.localeCompare("FP1") == 0 && FP1Ready == true) 
					{
						FP1Ready = false; // Stops the program from generating anything for FP1
						setTimeout(() => 
						{ 
							let output = mainDriverFunction(track, data, FP1Instrument, FP1NoteType, FP1Volume); // <--------- This is where you'd swap out the algorithm (mainDriverFunction)
							output.then(value => {
								if (value !== -1)
									playMidiNote(value.noteFrequency, value.noteVolume, value.instrument, value.noteType);
							})
							FP1Ready = true; // Allows the program to start generating notes for FP1 again
						}, FP1NoteLengthMS) 
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("FP2") == 0 && FP2Ready == true) 
					{
						FP2Ready = false; // Stops the program from generating anything for FP2
						setTimeout(() => 
						{ 
							let output = mainDriverFunction(track, data, FP2Instrument, FP2NoteType, FP2Volume);
							output.then(value => {
								if (value !== -1)
									playMidiNote(value.noteFrequency, value.noteVolume, value.instrument, value.noteType);
							})
							FP2Ready = true; // Allows the program to start generating notes for FP2 again
						}, FP2NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("C3") == 0 && C3Ready == true) 
					{
						C3Ready = false; // Stops the program from generating anything for C3
						setTimeout(() => 
						{ 
							let output = mainDriverFunction(track, data, C3Instrument, C3NoteType, C3Volume);
							output.then(value => {
								if (value !== -1)
									playMidiNote(value.noteFrequency, value.noteVolume, value.instrument, value.noteType);
							})
							C3Ready = true; // Allows the program to start generating notes for C3 again
						}, C3NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
					else if (track.contentHint.localeCompare("C4") == 0 && C4Ready == true) 
					{
						C4Ready = false; // Stops the program from generating anything for C4
						setTimeout(() => 
						{ 
							let output = mainDriverFunction(track, data, C4Instrument, C4NoteType, C4Volume);
							output.then(value => {
								if (value !== -1)
									playMidiNote(value.noteFrequency, value.noteVolume, value.instrument, value.noteType);
							})
							C4Ready = true; // Allows the program to start generating notes for C4 again
						}, C4NoteLengthMS)
						if (data[0] != null) {
							allData.push(
								[
									track.contentHint,
									Math.round(`${data[0]}` * 10000000) / 10000000,
								]
							);
						}
					}
				}
			});
		};

		// This is the function that handles all of the note generation. It has various supporting functions that it calls, but it all stems from here.
		const mainDriverFunction = async (track, data, instrument, noteType, noteVolume) => {
			InitIncrementArr();
			var declaredNote = NoteDeclarationRaw(data); // Get note increment
			var noteAndOctave = GetNoteWRTKey(declaredNote); // Get the actual note and its octave
			var floorOctave = GetFloorOctave(numNotes); // Get the lowest octave that will be used in the song

			var noteOctaveString; // Combination string of note and octave (ex: 'C#5', 'F4')
			var noteFrequency;

			if (noteAndOctave.note != -1) // If the generated note is not a rest
			{
				noteOctaveString = noteAndOctave.note + (noteAndOctave.octave + floorOctave);
				noteFrequency = getFrequencyFromNoteOctaveString(noteOctaveString);
			}

			if (noteAndOctave.note != -1  && showMusicRelatedConsoleOutput) // If the generated note is not a rest
			{
				// This if/else stack is just for console output, nothing important happens here.
				if (track.contentHint.localeCompare("FP1") == 0)
					console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP1Instrument) + " playing " + noteType + " notes] " + data);
				else if (track.contentHint.localeCompare("FP2") == 0)
					console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(FP2Instrument) + " playing " + noteType + " notes] " + data);
				else if (track.contentHint.localeCompare("C3") == 0)
					console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C3Instrument) + " playing " + noteType + " notes] " + data);
				else if (track.contentHint.localeCompare("C4") == 0)
					console.log(track.contentHint + ": " + noteOctaveString + " [" + getInstrumentNameFromInt(C4Instrument) + " playing " + noteType + " notes] " + data);
			}				

			// This adds the current note to the MIDI stream
			if (track.contentHint.localeCompare("FP1") == 0)
				addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
			else if (track.contentHint.localeCompare("FP2") == 0)
				addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
			else if (track.contentHint.localeCompare("C3") == 0)
				addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)
			else if (track.contentHint.localeCompare("C4") == 0)
				addNoteToMIDITrack(track, noteAndOctave, noteOctaveString, noteType)

			if (noteAndOctave.note != -1) // If the generated note is not a rest, return all the generated data
				return {noteFrequency, noteVolume, instrument, noteType};
			else return -1; // If the note is a rest (or something went wrong), return -1.
		};

		// Set button functionality
		const buttons = document.querySelector("#buttons");
		for (let button of buttons.querySelectorAll("button"))
			if (button.id === "ganglion") {
				button.onclick = () => {rec = true; startAcquisition(button.id)};
			}
			else if (button.id === "downloadBtn") {
				button.onclick = () => downloadData();
			}
			else if (button.id === 'Disconnect'){
				button.onclick = () => {rec=false;console.log("Rec is: " + rec)};
			}
	},[])

	// This downloads the raw headset output .csv file
	function downloadData() 
	{
		// //   console.log(JSON.stringify(allData));
		var workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(allData);
		XLSX.utils.sheet_add_aoa(worksheet, [["channel", "signal"]]);
		XLSX.utils.book_append_sheet(workbook, worksheet, "SheetJS");
		XLSX.writeFile(workbook, "sheetjs.csv", { compression: true });
	}

	// ------------------------------------------------------------------------------ FUNCTIONS RELATED TO MUSIC GENERATION ------------------------------------------------------------------------------

	// This creates the array in which different "increments" for notes are housed. For more info see the comment for "var incrementArr"
	function InitIncrementArr() {
		var incrementAmount = Constants.MIN_MAX_AMPLITUDE_DIFFERENCE / numNotes; // Dividing the total range by the number of notes

		incrementArr[0] = 0; // First index will always be 0
		incrementArr[numNotes - 1] = Constants.MAX_AMPLITUDE + Constants.AMPLITUDE_OFFSET; // Last index will always be the max value + the offset

		// Fill out the array so that each index is populated with incrementAmount * index
		for (var i = 1; i < numNotes - 1; i++)
			incrementArr[i] = incrementAmount * i + Constants.AMPLITUDE_OFFSET;
	}

	// Takes in a raw value from the headset and assigns a note.
	function NoteDeclarationRaw(ampValue) {
		let ampValue2 = 0;
		ampValue2 = (ampValue - -Constants.AMPLITUDE_OFFSET); // Applies the offset to the headset's raw data

		// For every possible note, check to see if ampValue falls between two array positions. 
		// If so, return that position. If not, it will be treated as a rest (returning -1).
		for (var i = 0; i <= numNotes - 1; i++) {
			if (ampValue2 >= incrementArr[i] && ampValue2 <= incrementArr[i + 1])
				return i;
		}
		return -1;
	}

	// Gets the actual note from the previously-obtained note INCREMENT (see NoteDeclarationRaw())
	// WRT stands for "with respect to", so this is "get note with respect to key"
	function GetNoteWRTKey(note) {
		// If the note increment is between 1 and 7, simply return that index in the key array with octave being zero.
		if (note <= 7 && note >= 1)
			return { note: keySignature[note - 1], octave: 0 };
		// If the note increment is less than zero, return -1 which will be treated as a rest.
		else if (note <= 0)
			return { note: -1, octave: 0 };
		// If the note is valid and greater than 7
		else {
			var noteMod = note % 7; // Mod by 7 to find note increment
			var noteDiv = Math.floor(note / 7); // Divide by 7 to find octave WRT numNotes/3.
			return { note: keySignature[noteMod], octave: noteDiv };
		}
	}
	
// ------------------------------------------------------------------------------ DEBUG AND HTML ------------------------------------------------------------------------------

	const handleStuff = () => {
		console.log("----------------- DEBUG INFO -----------------");
		console.log("Tempo (BPM): " + BPM);
		console.log("Number of notes: " + numNotes);
		console.log("Notes in key signature: " + keySignature);
		console.log("FP1, FP2, C3, C4 Instruments: " + getInstrumentNameFromInt(FP1Instrument), ", " + getInstrumentNameFromInt(FP2Instrument) + ", "
					+ getInstrumentNameFromInt(C3Instrument) + ", " + getInstrumentNameFromInt(C4Instrument));
		console.log("FP1, FP2, C3, C4 Note Types: " + FP1NoteType, ", " + FP2NoteType + ", " + C3NoteType + ", " + C4NoteType);
		console.log("----------------------------------------------");
	}

	function playNoteBack(){
		console.log("_____________________________")
		var midi = generateMIDIURI();
		setMIDIFile(midi);
		
		//checking if playback works

		// console.log(midi);
		// console.log(instrumentArr);
		// console.log(noteDuration);
		// console.log(BPM);
		// playMidiFile(midi, instrumentArr, noteDuration, BPM);
	}
	// ------------------------------------------------------------------------------ FUNCTIONS RELATED TO RAW DATA ------------------------------------------------------------------------------

	
	
	return (
		<>
		<div id="buttons">
		  <button id="ganglion" className="recordButton">
			RECORD
		  </button>
		  <button id="Disconnect" className="stopButton" onClick={playNoteBack}>
			STOP
		  </button>
		  
		</div>
		<div>
			{/* <button onClick={downloadData} className="downloadRawButton">Download Raw Data</button> <br></br> */}
			{/* <button onClick={initMIDIWriter} className="downloadRawButton">Reset?</button> <br></br> */}
		</div>
	  </>
    );
}

export default Record;