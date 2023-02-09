import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import React, { useState } from "react";
import { createApi } from 'unsplash-js';

// Import CSS
import './ImageModal.css';

const ImageModal = () => {
    const unsplash = createApi({ accessKey: 'qzTKf-iacxYgt-zPYxlvgbSErhKe3_u7-vbT9fmtInk' });
    const [searchTerm, setSearchTerm] = useState("");
    const [pics, setPics] = useState([]);

    useEffect(() => {
        unsplash.search.getPhotos({ query: searchTerm, perPage: 30, orientation: 'squarish' }).then(result => {
            if (result.errors) {
                // handle error here
                console.log('error occurred: ', result.errors[0]);
            } else {
                const feed = result.response;

                // extract total and results array from response
                const { total, results } = feed;

                // handle success here
                console.log(`received ${results.length} photos out of ${total}`);
                console.log('first photo: ', results[0]);
                setPics(results)
            }
        });
        }, [searchTerm]);

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </Modal.Body>
            <div className="card-list">
                {pics.map((pic) =>
                    <div className="card" key={pic.id}>
                        <img
                            className="card--image"
                            src={pic.urls.full}
                            width="50%"
                            height="50%"
                        ></img>
                    </div>)};
            </div>
          <Modal.Footer className='modal-container2'>
            Image Footer
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default ImageModal;