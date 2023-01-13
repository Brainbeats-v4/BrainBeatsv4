import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import CSS
import './TrackModal.css';
import '../TrackCard/TrackCard.css';

interface trackCardProps {
  title: string;
  user: string;
  image: string;
}

const TrackModal = ({title, user, image}: trackCardProps) => {

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
            {/* <Modal.Title>Modal heading</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div id='modal-track-cover-div'>
              <img src={image} className="card-img-top modal-track-cover" id="card-img-ID" alt="..."/>
            </div>
            <div id='modal-track-text-div'>
              <h6 id="hidden-track-text">
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye-slash"]} />
                hidden track
              </h6>
              <h1 id='track-title-text'>{title}</h1>
              <h6 id="track-author-text">{user}</h6>
              <button type="button" className="btn btn-primary" id='play-btn'>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "play"]} />
                <h3>Play</h3>
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            <div id='modal-container-20'>
              <button className='btn btn-secondary modal-btn-public'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "eye"]} />
                Make Public
              </button>
            </div>
            <div id='modal-container-21'>
              <button className='btn btn-secondary modal-btn'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "heart"]} />
                Favorite
              </button>
              <button className='btn btn-secondary modal-btn'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "plus"]} />
                Add to Playlist
              </button>
              <button className='btn btn-secondary modal-btn'>
                <FontAwesomeIcon className='modal-track-icons' icon={["fas", "edit"]} />
                Edit
              </button>
            </div>
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default TrackModal;