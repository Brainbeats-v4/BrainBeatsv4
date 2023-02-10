import { BlockPicker, ChromePicker, CompactPicker, PhotoshopPicker, SketchPicker, SliderPicker, TwitterPicker } from 'react-color';
import { useState } from 'react';
import { stringify } from 'querystring';
import './Cards.css';
import { Modal } from 'react-bootstrap';
import ImageModal from '../../../ImageModal/ImageModal';
import { useAppSelector } from '../../../../Redux/hooks';

function Cards() {

    interface card {
        textColor:{
            r: string,
            g: string,
            b: string,
            a: string,
          },
        backgroundColor: {
            r: string,
            g: string,
            b: string,
            a: string,
          },
        speed: number,
        text: string,
    }

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

    const [cards, setCards] = useState<card[]>([])
	const [cardText, setCardTextState] = useState('');
	const [speed, setSpeed] = useState(1)
	const [backgroundColor, setBackgroundColor] = useState(initialBackground);
	const [textColor, setTextColor] = useState(initialTextColor);
    const image = useAppSelector(state => state.imageSlice)
    const setColorBackground = (color: { rgb: any; }) => {
		setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
    };
    const setColorText = (color: { rgb: any; }) => {
    setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
    };

    const addCard = () => {
		if(cardText === ''){
			alert("Invalid Card format")
			return
		}
		let newCard ={
			textColor: textColor.color,
			backgroundColor: backgroundColor.color,
			speed: speed * 1000,
			text: cardText,
		}

		//set input back to default
		setBackgroundColor(initialBackground);
		setTextColor(initialTextColor);
		setCardTextState('');
		setSpeed(1);
		setCards(cards => [...cards, newCard])

        // console.log(newCard);
        console.log(...cards);
	}

      // For displaying Modal
      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
    });

    return(
        <div id='record-card-info-div'>
             <Modal id='pop-up' show={show} onHide={handleClose}>
                <ImageModal /*setImageURL={setImageURL}*//>
            </Modal>
            <div id='card-settings-div'>
                <h6 className='record-heading'>Card Settings</h6>
                <div id='record-uploads-div'>
                    <label className='record-heading' htmlFor="file-upload">Background Image:</label>
                    <div className='record-upload'>
                        <button type="button" className="btn btn-secondary" id='image-card-btn' onClick={() => setShow(true)}>Select an Image</button>

                    </div>
                    <label className='record-heading' htmlFor="file-upload">Background Color:</label>
                    <div className='record-upload1'>
                        <CompactPicker
                            onChange={setColorBackground}
                        />
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