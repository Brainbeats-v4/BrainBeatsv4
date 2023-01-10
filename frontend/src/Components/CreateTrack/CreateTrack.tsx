import { Form, Router } from 'react-router-dom';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateTrack.css';

const CreateTrack = () => {

    const [generationType, setGenerationType] = useState('slowAndMelodic');

    const press = function (btn: string) {
        setGenerationType(btn);
    }

    // For routing to advanced settings page.
    const navigate = useNavigate();

    // Api call for featured tracks
    const doNavigate = (route:string) => {
        navigate(route);
    }
    

    return (
        <div className='container' id='main-container'>
            <h1 className='heading'>Music Settings</h1>
            <form className='justify-content-center' id='settings-container1'>
                <h2 id='settings-text'>Basic Settings</h2>
                <p id='settings-text'>Please select one of the following music generation options:</p>
                {/* <span className="text-center" id='state'>{generationType}</span> */}
                
                <div className='row' id='checkbox-div'>
                    <div className='justify-content-center' id="setting-options-div">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="slowAndMelodic" onClick={() => setGenerationType('slowAndMelodic')} defaultChecked/>
                            <label className="form-check-label" htmlFor="inlineRadio1"><span>Slow and Melodic</span></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="moderateAndTimely" onClick={() => setGenerationType('moderateAndTimely')}/>
                            <label className="form-check-label" htmlFor="inlineRadio2"><span>Moderate and Timely</span></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="quickAndLively" onClick={() => setGenerationType('quickAndLively')}/>
                            <label className="form-check-label" htmlFor="inlineRadio3"><span>Quick and Lively</span></label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="fastAndFrenzied" onClick={() => setGenerationType('fastAndFrenzied')}/>
                            <label className="form-check-label" htmlFor="inlineRadio4"><span>Fast and Frenzied</span></label>
                        </div>
                    </div>
                </div>

                <div className='form-group row justify-content-center'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-secondary" id='back-btn' onClick={() => press('back pressed')}>Back</button>
                        <br />
                        <button type="button" className="btn btn-primary" id='next-btn' onClick={() => press('next pressed')}>Next</button>
                    </div>
                </div>
            </form>

            <br />
            <h2 id='OR'>OR</h2>
            <br />

            <form className='justify-content-center' id='settings-container2'>
                <h2 id='settings-text'>Advanced Settings</h2>
                <p id='settings-text'>Press the button below to go to advanced music generation settings:</p>

                <div className='form-group row justify-content-center'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" id='adv-btn' onClick={() => doNavigate('/adv-settings')}>Advanced Settings</button>
                    </div>
                </div>

            </form>

        </div>);
}

export default CreateTrack;