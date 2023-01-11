import './Profile.css'

import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";
import sendAPI from '../../SendAPI';


const Profile = () => {
    const [user, setUser] = useRecoilState(userModeState);
    const jwt = useRecoilValue(userJWT);


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
            <div>
                <img src={user.profilePicture} alt="userImage" onClick={() => {}}/>
                <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <input id="file-upload" onChange={event=> {if(!event.target.files) {return} else {updateProfilePic(event.target.files[0])}}} type="file"/>
            <hr></hr>
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