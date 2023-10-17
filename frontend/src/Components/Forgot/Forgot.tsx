import {useState} from "react";
// import '../Login/Login.css';
import './Forgot.css';
import sendAPI from '../../SendAPI';
// import validateEmail from "../../util/validateEmail";
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
// import { userJWT, userModeState } from "../../JWT";

const Forgot = () => {

    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    async function doForgot() {
        const userInformation = {
            "email": email
        }

        // if (!validateEmail(email)){
        //     setErrorMsg("Invalid email.");
        //     setSuccessMsg("");
        //     return;
        // }

        setSuccessMsg("Recovery link sent! \n Please allow at least 5 minutes to recieve the email before trying again.");
        setErrorMsg("");

        sendAPI('post', '/users/forgotPassword', userInformation)
            .then(res => {
                // setJWT(res.data.token);
                // setUserMode(res.data.user);
                
                navigate("/login");
            }).catch(err => {
                setErrorMsg("Failed to send password recovery email, please try again later.");
                setSuccessMsg("");
                // navigate("/login");
                console.error(err);
            })
    }

    return (
        <div className='container' id='main-login-container'>
            <div className='container' id='login-container'>
                <div className="bbLogo"></div>
                <h1 className="login-text text-center fw-semibold">Forgot Password?</h1>
                <p>Enter the email associated with your account.</p>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="example@example.com" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className='container' id='login-btn-container'>
                    <button type="submit" className="btn btn-primary" id='login-btn' onClick={doForgot}>Send password recovery link</button>
                </div>
                <span className="text-center error-msg">{errorMsg}</span>
                <span className="text-center success-msg">{successMsg}</span>
            </div>
            <div className='container' id='create-account-container'>
                <a id='sign-up-link' href='/login'>Return to login page</a>
            </div>
        </div>);
}

export default Forgot;
