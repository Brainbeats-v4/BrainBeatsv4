import { useState } from 'react';
import './TrackCard.css';
import {Button, Modal } from 'react-bootstrap';
import TrackModal from '../Modal/TrackModal';
import sendAPI from '../../SendAPI';

const TrackCard = () => {
    interface Track {
        createdAt: string;
        id: string;
        likeCount: number;
        midi: string;
        public: boolean;
        thumbnail: string;
        title: string;
        userID: string;
        username: string;
    }

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
    const [trackList, setTrackList] = useState<Track[]>([])

    async function getPopularTracks(numTracks:number) {
        // hit api for 'numTracks' tracks
        var objArray:Track[] = [];
        await sendAPI('get', '/posts/getPublicPopularPosts')
            .then(res => {
                for(var i = 0; i < res.data.length; i++) {
                    if(i > numTracks) break;
                    console.log(res.data[i]);
                    var currentTrack:Track = {
                        createdAt: res.data[i].createdAt,
                        id: res.data[i].id,
                        likeCount: res.data[i].likeCount,
                        midi: res.data[i].midi,
                        public: res.data[i].public,
                        thumbnail: res.data[i].thumbnail,
                        title: res.data[i].title,
                        userID: res.data[i].userID,
                        username: res.data[i].user.firstName + ' ' + res.data[i].user.lastName
                    }
                    objArray.push(currentTrack);
                }
                setTrackList(objArray);
            })
            .catch(err => {
                console.log(err);
            });
        return;
    }
    
    function PopulateTrackCards() {
        const MAX_COLS:number = 4;
        const MAX_ROWS:number = 2;
        var gridArray:any[] = [];
        var currentTrackCounter:number = 0;
        const defaultImage = 'https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png';
        if(trackList.length === 0) {
            getPopularTracks(MAX_COLS * MAX_ROWS);
        }
        console.log(trackList);
        for(let i = 0; i < MAX_ROWS; i++){
            for(let j = 0; j < MAX_COLS; j++) {
                let currentTrack = trackList[currentTrackCounter++];
                if(currentTrack == null) break;
                let image = currentTrack.thumbnail === "" ? defaultImage : currentTrack.thumbnail;
                //let trackLink = JSON.stringify(currentTrack.trackLink);
                let title = currentTrack.title;
                let user = currentTrack.username;
    
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

   function setTrack(currentTrack:any) {
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