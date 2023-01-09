import {useState} from "react";
import './Login.css';
import sendAPI from '../../SendAPI';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { userJWT, userModeState } from "../../JWT";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [JWT, setJWT] = useRecoilState(userJWT);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const navigate = useNavigate();

    //TODO
    async function doEmail() {
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)

        const msg = {
            to: 'bmrgich@gmail.com', // Change to your recipient
            from: 'brainbeatsucf@gmail.com', // Change to your verified sender
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        
        sgMail.send(msg).then(() => {
            console.log('Email sent')
        }).catch((error: String) => {
            console.error(error)
        })
    }

    
    async function doLogin() {
        const userInformation = {
            "email": email,
            "password": password
        }

        sendAPI('post', '/users/loginUser', userInformation)
            .then(res => {
                setJWT(res.data.token);
                setUserMode(res.data.user);
                navigate('/profile');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='container' id='main-login-container'>
            <div className='container' id='login-container'>
                <div className="bbLogo"></div>
                <h1 className="login-text text-center fw-semibold">Log in to BrainBeats</h1>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Username</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <a id='forgot-pass-link'>Forgot Password?</a>
                <div className='container' id='login-btn-container'>
                    <button type="submit" className="btn btn-primary" id='login-btn' onClick={doLogin}>Log in</button>
                    <button type="submit" className="btn btn-primary" id='email-btn' onClick={doEmail}>Log in</button>
                </div>
            </div>
            <div className='container' id='create-account-container'>
                <a>Don't have an account?</a><a id='sign-up-link'>Sign Up</a>
            </div>
        </div>
    );
}

export default Login;