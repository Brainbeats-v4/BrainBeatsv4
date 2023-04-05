import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { createApi } from 'unsplash-js';

// Redux
import * as Interfaces from '../../../util/Interfaces'
import { useDispatch } from 'react-redux';
// Redux state to hold settings for specificed board
import { set } from '../../../Redux/slices/imageSlice';

// import {setImageURL} from "../ScriptContainer/Scripts/Cards/Cards"

// Import CSS
import './ImageModal.css';
import { url } from 'inspector';

const ImageModal:React.FC = (/*setImageURL:(imageURL: string) => void*/) => {
    const unsplash = createApi({ accessKey: 'qzTKf-iacxYgt-zPYxlvgbSErhKe3_u7-vbT9fmtInk' });
    const [searchTerm, setSearchTerm] = useState("");
    const [pics, setPics] = useState<any[]>([])
    const dispatch = useDispatch();

    function search() {
      unsplash.search.getPhotos({ query: searchTerm, perPage: 16, orientation: 'squarish' }).then(result => {
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
    }

  const [clickedImageURL, setClickedImageURL] = useState('');

  // For passing selected image information back to 'Cards.tsx'
  function sendImageURL(pic: any) {
    const imageInformation: Interfaces.Picture = {
      width: pic.width,
      height: pic.height,
      color: pic.color,
      description: pic.description,
      urls: pic.urls
    }
    dispatch(set(imageInformation));
  }

  return (
    <>
      <div>
        <div className='modal-background'>
          <Modal.Header className='modal-container0' closeButton>
          </Modal.Header>
          <Modal.Body className='modal-container1'>
            <div id='image-search-body'>
              <h2 id='searchTitle'>Search for an Image</h2>
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
                <button type="button" className="btn btn-secondary" id='search-image-btn' onClick={()=>search()}>Search</button>
              </div>
            </div>            
          </Modal.Body>
          <Modal.Footer className='modal-container2'>
            <div id='image-search-footer'>
              <h6>Image Results</h6>
              <div className="search-image-list">
                {pics.map((pic) =>
                  <div className="search-image" id='search-image-id' key={pic.id} onClick={() => sendImageURL(pic)}>
                    <img
                      className="search--image"
                      src={pic.urls.thumb}
                      width="100%"
                      height="100%"
                    ></img>
                  </div>)}
              </div>
            </div>
          </Modal.Footer>
        </div>
      </div>
    </>
  );
}

export default ImageModal;