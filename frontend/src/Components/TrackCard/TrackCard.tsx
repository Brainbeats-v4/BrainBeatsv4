import { useEffect, useState } from 'react';
import './TrackCard.css';
import { Modal } from 'react-bootstrap';
import TrackModal from '../TrackModal/TrackModal';
import sendAPI from '../../SendAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
    const [trackList, setTrackList] = useState<Track[]>([]);
    const [newTrackList, setNewTrackList] = useState<any[]>([]);


    // For refresing track list component on page
    const [seed, setSeed] = useState(1);
    const resetTrackComponent = () => {
        // console.log("resetTrackComponent()");
        setSeed(Math.random());
        setNewTrackList(PopulateTrackCards()); // need to debug. not calling checklike when opening/editing unliked track.
        // console.log("resetting seed");
    }

    // Initializes newTrackList
    useEffect(() => {
        setNewTrackList(PopulateTrackCards()); // need to debug. not calling checklike when opening/editing unliked track.
        // console.log("use effect: " + newTrackList);
    }, []);

    // const reload=()=>window.location.reload();
    // const handleClose2 = () => {
    //     console.log("handle close 2");
    //     setNewTrackList(PopulateTrackCards());
    //   };

    const [tracksPulled, setTracksPulled] = useState(false);
    const [currentSearch, setCurrentSearch] = useState('');

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

    async function getSearchTracks(title:string) {
        var objArray:Track[] = [];
        setCurrentSearch(title);
        console.log(title)
        let query = {title: title};
        await sendAPI('get', '/posts/getPostsByTitle', query)
        .then((res) => {
            console.log(res);
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
        console.log(input);
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
        //cardType Search goes outside of the conditional because there is the case where searching has already happened
        if (cardType === 'Search')
            if(currentSearch !== input) getSearchTracks(input);
        if(!tracksPulled) {
            if(cardType === 'Profile') getProfileTracks();
            else if(cardType === 'Popular') getPopularTracks(MAX_COLS * MAX_ROWS);
        }
        for(let i = 0; i < MAX_ROWS; i++){
            for(let j = 0; j < MAX_COLS; j++) {
                let currentTrack = trackList[currentTrackCounter++];
                if(currentTrack == null) break;
                if(!currentTrack.public && cardType!= 'Profile') continue;
                currentTrack.thumbnail = currentTrack.thumbnail === "" ? defaultImage : currentTrack.thumbnail;
                //let trackLink = JSON.stringify(currentTrack.trackLink);
                let title = currentTrack.title;
                let user = currentTrack.fullname;
    
                gridArray.push(currentTrack);
            }
        }

        // console.log("PopulateTrackCards()");
        return gridArray;
    }

   function setTrack(currentTrack:Track) {
       setCurrentTrack(currentTrack);
       setShow(true);      
    }

    let trackCards = PopulateTrackCards();

    // const updateTrackCards = (index: number) => (e: { target: { name: any; value: any; }; }) => {        
    //     const newTrackList = trackCards.map((item, i) => {
    //         if (index === i) {
    //           return { ...item, [e.target.name]: e.target.value };
    //         } else {
    //           return item;
    //         }
    //       });
    //       trackCards = newTrackList;
    //       console.log("updated track cards");
    // }

    // const [tracksDisplayed, setTracksDisplayed] = useState<Track[]>(trackCards);
    // console.log(tracksDisplayed);


    // const updateTracksDisplayed = (index: number) => (e: { target: { name: any; value: any; }; }) => {        
    //     const newTrackList = tracksDisplayed.map((item, i) => {
    //       if (index === i) {
    //         return { ...item, [e.target.name]: e.target.value };
    //       } else {
    //         return item;
    //       }
    //     });
    //     setTracksDisplayed(newTrackList);
    //   };


    return (
        <div className='container text-center'>
            <div className='row track-row'>
                {trackCards.map((trackCard, index) => (
                    <div className="col track-col" key={index}>
                        <button className=" btn btn-primary card" onClick={() => setTrack(trackCard)}>
                            <img src={trackCard.thumbnail} className="card-img-top" id="card-img-ID" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{trackCard.title}</h5>
                                <div className="card-text">
                                    <p id='card-author'>{trackCard.fullname}</p>
                                    <div id='card-likes'>
                                        <FontAwesomeIcon className='modal-track-icons' icon={faHeart} />
                                        {trackCard.likeCount}
                                    </div>
                                </div>
                                
                            </div>
                        </button>
                    </div>
                ))}
            </div>
            <Modal id='pop-up' show={show} onHide={handleClose} onExit={resetTrackComponent}>
                <TrackModal key={seed} track={currentTrack}/>
            </Modal>
        </div>
    )
};

export default TrackCard;
