import React, { useState } from 'react';
import RecordButton from './RecordButton';
import { Carousel } from "react-responsive-carousel";
import { SliderPicker } from 'react-color'

function Record() {
    //Set onLoad to link
    const [type, setType] = useState('link');

    return (
        <div>
            <select onChange={e => { setType(e.target.value) }}>
                <option value={"link"}>Youtube</option>
                <option value={"script"}>Script</option>
            </select>
            <ScriptThing show={type === "script"} />
            <LinkThing show={type === "link"} />
            <Setting />
        </div>
    );
}

function LinkThing(shown) {
    //Link test
    //https://www.youtube.com/watch?v=l0jJGlalLh8

    const [id, setId] = useState('');
    let correctLink = id.split('=');
    let url = correctLink[1];
    if (shown.show) {
        return (
            <div>
                <input placeholder='Youtube Link' onChange={(e) => setId(e.target.value)} /> <br />
                <VidLink link={url} />
            </div>)
    }
    return <></>;
}

function VidLink(link) {

    //https://www.youtube.com/watch?v=DSBBEDAGOTc
    let id = link.link;
    if (id!= undefined) {
        return (
            <>

                <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="Embedded youtube"
                />
            </>
        )
    } else {
        return (
            <>
                <div style={{padding: '250px'}}>Please provide a valid Link</div>
            </>
        )
    }
}

function ScriptThing(shown) {
    const [script, setScript] = useState('');
    const [speed, setSpeed] = useState(1000);
    const [background, setBackground] = useState('#fff')
    const [textColor, setTextColor] = useState('#000')

    let words = script.split(' ');
    if (shown.show) {
        return <>
            <br />
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <ValidScript scripts={[words, speed, background, textColor]} />
                    </div>
                    <div className='col'>
                        <div>Script Setting</div>
                        <br />
                        <textarea rows='5' cols='50' placeholder='Wordbox (seperate words by space)' onChange={(e) => setScript(e.target.value)} />
                        <br />
                        <label>Slideshow Speed</label>
                        <input value={speed / 1000} type='number' placeholder='(seconds)' onChange={(e) => setSpeed(e.target.value * 1000)} />
                        <br />
                        <label>Slideshow Background</label>
                        <SliderPicker color={background} onChangeComplete={(e) => setBackground(e.hex)} />
                        <label>Text color</label>
                        <SliderPicker color={textColor} onChangeComplete={(e) => setTextColor(e.hex)} />
                    </div>
                </div>

                <br />
            </div>

        </>
    }
    return <></>;
}

function ValidScript(scripts) {
    console.log(scripts);
    let wordArray = scripts.scripts[0];
    let speed = scripts.scripts[1];
    let backgroundCol = scripts.scripts[2];
    let textColor = scripts.scripts[3];
    if (wordArray != '') {
        return (
            <>
                <div>
                    To start click left or right side of slideshow
                </div>
                <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
                    infiniteLoop={true} dynamicHeight={true} interval={speed}>
                    {wordArray.map(
                        (word) =>
                            <div style={{ background: `${backgroundCol}`, color: `${textColor}`, padding: '250px' }}>
                                {word}
                            </div>)}
                </Carousel>
            </>
        )

    }
    else {
        return (<>
            <Carousel autoPlay width={700} showThumbs={false} showIndicators={false}
                infiniteLoop={true} dynamicHeight={true}>
                <div style={{ padding: '200px' }}>Please enter some words in the textbox seperated by space.</div>
            </Carousel>
        </>)

    }

}

function Setting() {
    let st = {
        height: '100px',
        position: 'fixed',
        bottom: '0%',
        width: '100%',
        backgroundColor: '#393838',
        opacity: '1',
    }

    return (
        <>
            <div style={st}>
                <table style={{ width: '100%', height: '100px' }}>
                    <tr>
                        <td style={{ width: '25%', textAlign: 'center' }}>
                            <div style={{ color: 'white' }}>Key Signature</div>

                            <select>
                                <option>C</option>
                                <option>C#/Db</option>
                                <option>D</option>
                                <option>D#/Eb</option>
                                <option>E</option>
                                <option>F</option>
                                <option>F#/Gb</option>
                                <option>G</option>
                                <option>G#/Ab</option>
                                <option>A</option>
                                <option>B</option>
                            </select>
                            <div style={{ color: 'white' }}>Scale</div>
                            <select>
                                <option>Major</option>
                                <option>Minor</option>
                            </select>
                        </td>
                        <td style={{ width: '22%', textAlign: 'left' }}>

                        </td>
                        <td>
                            <RecordButton />
                        </td>
                        <td style={{ width: '25%', textAlign: 'center' }}>
                            <div style={{ color: 'white' }}>Tempo</div>
                            <input type="text" defaultValue="120" />
                        </td>
                    </tr>

                </table>
            </div>

        </>
    );

}

export default Record;