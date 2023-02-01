import './RecordCards.css';
import { BlockPicker, ChromePicker, CompactPicker, PhotoshopPicker, SketchPicker, SliderPicker, TwitterPicker } from 'react-color';
import { useState } from 'react';
import { stringify } from 'querystring';
import React from 'react';

const RecordCards = () => {

    //Setting Up Script (line 59-83 in v3 Record.js)
	//Text Cards
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

	const [cards, setCards] = useState<card[]>([])
	const [cardText, setCardTextState] = useState('');
	const [speed, setSpeed] = useState(1)
	const [backgroundColor, setBackgroundColor] =useState(initialBackground);
	const [textColor, setTextColor] =useState(initialTextColor);
    
    // End of Setting up Script

    // Function adding card (line 154-171 in v3 Record.js)
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

    // Displaying Color Picker Functions (line 194-215 in v3 Record.js)
    //Background Color Picker Functions
	//   const openBackgroundColor = () => {
	// 	setBackgroundColor({ displayColorPicker: !backgroundColor.displayColorPicker, color: backgroundColor.color });
	//   };
	//   const closeBackgroundColor = () => {
	// 	setBackgroundColor({ displayColorPicker: false, color: backgroundColor.color });
	//   };
      // (May change color parameter type)
	  const setColorBackground = (color: { rgb: any; }) => {
		setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
	  };

	  //Text Color Picker Functions
	//   const openTextColor = () => {
	// 	setTextColor({ displayColorPicker: !textColor.displayColorPicker, color: textColor.color });
	//   };
	//   const closeTextColor = () => {
	// 	setTextColor({ displayColorPicker: false, color: textColor.color });
	//   };
      // (May change color parameter type)
	  const setColorText = (color: { rgb: any; }) => {
		setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
	  };

    // Upload Image function
    // const [img, setImg] = useState();
    
    // const onImageChange = (e: { target: { files: [Blob | MediaSource]; }; }) => {
    //   const [file] = e.target.files;
    //   setImg(URL.createObjectURL(file));
    // };
      

    return (
        <div className='container' id='record-container'>
            <h2 className='record-heading'>Record Music</h2>
            <p className='record-heading'>Add cards to influence brain waves:</p>
            <div>
                <div id='record-card-info-div'>
                    <div id='card-settings-div'>
                       <h6 className='record-heading'>Card Settings</h6>
                       <div id='record-uploads-div'>
                            <label className='record-heading' htmlFor="file-upload">Upload Image:</label>
                            <div className='record-upload'>
                                <input 
                                    accept="image/*"
                                    type="file" 
                                    id="file-upload" 
                                    multiple={false}
                                    // onChange={onImageChange}
                                    // onChange={(e) => fileChangeEvent(e.target.files)}
                                    // value={}
                                />
                            </div>
                            {/* <img src={img} alt='preview img' /> */}
                            <label className='record-heading' htmlFor="file-upload">Background Color:</label>
                            <div className='record-upload1'>
                                <CompactPicker
                                    onChange={setColorBackground}
                                />
                            </div>
                            <label className='record-heading' htmlFor="file-upload">Text Color:</label>
                            <div className='record-upload1'>
                                <CompactPicker
                                    // color={textColor.color}
                                    onChange={setColorText}
                                />
                            </div>
                            <label className='record-heading' htmlFor="file-upload">Enter Text:</label>
                            <div className='record-upload1'>
                                <input
                                    className="input-card-text"
                                    placeholder="Your text here"
                                    onChange={(e) => setCardTextState(e.target.value)}
                                    // style={{
                                    //     color: `rgba(${textColor.color.r}, ${textColor.color.g}, ${textColor.color.b}, ${textColor.color.a})`,
                                    //     background: `rgba(${backgroundColor.color.r}, ${backgroundColor.color.g}, ${backgroundColor.color.b}, ${backgroundColor.color.a})`,
                                    // }}
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
                            {cardText}
                        </div>
                    </div>
                </div>
                <div id='record-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='skip-step-btn'>Skip This Step</button>
                    <button type="button" className="btn btn-secondary" id='go-record-btn'>Go to Record</button>
                </div>
            </div>            
        </div>);
}

export default RecordCards;