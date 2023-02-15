import { CompactPicker } from 'react-color';
import { useState, useEffect } from 'react';
import './Cards.css';
import { Modal } from 'react-bootstrap';
import ImageModal from '../../../ImageModal/ImageModal';
import { useAppSelector } from '../../../../Redux/hooks';
import { Card } from '../../../../util/Interfaces'
import { useDispatch } from 'react-redux';
import { set } from '../../../../Redux/slices/cardArraySlice'

function Cards() {
    const initialBackground = {
		displayColorPicker: false,
		color: {
		  r: '14',
		  g: '14',
		  b: '14',
		  a: '14',
		},
	}
	const initialTextColor = {
		displayColorPicker: false,
		color: {
		  r: '255',
		  g: '255',
		  b: '255',
		  a: '255',
		},
	}

    // For displaying Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    // For collecting image from Redux
    const image = useAppSelector(state => state.imageSlice)
    const dispatch = useDispatch();
    
    // For holding card information
    const [cards, setCards] = useState<Card[]>([])
	const [cardText, setCardTextState] = useState('');
	const [speed, setSpeed] = useState(1)
	const [backgroundColor, setBackgroundColor] = useState(initialBackground);
	const [textColor, setTextColor] = useState(initialTextColor);
    const [imageURL, setImageURL] = useState('');

    const setColorBackground = (color: { rgb: any; }) => {
		setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
    };
    const setColorText = (color: { rgb: any; }) => {
        setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
    };

    const addCard = () => {
		if(cardText === '' && imageURL === ''){
			alert("Invalid Card format: Must include either an image or text")
			return
		}
		let newCard: Card = {
			textColor: textColor.color,
			backgroundColor: backgroundColor.color,
			speed: speed * 1000,
			text: cardText,
            url: imageURL,
		}

		//set input back to default
		setBackgroundColor(initialBackground);
		setTextColor(initialTextColor);
		setCardTextState('');
		setSpeed(1);
        setImageURL('');
		setCards(cards => [...cards, newCard])

        console.log(newCard);
        console.log(cards);
        dispatch(set(cards));
	}

    useEffect(() => {
        setImageURL(image.urls.regular)
        setShow(false);
      }, [image]);

    return(
        <div id='record-card-info-div'>
             <Modal id='pop-up' show={show} onHide={handleClose}>
                <ImageModal /*setImageURL={setImageURL}*//>
            </Modal>
            <div id='card-settings-div'>
                <h6 className='record-heading'>Card Settings</h6>
                <div id='record-uploads-div'>
                <label className='record-heading' htmlFor="file-upload">Background:</label>
                    <div id='background-settings'>
                        <div className='record-upload'>
                            <button type="button" className="btn btn-secondary" id='image-card-btn' onClick={() => setShow(true)}>Select Background Image</button>
                        </div>
                        <h6 className='OR-subtitle'>OR</h6>
                        <label className='record-heading2' htmlFor="file-upload">Select Background Color</label>
                        <div className='record-upload1'>
                            <CompactPicker
                                onChange={setColorBackground}
                            />
                        </div>
                    </div>
                    
                    <label className='record-heading' htmlFor="file-upload">Text Color:</label>
                    <div className='record-upload1'>
                        <CompactPicker
                            onChange={setColorText}
                        />
                    </div>
                    <label className='record-heading' htmlFor="file-upload">Enter Text:</label>
                    <div className='record-upload1'>
                        <input
                            className="input-card-text"
                            placeholder="Your text here"
                            onChange={(e) => setCardTextState(e.target.value)}
                            value={cardText}
                        />
                    </div>
                    <label className='record-heading' htmlFor="file-upload">Card Duration (seconds):</label>
                    <div className='record-upload1'>
                        <input
                            type="number"
                            placeholder="Seconds"
                            className="timeInput"
                            onChange={(e) => setSpeed(e.target.valueAsNumber)}
                            value={speed}
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-secondary" id='add-card-btn' onClick={addCard}>Add Card</button>
            </div>
            <div id='display-card-div'>
                Card Display:
                <div id='card-display'
                    style={{
                        color: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                        background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                        backgroundImage: `url(${imageURL})`,
                    }}
                >
                <div id='card-text'>
                    <h1>{cardText}</h1>
                </div>
                </div>
            </div>
        </div>);
}

export default Cards;