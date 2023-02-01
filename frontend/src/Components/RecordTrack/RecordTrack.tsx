import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './RecordTrack.css'

const RecordTrack = () => {

    // Toggles Record and Stop button when recording
    const [recordVisibility, setRecordVisibility] = useState(true);

    function setVisibilityButton() {
        setRecordVisibility(!recordVisibility);
    }

    return (
        <div className='container' id='record-track-container'>
            <h2 className='record-heading'>Recording Music</h2>
            <div>
                <div id='record-track-info-div'>
                    <div id='display-record-card-div'>
                        Displaying Cards:
                        <div id='card-display'>
                        </div>
                    </div>
                    <div className='record-btns-div'>
                        {recordVisibility && <button type="button" className="btn btn-secondary" id='recording-play-btn' onClick={setVisibilityButton}>
                            <FontAwesomeIcon icon={["fas", "circle"]} />
                            Record
                        </button>
                        }
                         {!recordVisibility && <button type="button" className="btn btn-secondary" id='recording-play-btn' onClick={setVisibilityButton}>
                            <FontAwesomeIcon icon={["fas", "square"]} />
                            Stop
                        </button>
                        }
                        
                        <button type="button" className="btn btn-secondary" id='recording-pause-btn'>
                            <FontAwesomeIcon icon={["fas", "pause"]} />
                            Pause
                        </button>
                    </div>
                </div>
                <div id='record-publish-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='record-cancel-btn'>Cancel</button>
                    <button type="button" className="btn btn-secondary" id='record-publish-btn'>Publish</button>
                </div>
            </div>          
        </div>);
}

export default RecordTrack;