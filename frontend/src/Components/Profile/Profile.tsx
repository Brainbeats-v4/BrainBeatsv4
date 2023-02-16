import './Profile.css'
import profileImage from '../../../images/blankProfile.png'

import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";
import sendAPI from '../../SendAPI';
import react, { useState } from 'react';
import TrackCard from '../TrackCard/TrackCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import buildPath from '../../util/ImagePath';
import { encode } from '../../util/ImageHelperFunctions';

const Profile = () => {
    const [user, setUser] = useRecoilState(userModeState);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);
    const [playlist, setPlaylist] = useState([]); 
    const [posts, setPosts] = useState([])

    // For displaying profile picture
    const [displayPicture, setDisplayPicture] = useState(user!==null ? user.profilePicture: undefined);
    if(displayPicture !== undefined) {

        // Logic for display image from Uint8Array 
        // var bytes = new Uint8Array(displayPicture);
        // var imageString = 'data:image/png;base64,'+ encode(bytes);
        // setDisplayPicture(imageString);

        if ((displayPicture as string).split('/')[0] === 'data:text') {
            console.log(displayPicture);
            var encodedProfilePic = (displayPicture as string).split(',')[1];
            var decodedProfilePic = Buffer.from(encodedProfilePic, 'base64').toString('ascii');
            setDisplayPicture(buildPath(decodedProfilePic));
        }
    }

    // Toggle edit profile
    const[editProfile, updateEditProfile] = react.useState(false);
    const toggleEdit = () => updateEditProfile(!editProfile);

    const [profileFirstName, setProfileFirstName] = useState(user.firstName);
    const [profileLastName, setProfileLastName] = useState(user.lastName);

    // Toggle My Tracks and Playlists display
    const[playlistsOpen, updatePlaylistsOpen] = react.useState(false);
    const toggleTab = () => updatePlaylistsOpen(!playlistsOpen);

    // var encodedProfilePic = user.profilePicture;

    // encodedProfilePic = (encodedProfilePic as string).split(',')[1];
    // var testStr = 'data:image/png;base64,' + user.profilePicture
    // var decodedProfilePic = Buffer.from(encodedProfilePic, 'base64').toString('ascii');
    // var userProfilePic = buildPath(decodedProfilePic)
    //console.log(decodedProfilePic)

    var userTracks = [
        {songTitle: 'New Song', songImage: ''},
        {songTitle: 'Old Song', songImage: ''}
    ]

    function convertToBase64(file:File) {

        // const fileReader = new FileReader();

        // fileReader.readAsDataURL(file);


        
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

    // Function updating profile picture
    async function updateProfilePic(file:File) {
        var base64result:any;
        var blobResult:any;
        await convertToBase64(file).then(res => {
            base64result = res;
        })
        console.log(base64result);
        
        
        blobResult = await file.arrayBuffer();

        console.log(blobResult);

        var updatedUser = {
            id: user.userId,
            token: jwt,
            profilePicture: base64result
        };
        console.log(updatedUser);
        sendAPI('put', '/images/updateUserProfilePic', updatedUser)
            .then(res => {
                setDisplayPicture(base64result);
                console.log(res);
                var updatedUser = {
                    userId: res.data.updateUser.id,
                    bio: res.data.updateUser.bio,
                    firstName: res.data.updateUser.firstName,
                    lastName: res.data.updateUser.lastName,
                    profilePicture: res.data.updateUser.profilePicture
                }
                setUser(updatedUser);
            }).catch(err => {
                console.log(err);
            })
    };

    //  // Function updating profile picture
    async function updateProfileName(newFName: String, newLName: String) {

        console.log(user.userId);

        var updatedUser = {
            id: user.userId,
            firstName: newFName,
            lastName: newLName,
            email: user.email,
            bio: user.bio,
            token: jwt,
            profilePicture: user.profilePicture
        };
        console.log(updatedUser);
        sendAPI('put', '/users/updateUser', updatedUser)
            .then(res => {
                console.log(res);
                var updatedUser = {
                    userId: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    bio: res.data.bio,
                    profilePicture: res.data.profilePicture,
                    username: user.username
                }
                setUser(updatedUser);
                console.log(updatedUser);

            }).catch(err => {
                console.log(err);
            })

            console.log(user.firstName);
    };

    return(
        <div className="user-profile" id='profile-container'>
            <div id='profile-top-container'>
                    <div id="select-profile-image-div">
                    <div id="profile-image-div">
                        <img src={displayPicture} alt="userImage" className='sticky' id='profile-image' onClick={() => {}}/>        
                        <div id='profile-file-upload-div' style={{display: editProfile?"block" : "none"}}>
                            <label id="profile-file-upload-label" htmlFor="profileInputTag">
                                Select Profile Image:
                            </label>
                            <input id="profile-file-upload" onChange={event=> {if(!event.target.files) {return} else {updateProfilePic(event.target.files[0])}}} name="image" type="file" accept='.jpeg, .png, .jpg'/>
                        </div>
                    </div>
                </div>

                <div id='profile-top-name-div'>
                    <div id='edit-profile-div'>
                        {!editProfile && <button type="button" className="btn btn-secondary" id='edit-profile-btn' onClick={toggleEdit}> 
                            <FontAwesomeIcon icon={["fas", "edit"]} />
                            Edit Profile
                        </button>}
                        {editProfile && <button type="button" className="btn btn-secondary" id='edit-profile-btn' onClick={() => {toggleEdit(); updateProfileName(profileFirstName, profileLastName);}}> 
                            <FontAwesomeIcon icon={["fas", "floppy-disk"]} />
                            Save Profile
                        </button>}
                    </div>
                    <div id='user-info-div'>
                        <div id='user-profile-name-div'>
                            {!editProfile && <h1 id='profile-name'>{user.firstName} {user.lastName}</h1>}
                            {editProfile && <input type="text" id='user-firstName' defaultValue={user.firstName} onChange={(e) => setProfileFirstName(e.target.value)}></input>}
                            {editProfile && <input type="text" id='user-lastName' defaultValue={user.lastName} onChange={(e) => setProfileLastName(e.target.value)}></input>}
                        </div>
                        <h5 id='user-name'>@ {user.username}</h5>
                    </div>
                </div>

                <div id='profile-top-follower-div'>
                    <div id='count-all-div'>
                        <div className='count-div' id='playlist-count-div'>
                            <h5>0</h5>
                            <h6>Playlists</h6>
                        </div>
                        <div className='count-div' id='following-count-div'>
                            <h5>0</h5>
                            <h6>Following</h6>
                        </div>
                        <div className='count-div' id='follower-count-div'>
                            <h5>0</h5>
                            <h6>Follower</h6>
                        </div>
                    </div>
                </div>

                <div id='profile-top-tabs-div'>
                    <button type="button" className="btn btn-secondary" id='tracks-btn' onClick={toggleTab}
                    style={{backgroundColor: !playlistsOpen? "rgb(83, 83, 83) ": "rgba(100, 100, 100, 1)"}}>
                        <div id='tracks-btn-text'>
                            <FontAwesomeIcon icon={["fas", "music"]} />
                            My Tracks
                        </div>
                        <div id='tracks-btn-line' style={{display: playlistsOpen? "none" : "block"}}>
                        </div>
                    </button>
                    <button type="button" className="btn btn-secondary" id='playlists-btn' onClick={toggleTab} 
                    style={{backgroundColor: playlistsOpen? "rgb(83, 83, 83)": "rgba(100, 100, 100, 1)"}}>
                        <div id='playlists-btn-text'>
                            <FontAwesomeIcon icon={["fas", "list"]} />
                            Playlists
                        </div>
                        <div id='playlists-btn-line' style={{display: playlistsOpen? "block" : "none"}}>
                        </div>
                    </button>
                </div>
            </div>
            {/* Displays when My Tracks tab selected */}
            <div id='profile-bottom-container' style={{display: playlistsOpen? "none" : "block"}}>
                <h1>My Tracks</h1>
                <hr></hr>
                <TrackCard cardType={'Profile'} input={user.userId} />
                {/* <div>
                    <ul>
                        {
                            userTracks.map(function(userTrack, index) {
                                return(
                                <li key={index}>
                                    {userTrack.songTitle}
                                </li>);
                            })
                        }
                    </ul>
                </div> */}
            </div>

            {/* Displays when Playlists tab selected */}
            <div id='profile-bottom-container' style={{display: playlistsOpen? "block" : "none"}}>
                <h1>My Playlist</h1>
                <hr></hr>
                {/* <TrackCard cardType={'Profile'} input={user.userId} /> */}
                {/* <div>
                    <ul>
                        {
                            userTracks.map(function(userTrack, index) {
                                return(
                                <li key={index}>
                                    {userTrack.songTitle}
                                </li>);
                            })
                        }
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default Profile;