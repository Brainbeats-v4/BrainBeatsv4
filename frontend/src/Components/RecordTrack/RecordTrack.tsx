import './RecordTrack.css';

const RecordTrack = () => {

    return (
        <div className='container' id='main-container'>
            <h2 className='record-heading'>Record Music</h2>
            <h5 className='record-heading'>Add cards to influence brain waves:</h5>

            <div id='record-container'>
                <div id='record-card-info-div'>
                    <div id='card-settings-div'>
                       <h6 className='record-heading'>Card Settings</h6>
                       <div id='record-uploads-div'>
                            <label className='record-heading' htmlFor="file-upload">Upload Image:</label>
                            <div className='record-upload'>
                                <input type="file" id="file-upload" />
                            </div>
                            <label className='record-heading' htmlFor="file-upload">Background Color:</label>
                            <div className='record-upload'>
                                <input type="file" id="file-upload" />
                            </div>
                            <label className='record-heading' htmlFor="file-upload">Text Color:</label>
                            <div className='record-upload'>
                                <input type="file" id="file-upload" />
                            </div>
                            <label className='record-heading' htmlFor="file-upload">Number of Times</label>
                                <label className='record-heading' htmlFor="file-upload">Card Displayed:</label>
                            <div className='record-upload'>
                                <input type="file" id="file-upload" />
                            </div>
                       </div>
                       <button type="button" className="btn btn-secondary" id='add-card-btn'>Add Card</button>
                    </div>
                    <div id='display-card-div'>
                        <div id='card-display'>Card Display</div>
                    </div>
                </div>
                <div id='record-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='skip-step-btn'>Skip This Step</button>
                    <button type="button" className="btn btn-secondary" id='go-record-btn'>Go to Record</button>
                </div>
            </div>            
        </div>);
}

export default RecordTrack;