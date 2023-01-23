import { useState } from 'react';
import './TrackCard.css';
import { Modal } from 'react-bootstrap';
import TrackModal from '../Modal/TrackModal';
import sendAPI from '../../SendAPI';

type Props = {
    cardType:string;
    input: any;
}

const TrackCard: React.FC<Props> = ({cardType, input}) => {
    interface Track {
        createdAt: string;
        id: string;
        likeCount: number;
        midi: string;
        public: boolean;
        thumbnail: string;
        title: string;
        userID: string;
        fullname: string;
    }

    const emptyTrack:Track = {
        "createdAt": "",
        "id": "",
        "likeCount": -1,
        "midi": "",
        "public": false,
        "thumbnail": "",
        "title": "",
        "userID": "",
        "fullname": ""
    }

    // For displaying Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [currentTrack, setCurrentTrack] = useState<Track>(emptyTrack);
    const [trackList, setTrackList] = useState<Track[]>([])
    const [tracksPulled, setTracksPulled] = useState(false);

    async function getPopularTracks(numTracks:number) {
        // hit api for 'numTracks' tracks
        var objArray:Track[] = [];
        await sendAPI('get', '/posts/getPublicPopularPosts')
        .then(res => {
                for(var i = 0; i < res.data.length; i++) {
                    if(i > numTracks) break;
                    var currentTrack:Track = {
                        createdAt: res.data[i].createdAt,
                        id: res.data[i].id,
                        likeCount: res.data[i].likeCount,
                        midi: res.data[i].midi,
                        public: res.data[i].public,
                        thumbnail: res.data[i].thumbnail,
                        title: res.data[i].title,
                        userID: res.data[i].userID,
                        fullname: res.data[i].user.firstName + ' ' + res.data[i].user.lastName
                    }
                    objArray.push(currentTrack);
                }
                setTrackList(objArray);
                setTracksPulled(true)
            })
            .catch(err => {
                console.log(err);
            });
        return;
    }

    async function getSearchTracks(numTracks:number, title:string) {
        var objArray:Track[] = [];
        console.log(title)
        await sendAPI('get', '/posts/getPostsByTitle', title)
        .then((res) => {
            console.log("status: " + res.status);

                for(var i = 0; i < res.data.length; i++) {
                    if(i > numTracks) break;
                    var currentTrack:Track = {
                        createdAt: res.data[i].createdAt,
                        id: res.data[i].id,
                        likeCount: res.data[i].likeCount,
                        midi: res.data[i].midi,
                        public: res.data[i].public,
                        thumbnail: res.data[i].thumbnail,
                        title: res.data[i].title,
                        userID: res.data[i].userID,
                        fullname: res.data[i].user.firstName + ' ' + res.data[i].user.lastName
                    }
                    objArray.push(currentTrack);
                }
                setTrackList(objArray);
                setTracksPulled(true)
            })
            .catch(err => {
                console.log(err);
            });
        return;
    }

    async function getProfileTracks() {
        var objArray:Track[] = [];
        var user = {userID: input};
        await sendAPI('get', '/posts/getUserPostsByID', user)
        .then(res => {
            for(var i = 0; i < res.data.length; i++) {
                var currentTrack:Track = {
                    createdAt: res.data[i].createdAt,
                    id: res.data[i].id,
                    likeCount: res.data[i].likeCount,
                    midi: res.data[i].midi,
                    public: res.data[i].public,
                    thumbnail: res.data[i].thumbnail,
                    title: res.data[i].title,
                    userID: res.data[i].userID,
                    fullname: res.data[i].user.firstName + ' ' + res.data[i].user.lastName,
                }
                objArray.push(currentTrack);
            }
            setTrackList(objArray);
            setTracksPulled(true)
        })
    }
    
    function PopulateTrackCards() {
        const MAX_COLS:number = 4;
        const MAX_ROWS:number = 2;
        var gridArray:any[] = [];
        var currentTrackCounter:number = 0;
        const defaultImage = 'https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png';
        if(!tracksPulled) {
            if(cardType === 'Profile') {
                getProfileTracks();
            } else if (cardType === 'Search') {
                getSearchTracks(MAX_COLS * MAX_ROWS, input);
            } else if(cardType === 'Popular'){
                getPopularTracks(MAX_COLS * MAX_ROWS);
            }
        }
        for(let i = 0; i < MAX_ROWS; i++){
            for(let j = 0; j < MAX_COLS; j++) {
                let currentTrack = trackList[currentTrackCounter++];
                if(currentTrack == null) break;
                currentTrack.thumbnail = currentTrack.thumbnail === "" ? defaultImage : currentTrack.thumbnail;
                //let trackLink = JSON.stringify(currentTrack.trackLink);
                let title = currentTrack.title;
                let user = currentTrack.fullname;
    
                gridArray.push(currentTrack);
            }
        }
        return gridArray;
    }

   function setTrack(currentTrack:Track) {
        console.log("current track: " + currentTrack);
       setCurrentTrack(currentTrack);
       setShow(true);
    }

    var trackCards = PopulateTrackCards();
    
    return (
        <div className='container text-center'>
            <div className='row track-row'>
                {trackCards.map((trackCard) => (
                    <div className="col track-col">
                        <button className=" btn btn-primary card" onClick={() => setTrack(trackCard)}>
                            <img src={trackCard.thumbnail} className="card-img-top" id="card-img-ID" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{trackCard.title}</h5>
                                <p className="card-text">{trackCard.fullname}</p>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            <Modal id='pop-up' show={show} onHide={handleClose}>
                <TrackModal track={currentTrack}/>
            </Modal>
        </div>
    )
};

export default TrackCard;