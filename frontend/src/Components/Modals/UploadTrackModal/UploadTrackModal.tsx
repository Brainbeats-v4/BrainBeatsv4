import { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sendAPI from '../../../SendAPI';
import { userJWT, userModeState } from "../../../JWT";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Track } from '../../../util/Interfaces';

// Import CSS
import './UploadTrackModal.css';
import '../TrackModal/TrackModal.css';
import '../../TrackCard/TrackCard.css';
import { CloseButton } from 'react-bootstrap';
import Playback from '../../Playback/Playback';

type Props = {
    track: Track; 
}

const UploadTrackModal: React.FC<Props> = ({track}) => {
    const navigate = useNavigate();
    const jwt = useRecoilValue(userJWT);
    const user = useRecoilValue(userModeState);

    const [editing, setEditing] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const [trackName, setTrackName] = useState(track.title);
    const [visibility, setVisibility] = useState(track.public);
    const [buttonText, setButtonText] = useState(visibility ? "Make Private" : "Make Public");
    const [thumbnail, setThumbnail] = useState(track.thumbnail);


    function setVisibilityButton() {
        setVisibility(!visibility);
        setButtonText(visibility ? "Make Private" : "Make Public");

        // console.log("clicking");
        // console.log(visibility, buttonText);
    }

    useEffect(() => {
        updateTrack(visibility);
    }, [visibility])

    function updateTrack (visibility = track.public, trackName = track.title, thumbnail = track.thumbnail) {

        if (jwt == null) navigate("/login");
        // console.log(track);
        let updatedTrack = {
            id: track.id,
            title: trackName,
            midi: track.midi,
            thumbnail: thumbnail,
            likeCount: track.likeCount,
            public: visibility,
            token: jwt,
        }
    
        if (user){
            sendAPI("put", "/tracks/updateTrack", updatedTrack).then((res) => {
                if (res.status == 200) {
                    setErrMsg(trackName);
                    // setSuccessMsg(JSON.stringify(res.data));
                }
                else {
                    setErrMsg("Could not save track.");
                    setSuccessMsg("");
                }
            })
        }
    
    }


    function saveTrack() {
        if(user) {
            let newTrack = {
                id: track.id,
                userID: user.id,
                bpm: track.bpm,
                key: track.key,
                scale: track.scale,
                instruments: {},
                noteTypes: {},
                title: trackName,
                midi: track.midi,
                thumbnail: '',
                likeCount: track.likeCount,
                token: jwt
            }
            sendAPI('post', '/tracks/createTrack', newTrack).then(res => {
                if(res.status == 201) {
                    // console.log(res);
                    navigate('/profile');
                }
                else {
                    // console.log(res);
                }
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            alert("You must create an account before uploading a track.");
            window.open('./login');
        }
    }

    function verifyCancelRecording() {
        // let erase = window.confirm("Exiting will erase the track you just recorded. You will not be able to recover this track later. \n\nPress ok to record a new track.");
        window.alert("Exiting will erase the track you just recorded. You will not be able to recover this track later.");
    }

    return (
        <>
        <div>
            <div className='modal-background'>
                <Modal.Header className='modal-container-header' closeButton onClick={verifyCancelRecording}>
                {/* <CloseButton onClick={verifyCancelRecording}></CloseButton> */}
                {/* <button className='btn btn-secondary modal-btn-public' id='upload-track-btn' onClick={verifyCancelRecording}>
                    <FontAwesomeIcon className='modal-track-icons' icon={["fas", "download"]} />
                    Download
                </button> */}
                </Modal.Header>
                <Modal.Body className='modal-container-body'>
                    <div id='modal-track-cover-div'>
                        <img src={track.thumbnail} className="card-img-top modal-track-cover" id="card-img-ID" alt="..."/>
                    </div>
                    <div id='modal-track-text-div'>
                        {visibility && <h6 id="hidden-track-text">
                            <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye-slash"]} />
                            hidden track
                        </h6>}
                        {!visibility && <h6 id="hidden-track-text">
                            <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye"]} />
                            Public track
                        </h6>}
                        {!editing && <h1 id='track-title-text'>{trackName}</h1>}
                        <div className='input-track-info'>
                            { editing && <div className="mt-3">
                                <label className="form-label form-text login-text">Title:</label>
                                <input type="text" id='track-title-text' className="form-control formGroupExampleInput2" placeholder="Enter a track title" defaultValue={trackName} onChange={(e) => setTrackName(e.target.value)}/>
                                <br></br>
                            </div> }
                            <div className='mt-3'>
                                <label className="form-label form-text login-text">Author:</label>
                                <h6 id="track-author-text">{user?.firstName} {user?.lastName}</h6>
                            </div>
                            {/* <div className ='mt-3'>
                                <h6 id="track-author-text">Track:</h6>
                                <Playback midiString={track.midi}/>
                            </div> */}
                        </div>         
                    </div>
                </Modal.Body>
                <Modal.Footer className='modal-container-footer'>
                    <div id='modal-container-footer-1'>
                        {editing && <button className='btn btn-secondary modal-btn-public' onClick={() => setVisibilityButton()}>
                            {visibility && <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye"]} id="visibilityButton" />}
                            {!visibility && <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye-slash"]} id="visibilityButton" />}
                            {!visibility ? "Make Private" : "Make Public"}
                        </button>}
                    </div>
                    <div id='modal-container-footer-2'>
                        {editing && <button className='btn btn-secondary modal-btn-public upload-track-btn' /*onClick={() => updateTrack()}*/>
                            <a style={{color: "white", textDecoration: "none"}} id='download-midi-btn' download={'myTrack.MID'} href={track.midi}>
                                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "download"]} />
                                Download 
                            </a>
                        </button>}

                        {editing && <button className='btn btn-secondary modal-btn-public upload-track-btn' onClick={() => saveTrack()}>
                            <FontAwesomeIcon className='modal-track-icons' icon={["fas", "arrow-up-from-bracket"]} />
                            Upload
                        </button>}
                        {successMsg}
                        {errMsg}
                    </div>
                </Modal.Footer>
            </div>
        </div>
        </>
    );
}

export default UploadTrackModal;