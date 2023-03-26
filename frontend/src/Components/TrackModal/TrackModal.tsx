import { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sendAPI from '../../SendAPI';
import { userJWT, userModeState } from "../../JWT";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import buildPath from '../../util/ImagePath';
import { resizeMe } from '../../util/ImageHelperFunctions';


// Import CSS
import './TrackModal.css';
import '../TrackCard/TrackCard.css';
import TrackCard from '../TrackCard/TrackCard';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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

  // Initializes favorited variable
  useEffect(() => {
    checkLike(); // need to debug. not calling checklike when opening/editing unliked track.
  }, []);

  // ============================= Functions for Track Updating System =============================
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

  // Updates a track
  function updateTrack (newVisibility = visibility, newTrackName = trackName, thumbnailPic = displayThumbnail, likes = likeCount) {

    if (jwt == null || user == null) navigate("/login");

    // check if picture is of valid size before moving on
    // i.e.: <= 2mb

    let updatedTrack = {
      id: track.id,
      title: newTrackName,
      midi: track.midi,
      thumbnail: thumbnailPic,
      likeCount: likes,
      public: newVisibility,
      token: jwt,
    }
    
    sendAPI("put", "/posts/updatePost", updatedTrack).then((res) => {
      if (res.status == 200) {
        setErrMsg(trackName);
      }
      else if (res.status = 413) {
        setErrMsg("Image must be < 3mb")
      }
      else {
        setErrMsg("Could not save post.");
        setSuccessMsg("");
      }
    })

    setEditing(false);
    track.title = newTrackName;
    track.public = newVisibility;
    track.likeCount = likes;

    console.log("updating track");
  }


  // ============================= Functions for Track Cover System =============================
  
  // For displaying track thumbnail picture
  const [displayThumbnail, setDisplayThumbnail] = useState(track!==null ? track.thumbnail : undefined);

  if(displayThumbnail !== undefined) {
    if ((displayThumbnail as string).split('/')[0] === 'data:text') {
      var encodedThumbnailPic = (displayThumbnail as string).split(',')[1];
      var decodedThumbnailPic = Buffer.from(encodedThumbnailPic, 'base64').toString('ascii');
      setDisplayThumbnail(buildPath(decodedThumbnailPic));
    } 


  }

  // Returns the compressed Base64 image
  // Borrowed from: https://github.com/josefrichter/resize/blob/master/public/preprocess.js
  function compressImage(file:File) { 
    const fr = new FileReader();

    fr.readAsArrayBuffer(file);
    fr.onload = function (ev: ProgressEvent<FileReader>) {
      
      var res = ev.target?.result
      if (!res) {
        console.error("Error resizing image");
        return;
      }

      // blob stuff
      var blob = new Blob([res]); // create blob...
      window.URL = window.URL || window.webkitURL;
      var blobURL:string = window.URL.createObjectURL(blob); // and get it's URL
      
      // helper Image object
      var image:HTMLImageElement = new Image();
      image.src = blobURL;

      image.onload = function() {
        
        // have to wait till it's loaded
        var resized = resizeMe(image); // send it to canvas
        
        if (!resized) {
          console.error("Error resizing image");
        }
        else {
          console.log("resized image", resized);
          return resized;
        }
      }
    };
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
      track.thumbnail = displayThumbnail;
    }
  };

  //Function updating display thumbail picture in modal
  async function updateDisplayThumbnail(file: File){
    var base64result:any;

    /* This is returning a compressed base 64 image of <= 1024 x 1024
    * However it will not correctly display when I attempt to attach it to the model
    * 
    * var compressedBase64:any = compressImage(file); 
    */

    await convertToBase64(file).then(res => {
        base64result = res;
        console.log("base64", base64result);
    })

    var updatedPost = {
        id: track.id,
        token: jwt,
        thumbnail: base64result
    };
    setDisplayThumbnail(updatedPost.thumbnail);
  }

  // ============================= Functions for Like System =============================
  // Checks for user like
  function checkLike() {

    let newLike = {
      userID: user.userId,
      postID: track.id,
      token: jwt,
    }
    
    var check = false;
    sendAPI("get", "/likes/getUserLike", newLike).then((res) => {
      if (res.status == 200) {
        setFavorited(true);
        check = true;
      }
      else{
        console.log("no like");
        setFavorited(false);
        check = false;
      }
    })
  }

  function incrementLike() {

    return new Promise((resolve, reject) => {
      var didSucceed = true;

      var newLikes:number = likeCount + 1;
      setLikeCount(newLikes);
      setFavorited(true);

      didSucceed? resolve(newLikes): reject('Error');
    })
  }

  // Creates a new like
  function addLike() {

      let newLike = {
        userID: user.userId,
        postID: track.id,
        token: jwt,
      }
      
      sendAPI("post", "/likes/createUserLike", newLike).then((res) => {
        if (res.status == 201) {
          setErrMsg(track.title);
  
          // Increments local likeCount
          // setLikeCount(likeCount + 1);
          // incrementLike().then(() => updateLikes(likeCount));

          incrementLike().then(() => incrementLike()).then(newLikes => {updateLikes(newLikes); return true;}).catch(err => console.log("There was an error: " + err));
          setFavorited(true);

        }
        else {
          setErrMsg("Could not like post.");
          setSuccessMsg("");
        }
      }) 
  }

  function decrementLike() {

    return new Promise((resolve, reject) => {
      if(likeCount > 0){
        var didSucceed = (likeCount > 0);

        var newLikes:number = likeCount - 1;
        setLikeCount(newLikes);
        setFavorited(false);

        didSucceed? resolve(newLikes): reject('Error');
      }
    })
  }

  // Removes a new like
  function removeLike() {


      let newLike = {
        userID: user.userId,
        postID: track.id,
        token: jwt,
      }
        
      sendAPI("delete", "/likes/removeUserLike", newLike).then((res) => {
        if (res.status == 200) {
          setErrMsg(track.title);
          setSuccessMsg(JSON.stringify(res.data));
          
          // Decrements local likeCount
          // decrementLike().then(() => updateLikes(likeCount));
          decrementLike().then(newLikes => decrementLike()).then(newLikes => {updateLikes(newLikes); return true;}).catch(err => console.log("There was an error: " + err));
          setFavorited(false);
        }
        else {
          setErrMsg("Could not like post.");
          setSuccessMsg("");
        }
      })

    // console.log("like count: " + likeCount);
    // updateLikes(likeCount);
    


  }

  // Function updating track likes
  function updateLikes(likes:any) {

    if (jwt == null || user == null) navigate("/login");

    let updatedTrack = {
      id: track.id,
      title: track.title,
      midi: track.midi,
      thumbnail: track.thumbnail,
      likeCount: likes,
      public: track.public,
      token: jwt,
    }
    
    sendAPI("put", "/posts/updatePost", updatedTrack).then((res) => {
      if (res.status == 200) {
        setErrMsg(trackName);
      }
      else {
        setErrMsg("Could not save post.");
        setSuccessMsg("");
      }
    })

    track.likeCount = likes;
  }

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container-header' closeButton>
          </Modal.Header>
          <Modal.Body className='modal-container-body'>
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
                <FontAwesomeIcon className='modal-track-icons' icon={faHeart} />
                {likeCount} Favorites
              </h5>
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container-footer'>
            <div id='modal-container-footer-1'>
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
            <div id='modal-container-footer-2'>


              {!favorited && <button className='btn btn-secondary modal-btn' id='like-track-btn' onClick={() => {addLike()}}>
                <FontAwesomeIcon className='modal-track-icons' icon={["far", "heart"]} />
                Favorite
              </button>}
              {favorited && <button className='btn btn-secondary modal-btn' id='dislike-track-btn' onClick={() => {removeLike()}}>
                <FontAwesomeIcon className='modal-track-icons' id='favorited-heart' icon={faHeart} />
                Favorited
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