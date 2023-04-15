import React, {useEffect, useState} from "react";
import sendAPI from "../../SendAPI";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => { 

    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();

    function passwordsMatch() {
        if (newPassword !== newPassword2)
        {
            setErrorMsg("Passwords do not match!");
            setSuccessMsg("");
            return false;
        }
        setErrorMsg("");
        return true;
    }

    async function changePassword() {

        const userData = {
            resetPasswordToken: parseToken(),
            newPassword
        }

        await sendAPI("put", "/users/reset", userData).then((res) => {
            // setErrorMsg("");
            // setSuccessMsg("");
            // console.log(res);
            navigate("/login");

        }).catch((err) => {
            setErrorMsg("Link expired.");
            setSuccessMsg("");
            console.error(err);
        })
    }

    function parseToken() {
        let url = window.location.href;
        return url.split("=")[1];
    }

    function doReset() {
        if (!passwordsMatch) return;
        console.log(parseToken());
        changePassword();
    }


    return (
        <div className='container' id='main-login-container'>
            <div className='container' id='login-container'>
                <div className="bbLogo"></div>
                <h1 className="login-text text-center fw-semibold">Reset your <br /> BrainBeats password</h1>
                <div className="mt-3">
                    <label className="form-label form-text login-text">New password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput" placeholder="New password" onChange={event => setNewPassword(event.target.value)}/>
                </div>
                <div className="mt-3">
                    <label className="form-label form-text login-text">Repeat new password</label>
                    <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="Repeat new password" onChange={event => setNewPassword2(event.target.value)}/>
                </div>
                <div className='container' id='login-btn-container'>
                    <button type="submit" className="btn btn-primary" id='login-btn' onClick={doReset}>Reset password</button>
                </div>
                <span className="text-center error-msg">{errorMsg}</span>
                <span className="text-center success-msg">{successMsg}</span>
            </div>
            {/* <div className='container' id='create-account-container'>
                <a >Don't have an account?</a><a id='sign-up-link' href='/register'>Sign Up</a>
            </div> */}
        </div>
    );
}

export default ResetPassword