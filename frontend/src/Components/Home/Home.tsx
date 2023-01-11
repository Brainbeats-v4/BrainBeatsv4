import React, { useState, useEffect, useCallback } from 'react';
// import {userJWT, userModeState} from '../context/GlobalState'
import './Home.css';
import TrackCard from '../TrackCard/TrackCard';
import Carousel from '../Carousel/Carousel';

const Home = () => {

    // Api call for featured tracks
    
    return (
        <div className='container' id='home-container'>
            <Carousel />
            <h2 className="text-decoration-underline" id="featured-tracks-heading">Featured Tracks</h2>
            <div className='container' id='track-card-container'>
                <TrackCard />
            </div>
            
        </div>);


}

export default Home;