import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { ReactHTMLElement } from "react";
import sendAPI from '../../SendAPI'
import { wait } from "@testing-library/user-event/dist/utils";
import './SetupGuide.css'

import bluetoothScreenshot from '../../images/BluetoothConnection.png';

function SetupGuide() {
    function closeTab() {
        window.opener = null;
        window.open("", "_self");
        window.close();
    };

    return (
    <div className="setup">
        <div className="setupDiv">
            <div className="setupHeader">
                <h1>Headset Setup Guide:</h1>
                <p>Depending on your board, you will have different setup options, listed below are the devices we support and the
                    setup for each of them.
                </p>
            </div>
            <h2 className="cyton-heading">Cyton Board</h2>
            <p>The cyton board from OpenBCI supports 8 channels of input, if you are looking to see how to set up the wiring for the board,
                reference the link to their website, which can be found <a className="links" href="https://docs.openbci.com/GettingStarted/Boards/CytonGS/" target="_blank">here.</a>
                <br />To set the device up to your head, you can use any of the nodes you desire, but our recommended nodes are here: <br />
                <ul className="positionsList">
                    <li>FPZ: Frontal Lobe</li>
                    <li>FT8: Frontal-Temporal (Between the Frontal and Temporal Lobes)</li>
                    <li>T7: Left Temporal Lobe</li>
                    <li>T8: Right Temporal Lobe</li>
                    <li>P7: Left Parietal Lobe</li>
                    <li>P8: Right Parietal Lobe</li>
                    <li>O1: Left Occipital Lobe</li>
                    <li>O2: Right Occipital Lobe</li>
                </ul>
                Highlighted below are these node locations:<br />
                <img className="img" src='/systemReference.png' alt="systemreference" /> <br />
    
                Once you have your device setup and plugged into your computer, simply turn the power switch on to the USB setting and hit record, you should see a
                bluetooth option display on your screen. It should look like this: <br />
                <br></br>
                <img className="img" src={bluetoothScreenshot} alt="bluetooth reference" /> <br />
                Finally, connect your device and begin recording.
            </p>
            <button className="acceptBtn" onClick={closeTab}>I understand, take me back</button>
        </div>
        
    </div>);
}

export default SetupGuide;