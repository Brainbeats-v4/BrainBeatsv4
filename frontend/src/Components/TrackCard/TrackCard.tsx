import { useState } from 'react';
import './TrackCard.css';
import {Button, Modal } from 'react-bootstrap';
import TrackModal from '../Modal/TrackModal';

let getPopularTracks = (numTracks:number) => {
    // hit api for 'numTracks' tracks
    
    let objArray = [
        {"user":"leinecker", "title":"BrainBeats Track", "imageSrc": "https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg", "trackLink":"#"},
        {"user":"heinrich", "title":"bot", "imageSrc": "https://preview.redd.it/q12z8iajgqm01.jpg?auto=webp&s=910c47b3bf8b9458f88bcc13208b0175455dbb35","trackLink":"#"},
        {"user":"knightro", "title":"just another knight", "imageSrc": "https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png","trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"}
    ];

    return objArray;
}

function redirectToTrack() {
    
    return;
}

function PopulateTrackCards() {
    const MAX_COLS:number = 4;
    const MAX_ROWS:number = 2;
    const POPULAR_TRACKS = getPopularTracks((MAX_ROWS * MAX_COLS));
    
    var gridArray:any[] = [];
    
    var currentTrackCounter:number = 0;
    let testArr = [];
    for(let i = 0; i < MAX_ROWS; i++){
        
        let defaultImage = 'https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png';
        for(let j = 0; j < MAX_COLS; j++) {
            let currentTrack = POPULAR_TRACKS[currentTrackCounter++];
            let image = currentTrack.imageSrc === "" ? defaultImage : currentTrack.imageSrc;
            //let trackLink = JSON.stringify(currentTrack.trackLink);
            let title = currentTrack.title;
            let user = currentTrack.user;

            var obj = {
                title: title,
                user: user,
                image: image
            }
            gridArray.push(obj);
        }
    }
    return gridArray;
}

const TrackCard = () => {

    // For displaying Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const [currentTrack, setCurrentTrack] = useState(
        {
            title: '',
            user: ' ',
            image: ' ',
        }
    );

   function setTrack(currentTrack: any) {
        setShow(true);
        setCurrentTrack(currentTrack);
    }

    var trackCards = PopulateTrackCards();
    
    return (
        <div className='container text-center'>
            <div className='row track-row'>
                {trackCards.map((trackCard) => (
                    <div className="col track-col">
                        <button className=" btn btn-primary card" onClick={() => setTrack(trackCard)}>
                            <img src={trackCard.image} className="card-img-top" id="card-img-ID" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{trackCard.title}</h5>
                                <p className="card-text">{trackCard.user}</p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            <Modal id='pop-up' show={show} onHide={handleClose}>
                <TrackModal {...{title: currentTrack.title, user:currentTrack.user, image: currentTrack.image}}/>
            </Modal>
        </div>
    )
};

export default TrackCard;