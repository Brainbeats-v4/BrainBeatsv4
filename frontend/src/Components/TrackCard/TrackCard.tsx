import React from 'react';
import parse from 'html-react-parser';
import './TrackCard.css';

let getPopularTracks = (numTracks:number) => {
    // hit api for 'numTracks' tracks
    
    let objArray = [
        {"user":"leinecker", "title":"BrainBeats Track", "imageSrc": "https://blog.dozmia.com/content/images/2019/01/Portrait-The-Weeknd.jpg", "trackLink":"#"},
        {"user":"heinrich", "title":"bot", "imageSrc": "https://preview.redd.it/q12z8iajgqm01.jpg?auto=webp&s=910c47b3bf8b9458f88bcc13208b0175455dbb35","trackLink":"#"},
        {"user":"knightro", "title":"just another knight", "imageSrc": "https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png","trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"},
        {"user":"people", "title":"making music", "imageSrc": "", "trackLink":"#"}
    ];

    return objArray;
}

function redirectToTrack() {
    
    return;
}

function PopulateTrackCards() {
    const MAX_COLS:number = 4;
    const MAX_ROWS:number = 2;
    const POPULAR_TRACKS = getPopularTracks((MAX_ROWS * MAX_COLS));
    
    var gridArray:string[] = [];
    
    var currentTrackCounter:number = 0;
    let testArr = [];
    for(let i = 0; i < MAX_ROWS; i++){
        
        let populateStr:string = '<div className="row" id="track-row">';
        let defaultImage = 'https://cdn.discordapp.com/attachments/1022862908012634172/1028025868175540355/DALLE_2022-10-07_15.27.09_-_A_brain_listening_music_eyes_open_smiling_vector_art.png';
        
        for(let j = 0; j < MAX_COLS; j++) {
            let currentTrack = POPULAR_TRACKS[currentTrackCounter++];

            let image = currentTrack.imageSrc == "" ? defaultImage : JSON.stringify(currentTrack.imageSrc);
            let trackLink = JSON.stringify(currentTrack.trackLink);
            let title = JSON.stringify(currentTrack.title);
            let user = JSON.stringify(currentTrack.user);

            populateStr += '<div className="col" id="track-col">'
                            + '<div className="card" href="' + trackLink +'">'
                                + '<img src=' + image + ' className="card-img-top" id="card-img-ID" alt="..."/> '
                                + '<div className="card-body">'
                                    + '<h5 className="card-title">' + title.replace(/\"/g, "") + '</h5>'
                                    + '<p className="card-text">' + 'By ' + user.replace(/\"/g, "") + '</p>'
                                + '</div>'
                            + '</div>'
                        +  '</div>' 
        }
        
        populateStr += '</div>';
        gridArray.push(populateStr);
    }
    return gridArray;
}

const TrackCard = () => {
    var trackCards = PopulateTrackCards();
    
    return (
        <div className='container text-center'>
            {trackCards.map((trackCard) => (
                <div>{parse(trackCard)}</div>
            ))}
        </div>
    )
};

export default TrackCard;