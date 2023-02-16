import { useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import sendAPI from '../../SendAPI';
import { userJWT, userModeState } from "../../JWT";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import buildPath from '../../util/ImagePath';


// Import CSS
import '../TrackModal/TrackModal.css';
import '../TrackCard/TrackCard.css';

type Props = {
  teamMember: TeamMember; 
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

const TeamMemberModal: React.FC<Props> = ({teamMember}) => {

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div id='modal-track-cover-div'>
              <img src={teamMember.image} className="card-img-top modal-track-cover" id="card-img-ID" alt="track image" onClick={() => {}}/>
            </div>
            <div id='modal-track-text-div'>
              <h1 id='track-title-text'>{teamMember.name}</h1>
              <h6 id="track-author-text">{teamMember.position}</h6>
              <br/>
              <p>{teamMember.bio}</p>

            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default TeamMemberModal;