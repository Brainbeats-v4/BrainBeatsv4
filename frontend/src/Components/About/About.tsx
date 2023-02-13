
import React from 'react'
import './About.css'
import bbmascot1 from '../../images/bbmascot1.png'

import Team4 from '../TeamInfo/Team4/Team4'

const About = () => {
  return (
    // <div className='aboutMainBody'>
    //     <h2>About Us</h2>
    //     <img id='mascot' src={bbmascot1} />
    //     <hr />
    //     <br />
    //     <h4>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</h4>
    //     <h4>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</h4>
    //     <br />
    //     <iframe width="850" height="473" src="https://www.youtube.com/embed/wvttb2_AZag" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    // </div>
    
    // <div className='container' id='main-container'>
      <div id='about-container'>
        <div id='about-header-div'>
          <div id='about-header-title'>
            <h1>About Us</h1>
          </div>
          <div id='about-links-div'>
          <a href="#about-bb-section" className='about-link'>What is BrainBeats?</a>
          <h6>•</h6>
          <a href="#about-teams-section" className='about-link'>Our Teams</a>
          <h6>•</h6>
          <a href="#about-tech-section" className='about-link'>Techonolgy Used</a>
          </div>
        </div>
        <hr className='about-linebreak' id='about-bb-section'></hr>
        <div id='about-body-div'>
          <h1 className='about-body-titles'>What is BrainBeats?</h1>
          <div id='about-brainbeats'>
            <div id='about-bb-image'>
             <img id='mascot' src={bbmascot1} />
            </div>
            <div id='about-bb-text'>
              <h1 className='about-bb-subtitle'>Our Mission</h1>
              <p>BrainBeats seeks to improve upon the interaction between the fields of music composition and computer science as well as provide musicians with a more creative interface to create music.</p>
              <h1 className='about-bb-subtitle'>What is BrainBeats?</h1>
              <p>BrainBeats is a web application built for converting electroencephalogram (EEG) into Musical Instrument Digital Interface files (MIDI) which can be converted to generic audio files (.mp3, .wav, etc.). Audio files created by users can then be uploaded, edited, shared, and downloaded on BrainBeats’ web platform with a BrainBeats user account.</p>
              <h1 className='about-bb-subtitle'>How It Works</h1>
              <p>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</p>
              <br />
              <iframe width="80%" height="300px" src="https://www.youtube.com/embed/wvttb2_AZag" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
          <hr className='about-linebreak' id='about-teams-section'></hr>
          <h1 className='about-body-titles'>Our Teams</h1>
          <div id='about-teams'>
            <div id='about-teams-header'>
              {/* <h2>Header</h2> */}
              <button type="button" className="btn btn-secondary about-team-btn">
                Team 4
                <h6 className='about-team-btn-subtitle'>(2022-2023)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn">
                Team 3
                <h6 className='about-team-btn-subtitle'>(2021-2022)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn">
                Team 2
                <h6 className='about-team-btn-subtitle'>(2020-2021)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn">
                Team 1
                <h6 className='about-team-btn-subtitle'>(2019-2020)</h6>
              </button>
            </div>
            <Team4></Team4>
            {/* <div className='about-teams-body'>
              <div className='about-team-info'>
                <h1 className='about-team-title'>Team Number</h1>
                <h6 className='about-team-year'>Founded Year</h6>
                <h3 className='about-team-subtitle'>Goals and Objectives</h3>
                <p>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</p>
                <h3 className='about-team-subtitle'>Contributions</h3>
                <p>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</p>
              </div>
              <div className='about-team-members'>
                <h2>Members</h2>
              </div>
            </div> */}
          </div>
          <hr className='about-linebreak' id='about-tech-section'></hr>
          <h1 className='about-body-titles'>Tech Used In Production</h1>
          <div id='about-tech'>
            <div id='about-tech-image'>
              <img id='mascot' src={bbmascot1} />
            </div>
            <div id='about-tech-text'>
              <h1 className='about-tech-subtitle'>Electroencephalogram (EEG)</h1>
              <p>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</p>
              <h1 className='about-tech-subtitle'>How It Works</h1>
              <p>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</p>
              <br />
            </div>
          </div>
          <hr className='about-linebreak'></hr>
        </div>
      </div>
    // </div>
  )
}

export default About;