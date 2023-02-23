import { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sendAPI from '../../SendAPI';
import { userJWT, userModeState } from "../../JWT";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import buildPath from '../../util/ImagePath';


// Import CSS
import './TrackModal.css';
import '../TrackCard/TrackCard.css';
import TrackCard from '../TrackCard/TrackCard';

type Props = {
  track: Track; 
}

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

const TrackModal: React.FC<Props> = ({track}) => {
  const navigate = useNavigate();
  const jwt = useRecoilValue(userJWT);
  const [user, setUser] = useRecoilState(userModeState);

  const [editing, setEditing] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [trackName, setTrackName] = useState(track.title);
  const [visibility, setVisibility] = useState(track.public);
  const [buttonText, setButtonText] = useState(visibility ? "Make Private" : "Make Public");
  const [thumbnail, setThumbnail] = useState(track.thumbnail);

  const [likeCount, setLikeCount] = useState(track.likeCount);
  const [favorited, setFavorited] = useState (false); // change this later

  function doDelete() {
    let data = { id:track.id, token:jwt }

    sendAPI("delete", "/posts/deletePost", data).then((res) => {
      if (res.status != 200) {
        setErrMsg("Failed To Delete");
        setSuccessMsg("");
      }
      else {
        // Close the modal, refresh the posts showed on current page
        setErrMsg("");
        setSuccessMsg("");
        
      }
    })

  }

  function setVisibilityButton() {
    setVisibility(!visibility);
    setButtonText(visibility ? "Make Private" : "Make Public");
  }

  // For displaying track thumbnail picture
  const [displayThumbnail, setDisplayThumbnail] = useState(track!==null ? track.thumbnail : undefined);

  if(displayThumbnail !== undefined) {
    if ((displayThumbnail as string).split('/')[0] === 'data:text') {
      console.log(displayThumbnail);
      var encodedThumbnailPic = (displayThumbnail as string).split(',')[1];
      var decodedThumbnailPic = Buffer.from(encodedThumbnailPic, 'base64').toString('ascii');
      setDisplayThumbnail(buildPath(decodedThumbnailPic));
    } 
  }

  function convertToBase64(file:File) {
        
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        /* This block of code converts the file's old name into one that includes the user's ID for storing */
        // var fileName:string = file.name;
        // var extensionArray:string[] = fileName.split('.');
        // var fileExtension:string = extensionArray[extensionArray.length - 1]; // in the case that there may be any extra '.' for some reason
        // var renameStr:string = user.userId + '.' + fileExtension
        // var renamedFile:File = new File([file], renameStr)
        fileReader.readAsDataURL(file);
        
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
            reject(error);
        }
    })
  }

  // Function updating thumbnail picture
  async function updateThumbnail(track: Track) {
    if (displayThumbnail != null)
    {
      console.log("updating thumbnail");
      track.thumbnail = displayThumbnail;
    }
  };

  async function updateDisplayThumbnail(file: File){
    var base64result:any;
    await convertToBase64(file).then(res => {
        base64result = res;
    })
    // console.log(base64result);
    var updatedPost = {
        id: track.id,
        token: jwt,
        thumbnail: base64result
    };
    // console.log(updatedPost);
    // track.thumbnail = updatedPost.thumbnail;
    setDisplayThumbnail(updatedPost.thumbnail);
  }




  function updateTrack (newVisibility = visibility, newTrackName = trackName, thumbnailPic = displayThumbnail, likes = likeCount) {

    if (jwt == null || user == null) navigate("/login");

    console.log(visibility);

    let updatedTrack = {
      id: track.id,
      title: newTrackName,
      midi: track.midi,
      thumbnail: thumbnailPic,
      likeCount: track.likeCount,
      public: newVisibility,
      token: jwt,
    }
    
    console.log("track name: " + newTrackName);
    sendAPI("put", "/posts/updatePost", updatedTrack).then((res) => {
      if (res.status == 200) {
        setErrMsg(trackName);
        // setSuccessMsg(JSON.stringify(res.data));
      }
      else {
        setErrMsg("Could not save post.");
        setSuccessMsg("");
      }
    })

    setEditing(false);
    track.title = newTrackName;
    track.public = newVisibility;
    track.likeCount = likeCount;
  }

  // Creates a new like
  function addLike() {

    // console.log(user.firstName);
    let newLike = {
      userID: user.userId,
      postID: track.id,
      token: jwt,
    }
    
    sendAPI("post", "/likes/createUserLike", newLike).then((res) => {
      if (res.status == 200) {
        setErrMsg(track.title);
        console.log(track.title + " liked");
        setLikeCount(likeCount + 1);

        // setSuccessMsg(JSON.stringify(res.data));
      }
      else {
        setErrMsg("Could not like post.");
        setSuccessMsg("");
      }
    }) 

    console.log(track.title + " likes: " + likeCount);
  }

   // Removes a new like
   function removeLike() {

    // console.log(user.firstName);
    let newLike = {
      userID: user.userId,
      postID: track.id,
      token: jwt,
    }
    
    sendAPI("delete", "/likes/removeUserLike", newLike).then((res) => {
      if (res.status == 200) {
        setErrMsg(track.title);
        console.log(track.title + " like removed");
        // setSuccessMsg(JSON.stringify(res.data));
        
        if(likeCount > 0) 
        setLikeCount(likeCount - 1);
      }
      else {
        setErrMsg("Could not like post.");
        setSuccessMsg("");
      }
    })

    console.log(track.title + " total likes: " + likeCount);
  }


  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div id='modal-track-cover-div'>
              {editing && <div id='edit-track-cover-div'>
                <label id="track-cover-upload-label" htmlFor="trackInputTag">
                  Select Track Image:
                </label>
                <input id="track-cover-upload" onChange={event=> {if(!event.target.files) {return} else {updateDisplayThumbnail(event.target.files[0])}}} name="image" type="file" accept='.jpeg, .png, .jpg'/>
              </div>}
              <img src={displayThumbnail} className="card-img-top modal-track-cover" id="card-img-ID" alt="track image" onClick={() => {}}/>
            </div>
            <div id='modal-track-text-div'>
              {!visibility && <h6 id="hidden-track-text">
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye-slash"]} />
                hidden track
              </h6>}
              {visibility && <h6 id="hidden-track-text">
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye"]} />
                Public track
              </h6>}
              {!editing && <h1 id='track-title-text'>{trackName}</h1>}
              {editing && <input type="text" id='track-title-text' defaultValue={trackName} onChange={(e) => setTrackName(e.target.value)}></input>}
              
              <h6 id="track-author-text">By {track.fullname} </h6>
              <button type="button" className="btn btn-primary" id='play-btn'>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "play"]} />
                <h3>Play</h3>
              </button>
              <h5 id='favorites-text'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "heart"]} />
                {likeCount} Favorites
              </h5>
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            <div id='modal-container-20'>
              {editing && <button className='btn btn-secondary modal-btn-public' onClick={() => setVisibilityButton()}>
                {visibility && <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye"]} id="visibilityButton" />}
                {!visibility && <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye-slash"]} id="visibilityButton" />}
                  {visibility ? "Make Private" : "Make Public"}
              </button>}
              {editing && <button className='btn btn-secondary modal-btn-public' id='delete-track-btn' onClick={()=>doDelete()}>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "trash"]} />
                Delete Track
              </button>}
            </div>
            <div id='modal-container-21'>
              {!favorited && <button className='btn btn-secondary modal-btn' value={track.likeCount} onClick={(e) => {addLike(); updateTrack(); setFavorited(true)}}>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "heart"]} />
                Favorite
              </button>}
              {favorited && <button className='btn btn-secondary modal-btn' onClick={(e) => {removeLike(); updateTrack(); setFavorited(false)}}>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "heart"]} />
                Unfavorite
              </button>}
              <button className='btn btn-secondary modal-btn'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "plus"]} />
                Add to Playlist
              </button>
              {editing && <button className='btn btn-secondary modal-btn' onClick={() => {updateTrack(); updateThumbnail(track)}}>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "edit"]} />
                Save
              </button>}
              {!editing && <button className='btn btn-secondary modal-btn' onClick={() => setEditing(!editing)}>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "edit"]} />
                Edit
              </button>}
              {/* {successMsg}
              {errMsg} */}
            </div>
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default TrackModal;