import React, {useEffect, useState} from "react";
import sendAPI from "../../SendAPI";
import './SignUp.css';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    function validateFields() {
        if(!username || !password || !firstName || !lastName || !email) {
            setErrorMsg('Please fill out all the input fields and try again.');
            return false;
        }
        if(!validateEmail) return false;
        return true;
    }
    
    function validateEmail() {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])*$/;
        if (email.match(emailRegex)) return true;
        setErrorMsg('Invalid email input, please re-enter and try again.');
        return false;
    }
    
    function doSignUp() {
        const userInformation = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "username": username,
            "password": password
        };

        if(validateFields()) {
            // continue register
            sendAPI('post', '/users/createUser', userInformation)
                .then(res => {
                    setSuccessMsg('Account created successfully');
                    setErrorMsg('');
                    console.log(res);
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
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Email" onChange={event => setFirstName(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Username</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" onChange={event => setLastName(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Password</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Password" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Username</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Date of Birth (mm/dd/yyyy)</label>
                    <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="mm/dd/yyyy" onChange={event => setPassword(event.target.value)}/>
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
                <a>Have an account?</a><a id='login-link'>Log in!</a>
            </div>
        </div>);
}

export default SignUp;