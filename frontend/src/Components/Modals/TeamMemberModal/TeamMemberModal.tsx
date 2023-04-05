import Modal from 'react-bootstrap/Modal';

// Import CSS
import '../TrackModal/TrackModal.css';
import '../../TrackCard/TrackCard.css';
import './TeamMemberModal.css';

type Props = {
  teamMember: TeamMember; 
}

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
  contributions: string;
}

const TeamMemberModal: React.FC<Props> = ({teamMember}) => {

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container-header' closeButton>
          </Modal.Header>
          <Modal.Body className='modal-container-body'>
            <div id='modal-track-cover-div'>
              <img src={teamMember.image} className="card-img-top modal-track-cover" id="card-img-ID" alt="track image" onClick={() => {}}/>
            </div>
            <div id='modal-track-text-div'>
              <h1 id='track-title-text'>{teamMember.name}</h1>
              <h6 id="track-author-text">{teamMember.position}</h6>
              <br/>
              {(teamMember.bio != '') && <h6>About Me</h6>}
              {(teamMember.bio != '') && <p>{teamMember.bio}</p>}
              {(teamMember.bio != '') && <br/>}
              <h6>Individual Contributions</h6>
              <div id='member-contributions-div'>
                <p>{teamMember.contributions}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container-footer'>
            
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default TeamMemberModal;