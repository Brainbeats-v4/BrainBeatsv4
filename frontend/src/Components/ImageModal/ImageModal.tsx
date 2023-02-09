import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';

// Import CSS
import './ImageModal.css';

const ImageModal = () => {

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
            Image Search
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div className="searchbar-div">
                <FontAwesomeIcon icon={["fas", "search"]} />
                <input
                type="search"
                id="searchbar"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                // onChange={(e) => setQuery(e.target.value)}
                />
                {/* <Button className="buttonStyle" onClick={searchFuntion}>
                Search
                </Button> */}
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            Image Footer
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default ImageModal;