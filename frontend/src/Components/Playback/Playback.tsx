// This is the main MIDI playback file.
// It will contain a button and a timeline which
// will play the MIDI.
import { useState } from 'react';

import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Buffer } from 'buffer';

import MidiPlayerInterface from 'midi-player-ts';

import * as MidiFileParser from 'midi-file-parser'


type Props = {
    midiString: string;
}


const Playback: React.FC<Props> = ({ midiString }) => {
    const [playing, setPlaying] = useState(false);
    const base64String = parseBase64(midiString); // feed this in
    const binaryString = Buffer.from(base64String, 'base64').toString('binary');
    var midi: Midi;

    const blob: Blob = new Blob([binaryString], { type: "audio/midi" });
    const [trackIsPlaying, setTrackIsPlaying] = useState(false);

    const url = URL.createObjectURL(blob);

    const synths: Tone.PolySynth[] = []


    //read the file



    // const url = URL.createObjectURL(blob);
    // const midiJSON = midi.toJSON();



    // blob.stream




    // const encoder = new TextEncoder();
    // var uint8Array = encoder.encode(binaryString);
    // uint8Array = uint8Array.slice(0, uint8Array.length - 2);

    // const arrayBuffer = uint8Array.buffer;


    /* The base64 string has "data:audio/midi;base64," stored before the actual data,
        the playback function doesn't like that so we just take it off for reading */
    function parseBase64(b64String: string) {
        // console.log(b64String.split(','));
        return b64String.split(',')[1];
    }

    // this is a testing function to test playing audio
    async function playAudio() {
        
        Midi.fromUrl(midiString).then(midi => {

            //synth playback
            midi.tracks.forEach(track => {
                //create a synth for each track
                const synth = new Tone.PolySynth(Tone.Synth, {
                    envelope: {
                        attack: 0.01,
                        decay: 10,
                        sustain: 0.5,
                        release: 0.5
                    }
                }).toDestination()
                synths.push(synth)
                //schedule all of the events
                track.notes.forEach(note => {
                    Tone.Transport.scheduleOnce((time) => {
                        synth.triggerAttackRelease(note.name, note.duration, time, note.velocity)
                    }, note.time);
                })
            })
            setTrackIsPlaying(true);

        })
        Tone.Transport.start();
    }

    async function pauseAudio() {
        console.log("stopping audio")
        // while (synths.length) {
        //     console.log(synths.length);
        //     const synth = synths.shift();
        //     if (synth) {
        //         synth.dispose();
        //     }
        //
        //
        //
        // }
        // console.log("audio stopped")
        Tone.Transport.pause();
        setTrackIsPlaying(false);
    }




    return (
        <div>
            {!trackIsPlaying && <button type="button" className="btn btn-primary" id='play-btn' onClick={playAudio}>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "play"]} />
                <h3>Play</h3>
            </button>}
            {trackIsPlaying && <button type="button" className="btn btn-primary" id='play-btn' onClick={pauseAudio}>
                <FontAwesomeIcon className='modal-track-icons fa-2x' id='modal-track-play-icon' icon={["fas", "pause"]} />
                <h3>Pause</h3>
            </button>}
        </div>
    )
}

export default Playback;
