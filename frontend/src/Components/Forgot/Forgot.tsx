import {useState} from "react";
// import '../Login/Login.css';
import './Forgot.css';
import sendAPI from '../../SendAPI';
import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
// import { userJWT, userModeState } from "../../JWT";

const Forgot = () => {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    async function doForgot() {
        const userInformation = {
            "email": email
        }

        sendAPI('post', '/users/forgotPassword', userInformation)
            .then(res => {
                // setJWT(res.data.token);
                // setUserMode(res.data.user);
                navigate('/login');
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='container' id='main-login-container'>
            <div className='container' id='login-container'>
                <div className="bbLogo"></div>
                <h1 className="login-text text-center fw-semibold">Enter the email <br/> associated with <br/> your account</h1>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="example@example.com" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className='container' id='login-btn-container'>
                    <button type="submit" className="btn btn-primary" id='login-btn' onClick={doForgot}>Send password recovery email</button>
                </div>
            </div>
            <div className='container' id='create-account-container'>
                <a id='sign-up-link' href='/login'>Return to login page</a>
            </div>
        </div>);
}

export default Forgot;

// router.post('/forgotPassword', async (req, res) => {
//     try {
//         const { email } = req.body;