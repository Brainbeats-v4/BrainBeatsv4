/*  Signing up is simple, this component just uses a regex to determine a valid email for sign up and sends it to the backend,
    it also calls a function to send a verification email to a user based on the email, which is also handled in the backend.
    We currently only use the username for display, the sign in only has functionality for email, this can easily be changed
    but we found that usernames for our website weren't particularly practical other than giving users an identifiable tag for
    the social aspects of BrainBeats.  */
import  {useState} from "react";
import {useNavigate} from "react-router-dom";
import sendAPI from "../../SendAPI";
import './SignUp.css';
import defaultProfilePic from '../../images/bbmascot1.png'

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    /*  The validate email function just runs a regex on the email that checks for something@something.something. As of right 
        now it has an issue detecting emails  that follow the format of email@prefix.suffix.com (i.e myname@knights.ucf.edu), which 
        is something to take note of. */
    function validateEmail(email:String) {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]*$/;
        if (email.match(emailRegex)) return true;
        return false;
    }

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
            // console.log(res);
        }).catch((err) => {
            console.error(err);
        })
        return false;
    }
    
    function convertToBase64(file:string) {
        return new Promise((resolve, reject) => {
            var fileBlob = new Blob([file], {
                type: 'text/plain'
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileBlob);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    async function doSignUp() {
        var base64result;
        await convertToBase64(defaultProfilePic).then(res => {
            base64result = res;
        })
        // console.log(base64result);
        const userInformation = {
            "email": email,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "profilePicture": base64result,
            "posts": [],
            "playlists": [],
            "likes": [],
        };

        if(validateFields()) {
            // continue register
            await sendAPI('post', '/users/createUser', userInformation)
                .then(res => {
                    setSuccessMsg('Account created successfully, you will shortly be redirected.');
                    setErrorMsg('');
                    // console.log(res);
                    
                    sendValidationEmail(userInformation);
                    navigate("/login");

                }).catch(err => {
                    console.log(err);
                    if(err.response.data.msg.includes('Email or username already exists')) {
                        setErrorMsg('Unable to create account, user already exists under this email or username')
                    }
                    else {
                        setErrorMsg('Unable to create account');
                    }
                })
        }
    }

    return (
        <div className='container' id='main-signup-container'>
            <div className="container" id="signup-container">
                <div className="bbLogo"></div>
                <h1 className="text-center fw-semibold signup-text" id='signup-title'>Welcome to BrainBeats!</h1>
                <div className="mt-3">
                    <label className="form-label signup-text">Email</label>
                    <input type="text" className="form-control formGroupExampleInput" placeholder="Email@example.com" onChange={event => setEmail(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Username</label>
                    <input type="text" className="form-control formGroupExampleInput" placeholder="Username" onChange={event => setUsername(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Password</label>
                    <input type="password" className="form-control formGroupExampleInput" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">First Name</label>
                    <input type="text" className="form-control formGroupExampleInput" placeholder="First Name" onChange={event => setFirstName(event.target.value)}/>
                </div>
                <div className="mt-2">
                    <label className="form-label signup-text">Last Name</label>
                    <input type="text" className="form-control formGroupExampleInput2" placeholder="Last Name" onChange={event => setLastName(event.target.value)}/>
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