
import React, { useState } from 'react'

// Importing CSS
import './About.css'
import bbmascot1 from '../../images/bbmascot1.png'
import BrainBeatsBrain2 from '../../images/BrainBeatsBrain2.png'
import cytonBoard from '../../images/Cyton.jpg';


// Importing Team Segments
import Team5 from '../TeamInfo/Team5/Team5'
import Team4 from '../TeamInfo/Team4/Team4'
import Team3 from '../TeamInfo/Team3/Team3'
import Team2 from '../TeamInfo/Team2/Team2'
import Team1 from '../TeamInfo/Team1/Team1'

const About = () => {

  const [displayTeam, setDisplayTeam] = useState(5); // displays team 4 by default
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
             <img id='mascot' src={BrainBeatsBrain2} />
            </div>
            <div id='about-bb-text'>
              <h1 className='about-bb-subtitle'>Our Mission</h1>
              <p>BrainBeats seeks to improve upon the interaction between the fields of music composition and computer science as well as provide musicians with a more creative interface to create music.</p>
              <h1 className='about-bb-subtitle'>What is BrainBeats?</h1>
              <p>BrainBeats is a web application built for converting electroencephalogram (EEG) into Musical Instrument Digital Interface files (MIDI) which can be converted to generic audio files (.mp3, .wav, etc.). Audio files created by users can then be uploaded, edited, shared, and downloaded on BrainBeats’ web platform with a BrainBeats user account.</p>
              <p>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</p>
              <br />
            </div>
          </div>
          <hr className='about-linebreak' id='about-teams-section'></hr>
          <h1 className='about-body-titles'>Our Teams</h1>
          <div id='about-teams'>
            <div id='about-teams-header'>
              {/* <h2>Header</h2> */}
              <button type="button" className="btn btn-secondary about-team-btn" style={{backgroundColor: displayTeam == 5?  "#005B69" : "#259FB1"}} onClick={(e) => setDisplayTeam(5)}>
                Team 5
                <h6 className='about-team-btn-subtitle'>(2023-2024)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn" style={{backgroundColor: displayTeam == 4?  "#005B69" : "#259FB1"}} onClick={(e) => setDisplayTeam(4)}>
                Team 4
                <h6 className='about-team-btn-subtitle'>(2022-2023)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn" style={{backgroundColor: displayTeam == 3?  "#005B69" : "#259FB1"}} onClick={(e) => setDisplayTeam(3)}>
                Team 3
                <h6 className='about-team-btn-subtitle'>(2022)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn" style={{backgroundColor: displayTeam == 2?  "#005B69" : "#259FB1"}} onClick={(e) => setDisplayTeam(2)}>
                Team 2
                <h6 className='about-team-btn-subtitle'>(2021-2022)</h6>
              </button>
              <button type="button" className="btn btn-secondary about-team-btn" style={{backgroundColor: displayTeam == 1?  "#005B69" : "#259FB1"}} onClick={(e) => setDisplayTeam(1)}>
                Team 1
                <h6 className='about-team-btn-subtitle'>(2020)</h6>
              </button>
            </div>
            {displayTeam == 5? <Team5></Team5> : null}
            {displayTeam == 4? <Team4></Team4> : null}
            {displayTeam == 3? <Team3></Team3> : null}
            {displayTeam == 2? <Team2></Team2> : null}
            {displayTeam == 1? <Team1></Team1> : null}
          </div>
          <hr className='about-linebreak' id='about-tech-section'></hr>
          <h1 className='about-body-titles'>Tech Used In Production</h1>
          <div id='about-tech'>
            <div id='about-tech-image'>
              <img id='mascot' src={cytonBoard} />
              <p>OpenBCI Cyton Board</p>
            </div>
            <div id='about-tech-text'>
              <h1 className='about-tech-subtitle'>Using Electroencephalogram (EEG)</h1>
              <p>An electroencephalogram (EEG) test measures electrical activity in the brain through electrodes consisting of small metal discs with thin wires pasted onto the scalp. The electrodes attached to the scalp detect tiny electrical charges resulting from brain cell activity. BrainBeats uses the electrical activity read from an EEG test alongside different music settings provided by the user to convert this information into music.</p>
              <h1 className='about-tech-subtitle'>Resources Used</h1>
              <p>Version 4 of BrainBeats took advantage of OpenBCI, an open-source brain-computer interface platform that can be used to measure and record electrical activity produced by the brain. Version 4 of BrainBeats created and tested our application throughout production using OpenBCI's Cyton board, an Arduino-compatible, 8-channel neural interface with a 32-bit processor.</p>
              <p>More information on the OpenBCI platform and the Cyton board may be found here: <a href="https://docs.openbci.com/Cyton/CytonLanding/">https://docs.openbci.com/Cyton/CytonLanding/</a>.</p>
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