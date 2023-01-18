import './Profile.css'

import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";
import sendAPI from '../../SendAPI';
import { useState } from 'react';
import TrackCard from '../TrackCard/TrackCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Profile = () => {
    const [user, setUser] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);
    const [playlist, setPlaylist] = useState([]); 
    const [posts, setPosts] = useState([])

    var userTracks = [
        {songTitle: 'New Song', songImage: ''},
        {songTitle: 'Old Song', songImage: ''}
    ]
    function updateProfilePic(file:any) {
        var reader = new FileReader();
        var baseString;
        reader.onloadend = function () {
            baseString = reader.result;
            var updatedUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                bio: user.bio,
                token: jwt,
                profilePicture: baseString
            };
            console.log(updatedUser);
            updatedUser.profilePicture = baseString;
            sendAPI('put', '/users/updateUser', updatedUser)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
        };
        reader.readAsDataURL(file);
    }

    return(
        <div className="user-profile">
            <div id='profile-top-container'>
            <img src={user.profilePicture} alt="userImage" className='sticky' id='profile-image' onClick={() => {}}/>
                <div id='profile-top-name-div'>
                    {/* <img src={user.profilePicture} alt="userImage" id='profile-image' onClick={() => {}}/> */}
                    <h1 id='profile-name'>{user.firstName} {user.lastName}</h1>
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
            <input id="file-upload" onChange={event=> {if(!event.target.files) {return} else {updateProfilePic(event.target.files[0])}}} type="file"/>
            <hr></hr>
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