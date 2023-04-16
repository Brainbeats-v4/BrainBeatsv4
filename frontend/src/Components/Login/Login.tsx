import {useState} from "react";
import './Login.css';
import sendAPI from '../../SendAPI';
import { useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [JWT, setJWT] = useRecoilState(userJWT);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    async function doLogin() {
        const userInformation = {
            "email": email, 
            "password": password
        }

        sendAPI('post', '/users/loginUser', userInformation)
            .then(res => {
                // console.log(res.data.user)
                setJWT(res.data.token);
                setUserMode(res.data.user);
                navigate('/profile');
                setErrorMsg("");
            }).catch(err => {
                console.log(err);
                setErrorMsg("Incorrect email and password combination.")
            })
    }

    return (
        <div className='container' id='main-login-container'>
            <div className='container' id='login-container'>
                <div className="bbLogo"></div>
                <h1 className="login-text text-center fw-semibold" id='login-title'>Log in to BrainBeats</h1>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Email</label>
                    <input type="text" className="form-control formGroupExampleInput" placeholder="Email@example.com" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Password</label>
                    <input type="password" className="form-control formGroupExampleInput2" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <a id='forgot-pass-link' href='/forgot'>Forgot Password?</a>
                <div className='container' id='login-btn-container'>
                    <button type="submit" className="btn btn-primary" id='login-btn' onClick={doLogin}>Log in</button>
                </div>
                <div id="error-msg-container">
                    <span className="text-center error-msg">{errorMsg}</span>
                    <span className="text-center success-msg">{successMsg}</span>
                </div>
            </div>
            <div className='container' id='create-account-container'>
                <a >Don't have an account?</a><a id='sign-up-link' href='/register'>Sign Up</a>
            </div>
        </div>
    );
}

export default Login;