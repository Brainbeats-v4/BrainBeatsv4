import { CompactPicker } from 'react-color';
import { useState, useEffect } from 'react';
import './Cards.css';
import { Modal } from 'react-bootstrap';
import ImageModal from '../../../Modals/ImageModal/ImageModal';
import { useAppSelector } from '../../../../Redux/hooks';
import { Card } from '../../../../util/Interfaces'
import { useDispatch } from 'react-redux';
import { set, unset } from '../../../../Redux/slices/cardArraySlice'
import { useNavigate } from 'react-router-dom';

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

    const [selectedView, setSelectedView] = useState("color");

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
    const [usingVideoAudio, setUsingVideoAudio] = useState(false);

    // Navigating
    const navigate = useNavigate();
    const doNavigate = (route: string) => {
        navigate(route);
    }

    const handleVideoAudio = () => {
        setUsingVideoAudio(!usingVideoAudio);
        console.log(usingVideoAudio);
    }

    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event!.target.files[0]);
        // setImageURL(event.target.name); 
        if (!event.target.files) {
            console.log("it's null")
            return
        }

        setImageURL(URL.createObjectURL(event.target.files[0]));
        

    }

    const disableAudio = () => {
        return selectedView === "video" && usingVideoAudio;
    }

    const setColorBackground = (color: { rgb: any; }) => {
        setBackgroundColor({ displayColorPicker: backgroundColor.displayColorPicker, color: color.rgb });
        setImageURL('');
    };
    const setColorText = (color: { rgb: any; }) => {
        setTextColor({ displayColorPicker: textColor.displayColorPicker, color: color.rgb });
    };

    const addCard = () => {
        if (cardText === '' && imageURL === '') {
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

        cards.push(newCard);

        console.log(newCard);
        console.log(cards);
        // dispatch(set(cards));
    }

    const sendCards = () => {
        dispatch(set(cards));
    }

    useEffect(() => {
        setImageURL(image.urls.regular)
        setShow(false);
    }, [image]);

    return (
        <div id='record-card-info-div'>
            <Modal id='pop-up' show={show} onHide={handleClose}>
                <ImageModal /*setImageURL={setImageURL}*/ />
            </Modal>
            <div className='cards-body-div'>
                <div id='card-settings-div'>
                    <h6 className='record-heading'>Card Settings</h6>
                    <div id='record-uploads-div'>
                        <div>
                            <input type="radio" id="color-select" name="card-type" value="color"
                                checked={selectedView === "color"}
                                onChange={() => setSelectedView("color")} />
                            <label className='check-box' htmlFor="color">Color</label>
                        </div>

                        <div>
                            <input type="radio" id="image-select" name="card-type" value="image"
                                checked={selectedView === "image"}
                                onChange={() => setSelectedView("image")} />
                            <label className='check-box' htmlFor="image">Image</label>
                        </div>

                        <div>
                            <input type="radio" id="video-select" name="card-type" value="video"
                                checked={selectedView === "video"}
                                onChange={() => setSelectedView("video")} />
                            <label className='check-box' htmlFor="video">Video</label>
                        </div>

                        <div id='color-settings' className='area-settings' hidden={selectedView !== "color"}>
                            <label className='record-heading2' htmlFor="file-upload">Select Background Color</label>
                            <div className='record-upload1'>
                                <CompactPicker
                                    onChange={setColorBackground}
                                />
                            </div>
                        </div>

                        <div className='area-settings' hidden={selectedView !== "image"}>
                            <button type="button" className="btn btn-secondary" id='image-card-btn' onClick={() => setShow(true)}>AI Image</button>
                            <h6 className='OR-subtitle'>OR</h6>
                            <label className='record-heading2' htmlFor="file-upload">Select Image File:</label>
                            <input type="file" className="btn btn-secondary" onChange={uploadImage} />
                        </div>

                        <div className='area-settings' hidden={selectedView !== "video"}>
                            <label className='record-heading2' htmlFor="file-upload">Select Video File:</label>
                            <input type="file" className="btn btn-secondary" />


                            <label className='record-heading' htmlFor="file-upload">Video Start Time:</label>
                            <div className='record-upload1'>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="Seconds"
                                    className="timeInput"
                                    onChange={(e) => setSpeed(e.target.valueAsNumber)}
                                    value={speed}
                                />
                            </div>

                            <input type="checkbox" id="video-check" checked={usingVideoAudio} onChange={handleVideoAudio}></input>
                            <label className='check-box' htmlFor="video-check">Use video audio</label>

                        </div>

                        <label className='record-heading2' htmlFor="file-upload">Upload Audio File:</label>
                        <input type="file" className="btn btn-secondary" disabled={disableAudio()} />

                        <label className='record-heading' htmlFor="file-upload">Audio Start Time:</label>
                        <div className='record-upload1'>
                            <input
                                type="number"
                                step="0.01"
                                placeholder="Seconds"
                                className="timeInput"
                                onChange={(e) => setSpeed(e.target.valueAsNumber)}
                                value={speed}
                                disabled={disableAudio()}
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
                                step="0.01"
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
            </div>
            <div className='cards-footer-div'>
                <div id='record-buttons-div'>
                    <button type="button" className="btn btn-secondary" id='skip-step-btn' onClick={() => doNavigate("/record")}>Skip This Step</button>
                    <button type="button" className="btn btn-secondary" id='go-record-btn' onClick={() => { doNavigate("/record"); sendCards(); }}>Go to Record</button>
                </div>
            </div>
        </div>);
}

export default Cards; 
