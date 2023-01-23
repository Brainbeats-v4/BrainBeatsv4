import './Profile.css'

import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";
import sendAPI from '../../SendAPI';
import { useState } from 'react';
import TrackCard from '../TrackCard/TrackCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';
import buildPath from '../../util/ImagePath';

const Profile = () => {
    const [user, setUser] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);
    const [playlist, setPlaylist] = useState([]); 
    const [posts, setPosts] = useState([])
    var encodedProfilePic = user.profilePicture;
    console.log(encodedProfilePic)
    encodedProfilePic = (encodedProfilePic as string).split(',')[1];
    var testStr = 'data:image/png;base64,' + user.profilePicture
    var decodedProfilePic = Buffer.from(encodedProfilePic, 'base64').toString('ascii');
    var userProfilePic = buildPath(decodedProfilePic)
    //console.log(decodedProfilePic)
    var userTracks = [
        {songTitle: 'New Song', songImage: ''},
        {songTitle: 'Old Song', songImage: ''}
    ]

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

    async function updateProfilePic(file:File) {
        var base64result;
        await convertToBase64(file).then(res => {
            base64result = res;
        })
        console.log(base64result);
        var updatedUser = {
            id: user.userId,
            token: jwt,
            profilePicture: base64result
        };
        sendAPI('put', '/images/updateUserProfilePic', updatedUser)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    };

    return(
        <div className="user-profile">
            <div id='profile-top-container'>
            <img src={testStr} alt="userImage" className='sticky' id='profile-image' onClick={() => {}}/>
                <div id='profile-top-name-div'>
                    <h1 id='profile-name'>{user.firstName} {user.lastName}</h1>
                    <h2>{user.username}</h2>
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
                    <button type="button" className="btn btn-secondary" id='tracks-btn'>
                        <FontAwesomeIcon icon={["fas", "music"]} />
                        My Tracks
                    </button>
                    <button type="button" className="btn btn-secondary" id='playlists-btn'>
                        <FontAwesomeIcon icon={["fas", "list"]} />
                        Playlists
                    </button>
                </div>
            </div>
            <input id="file-upload" onChange={event=> {if(!event.target.files) {return} else {updateProfilePic(event.target.files[0])}}} name="image" type="file" accept='.jpeg, .png, .jpg'/>
            <hr></hr>
            <h1>My Tracks</h1>
            <TrackCard cardType={'Profile'} userId={user.userId} />
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
    )
}

export default Profile;