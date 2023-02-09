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
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div id='image-search-body'>
              <h2 id="searchTitle">Search for an Image</h2>
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
            </div>
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            <div id='image-search-footer'>
              <h6>Image Results</h6>
              {/* Populate Image Results here */}
            </div>
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default ImageModal;