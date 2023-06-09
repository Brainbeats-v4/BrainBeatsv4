import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { ReactHTMLElement } from "react";
import sendAPI from '../../SendAPI'
import { wait } from "@testing-library/user-event/dist/utils";
import { userJWT, userModeState } from "../../JWT";
import { useRecoilState } from 'recoil';

import './Verify.css'

const Verify = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [user, setUser] = useRecoilState(userModeState);
    
    const navigate = useNavigate();

    function parseToken() {
        let url = window.location.href;
        return url.split("=")[1];
    }

    async function doValidate() {

        let token = parseToken(); 

        if (token === undefined || token === null) {
            setErrMsg("Invalid userID");
            setSuccessMsg("");
            navigate("/");
            return;
        }
        if(user) {
            sendAPI('post', '/verifyUser', {email: user.email})
        }
        setSuccessMsg("Your account has been validated!");
        await wait(5);

        navigate("/login");

    }

    return (
    <div id='verify-container'>
        <div id='verify-div'>
            <button type="submit" className="btn btn-primary" id='validate-btn' onClick={() => doValidate()}>Validate</button>
            <span>{successMsg}</span>
            <span>{errMsg}</span>
        </div>
    </div>);
}

export default Verify;