import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from '../../../../JWT';
import { useAppSelector } from '../../../../Redux/hooks';
import CardCarousel from '../../../CardCarousel/CardCarousel';
import UploadTrackModal from '../../../UploadTrackModal/UploadTrackModal';
import { User } from '../../../../util/Interfaces';

import { Track } from '../../../../util/Interfaces';
import { emptyTrack } from '../../../../util/Constants';



// Import CSS
import './RecordCards.css'

const RecordCards = () => {
    
    const [user, setUser] = useRecoilState(userModeState);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);
    
    const settings = useAppSelector(state => state.musicGenerationSettingsSlice);

    // Toggles Record and Stop button when recording
    const [recordVisibility, setRecordVisibility] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // For collecting image from Redux
    const scriptCards = useAppSelector(state => state.cardArraySlice);

    const [currentTrack, setCurrentTrack] = useState<Track>(emptyTrack);
    const defaultThumbnail = "bbmascot-wBackground-eyes_open_smiling.png";

    // Hanlde the model for the newly created Track
    function showEditTrackInfo() {

        console.log("user: ", user);

        // User is logged in to post this track
        if (user) {

            // TODO: Grab the midi and place it in the track
            var newTrack:Track = {
                "id": "",
                "title": "",
                "bpm": settings.bpm,
                "key": settings.keyGroup,
                "scale": settings.scale,
                'instruments': settings.deviceSettings.instruments,
                "noteTypes": settings.deviceSettings.instruments,
                "likeCount": 0,
                "midi": "",
                "thumbnail": defaultThumbnail,
                "user": user,
                "userID": user.id,
                "public": true,
            }


            setCurrentTrack(newTrack);
        }
        /* No user is logged in, they can download but can NOT save unless creating an account and logging in.
         * We should ask the user to login and or make an account, and store the midi temporarily in redux.
         * After the user has logged in / created account, if redux.midi is not empty, prompt user that they have 
         * an unsaved midi track, (aka just pull the model up and allow the user to fill in the information for the track
         * if they wish to post.)
         */
        else {
            // prompt they need to login / create account

            // easiest solution is to create a pop up model to do this so they never leave this page and
            // then continue saving the Track

            // Other solution is to save midi to redux like stated above, and once logged in trigger event to 
            // tell user a midi is in redux and is unsaved, and they need to save
        }

        setShow(true);
     }

    return (
        <div className='container' id='record-track-container'>
            <Modal id='pop-up' show={show} onHide={handleClose}>
                <UploadTrackModal track={emptyTrack}/>
            </Modal>
            <div>
                <div id='record-track-info-div'>
                    <div id='display-record-card-div'>
                        Displaying Cards:
                        <CardCarousel></CardCarousel>
                        {/* <div className='card-display'>
                        </div> */}
                    </div>
                </div>
                <div id='record-publish-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='record-cancel-btn'>Cancel</button>
                    <button type="button" className="btn btn-secondary" id='record-publish-btn' onClick={showEditTrackInfo}>Save</button>
                </div>
            </div>          
        </div>);
}

export default RecordCards;