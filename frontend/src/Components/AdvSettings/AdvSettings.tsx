import React, { useState, useEffect, useCallback } from 'react';
// import {userJWT, userModeState} from '../context/GlobalState'
import './AdvSettings.css';

const AdvSettings = () => {
    return (
        <div className='container' id='main-container'>
        <h1 className='heading'>Advanced Music Settings</h1>
        <form className='justify-content-center adv-settings-container'>
            <h2 id='settings-text'>Instruments</h2>
            
            <div className='row instruments-div'>
               <div className='col instrument-box'>
                    <label htmlFor="instrument1">Instrument 1:</label>
                    <select className="dropdowns" name="instrument1" id="instrument1-options">
                        <option value="instrument-example">  </option>
                        <option value="instrument-example">instrument example</option>
                    </select>
                    <br></br>
                    <label htmlFor="instrument1-note">Instrument 1 Note Type:</label>
                    <select className="dropdowns" name="instrument1-note" id="instrument1-notes">
                        <option value="instrument-example">  </option>
                        <option value="instrument-note">instrument note</option>
                    </select>
               </div>
               <div className='col instrument-box'>
                    <label htmlFor="instrument2">Instrument 2:</label>
                    <select className="dropdowns" name="instrument2" id="instrument2-options">
                        <option value="instrument-example">  </option>
                        <option value="instrument-example">instrument example</option>
                    </select>
                    <br></br>
                    <label htmlFor="instrument2-note">Instrument 2 Note Type:</label>
                    <select className="dropdowns" name="instrument2-note" id="instrument2-notes">
                        <option value="instrument-example">  </option>
                        <option value="instrument-note">instrument note</option>
                    </select>
               </div>
               <div className='col instrument-box'>
                    <label htmlFor="instrument3">Instrument 3:</label>
                    <select className="dropdowns" name="instrument3" id="instrument3-options">
                        <option value="instrument-example">  </option>
                        <option value="instrument-example">instrument example</option>
                    </select>
                    <br></br>
                    <label htmlFor="instrument3-note">Instrument 3 Note Type:</label>
                    <select className="dropdowns" name="instrument3-note" id="instrument3-notes">
                        <option value="instrument-example">  </option>
                        <option value="instrument-note">instrument note</option>
                    </select>
               </div>
               <div className='col instrument-box'>
                    <label htmlFor="instrument4">Instrument 4:</label>
                    <select className="dropdowns" name="instrument4" id="instrument4-options">
                        <option value="instrument-example">  </option>
                        <option value="instrument-example">instrument example</option>
                    </select>
                    <br></br>
                    <label htmlFor="instrument4-note">Instrument 4 Note Type:</label>
                    <select className="dropdowns" name="instrument4-note" id="instrument4-notes">
                        <option value="instrument-example">  </option>
                        <option value="instrument-note">instrument note</option>
                    </select>
               </div>
            </div>
        </form>
        <br></br>
        <form className='justify-content-center adv-settings-container'>
            <h2 id='settings-text'>Other</h2>
            <div className='row instruments-div'>
                <div className='col instrument-box-other'>
                        <label htmlFor="octave">Number of Octaves:</label>
                        <select className="dropdowns2" name="octave" id="octave-option">
                            <option value="octave-example">  </option>
                            <option value="octave-example1">octave example</option>
                        </select>
                </div>
                <div className='col instrument-box-other'>
                    <label htmlFor="tempo">Tempo:</label>
                    <select className="dropdowns2" name="tempo" id="tempo-option">
                        <option value="tempo-example">  </option>
                        <option value="tempo-example1">tempo example</option>
                    </select>
                </div>
                <div className='col instrument-box-other'>
                    <label htmlFor="key-signature">Key Signature:</label>
                    <select className="dropdowns2" name="key-signature" id="key-signature-option">
                        <option value="key-signature-example">  </option>
                        <option value="key-signature-example1">key signature example</option>
                    </select>
                </div>
                <div className='col instrument-box-other'>
                    <label htmlFor="scale">Scale:</label>
                    <select className="dropdowns2" name="scale" id="scale-option">
                        <option value="scale-example">  </option>
                        <option value="scale-example1">scale example</option>
                    </select>
                </div>
            </div>
        </form>
        <br></br>
        <div className='form-group row justify-content-center'>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" id='back-btn-adv'>Back</button>
                <br />
                <button type="button" className="btn btn-primary" id='next-btn'>Next</button>
            </div>
        </div>

    </div>);
}

export default AdvSettings;