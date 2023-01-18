import { wait } from "@testing-library/user-event/dist/utils";
import { userInfo } from "os";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import sendAPI from "../../SendAPI";
import validateEmail from "../../util/validateEmail";
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    function validateFields() {
        if(!username || !password || !firstName || !lastName || !email) {
            setErrorMsg('Please fill out all the input fields and try again.');
            return false;
        }
        if(!validateEmail(email)) {
            setErrorMsg('Invalid email input, please re-enter and try again.');
            return false;
        }
        return true;
    }

    async function sendValidationEmail(userInformation: any) {
        const userData = {
            "email": userInformation.email,
            "subject": "BrainBeats account verification for " + userInformation.firstName + " " + userInformation.lastName + "."
        }
        await sendAPI("post", "/authentication/sendVerificationEmail", userData).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        return false;
    }
    
    async function doSignUp() {
        const userInformation = {
            "email": email,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        };

        if(validateFields()) {
            // continue register
            await sendAPI('post', '/users/createUser', userInformation)
                .then(res => {
                    setSuccessMsg('Account created successfully, you will shortly be redirected.');
                    setErrorMsg('');
                    console.log(res);
                    
                    sendValidationEmail(userInformation);
                    navigate("/login");

                }).catch(err => {
                    setErrorMsg('Unable to create account');
                    console.log(err);
                })
        }
    }

    return (
        <div className='container' id='main-signup-container'>
            <div className="container" id="signup-container">
                <h1 className="text-center fw-semibold signup-text">Welcome to BrainBeats!</h1>
                <div className="mt-3">
                    <label className="form-label signup-text">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="email@example.com" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Username</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="brainbeats407" onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput" placeholder="something secret" onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">First Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Rick" onChange={event => setFirstName(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Last Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Leinecker" onChange={event => setLastName(event.target.value)}/>
                </div>
                <div className='container' id='signup-btn-container'>
                    <button type="submit" className="btn btn-primary" id='signup-btn' onClick={() => doSignUp()}>Sign up</button>
                </div>
                <div id="error-msg-container">
                    <span className="text-center error-msg">{errorMsg}</span>
                    <span className="text-center success-msg">{successMsg}</span>
                </div>
            </div>
            <div className='container' id='have-account-container'>
                <a>Have an account?</a><a id='login-link' href='/login'>Log in!</a>
            </div>
        </div>);
}

export default SignUp;