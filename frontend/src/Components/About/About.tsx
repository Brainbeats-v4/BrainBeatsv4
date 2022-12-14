
import React from 'react'
import './About.css'
import bbmascot1 from '../../images/bbmascot1.png'

const About = () => {
  return (
    <div className='aboutMainBody'>
        <h2>About Us</h2>
        <img id='mascot' src={bbmascot1} />
        <hr />
        <br />
        <h4>BrainBeats is a Senior Design project for computer science students at the University of Central Florida. The project is sponsored by Dr. Leinecker, and has been ongoing since 2019. The premise of BrainBeats is to take the electrical waves in your brain (using an EEG device) and utilize them to generate "music".</h4>
        <h4>The functionality of this platform allows you to create a script for your recording session, record your song with an EEG headset utilizing your own unique musical settings, posting your recorded songs, downloading the MIDI equivalent of your song, and creating playlists with music you enjoy. The platform allows you to connect with other users creating music with their own EEG headset, and to interact with their posts.</h4>
        <br />
        <iframe width="850" height="473" src="https://www.youtube.com/embed/wvttb2_AZag" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default About;