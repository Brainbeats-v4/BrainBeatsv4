import React, { useState, useEffect, useCallback } from 'react';
// import {userJWT, userModeState} from '../context/GlobalState'
import './Home.css';
import TrackCard from '../TrackCard/TrackCard';
import Carousel from '../Carousel/Carousel';
import sendAPI from '../../SendAPI';
import { Navigate } from 'react-router-dom';
import { userJWT } from '../../JWT';


// To check user state
// import { userJWT, userModeState } from "../../JWT"; 

const Home = () => {

    const userId = "";
    // Api call for featured tracks
    return (
        <div className='container' id='home-container'>
            <Carousel />
            <h2 className="text-decoration-underline" id="featured-tracks-heading">Featured Tracks</h2>
            <div className='container' id='track-card-container'>
                <TrackCard cardType={'Popular'} input={userId}/>
            </div>
        </div>);
}

export default Home;