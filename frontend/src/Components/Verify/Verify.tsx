import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { ReactHTMLElement } from "react";
import sendAPI from '../../SendAPI'
import { wait } from "@testing-library/user-event/dist/utils";

const Verify = () => {
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    function parseToken() {
        let url = window.location.href;
        return url.split("=")[1];
    }

    

    async function doValidate() {

        let token = parseToken(); 

        if (token == undefined || token == null) {
            setErrMsg("Invalid userID");
            setSuccessMsg("");
            navigate("/");
            return;
        }

        setSuccessMsg("Your account has been validated!");
        await wait(5);

        navigate("/profile");

    }
    
    
    return (<div>
        <button onClick={() => doValidate()}>Validate</button>
        <span>{successMsg}</span>
        <span>{errMsg}</span>
    </div>);
}

export default Verify;