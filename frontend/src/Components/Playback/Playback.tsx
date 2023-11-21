// This is the main MIDI playback file.
// It will contain a button and a timeline which
// will play the MIDI.
import { ChangeEvent, useState } from 'react';

import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




type Props = {
    midiString: string;
}


const Playback: React.FC<Props> = ({ midiString }) => {

    const [trackIsPlaying, setTrackIsPlaying] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    const [trackLength, setTrackLength] = useState(0)


    const synths: Tone.PolySynth[] = []


    
    // async function setUp() {
    //     
    // }


    // this is a testing function to test playing audio
    async function playAudio() {

        if (!hasStarted) {
            Midi.fromUrl(midiString).then(midi => {
                setTrackLength(midi.duration)

                //synth playback
                midi.tracks.forEach(track => {
                    //create a synth for each track
                    const synth = new Tone.PolySynth(Tone.Synth, {
                        envelope: {
                            attack: 0.002,
                            decay: 5,
                            sustain: 0.5,
                            release: 0.5
                        }
                    }).toDestination()
                    synths.push(synth)
                    //schedule all of the events
                    track.notes.forEach(note => {
                        console.log("adding note")
                        Tone.Transport.scheduleOnce((time) => {
                            synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
                        }, note.time);
                    })
                })
                setHasStarted(true);

            })
        }
        setTrackIsPlaying(true);
        Tone.Transport.start();
    }

    async function pauseAudio() {
        console.log("stopping audio")
        Tone.Transport.pause();
        setTrackIsPlaying(false);
    }


    async function changeTime(event: React.ChangeEvent<HTMLInputElement>) {
        Tone.Transport.seconds = +event.currentTarget.value;
        console.log("changed time to", event.currentTarget.value);
    }




    return (
        <div>
            {!trackIsPlaying && <button type="button" className="btn btn-primary" id='play-btn' onClick={playAudio}>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "play"]} />
                <h3>Play</h3>
            </button>}
            {trackIsPlaying && <button type="button" className="btn btn-primary" id='pause-btn' onClick={pauseAudio}>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "pause"]} />
                <h3>Pause</h3>
            </button>}
            <input type="range" min = "0" max = {trackLength} onChange={changeTime}>
            
            </input>
        </div>
    )
}

export default Playback;
