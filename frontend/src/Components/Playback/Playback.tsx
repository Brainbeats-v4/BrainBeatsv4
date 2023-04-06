import { useState } from 'react';

import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { Buffer } from 'buffer';

type Props = {
    midiString:string;
}


const Playback:React.FC<Props> = ({midiString}) => {
    const [playing, setPlaying] = useState(false);
    const base64String = parseBase64(midiString); // feed this in
    const binaryString = Buffer.from(base64String, 'base64').toString('binary');

    const encoder = new TextEncoder();
    var uint8Array = encoder.encode(binaryString);
    uint8Array = uint8Array.slice(0, uint8Array.length - 2);

    const arrayBuffer = uint8Array.buffer;
    const midi = new Midi(arrayBuffer);
    const midiJSON = midi.toJSON();


    /* The base64 string has "data:audio/midi;base64," stored before the actual data,
        the playback function doesn't like that so we just take it off for reading */
    function parseBase64(b64String:string) {
        console.log(b64String.split(','));
        return b64String.split(',')[1];
    }

    function handlePlayback() {
        setPlaying(!playing);
        console.log(playing);
        var synths:Array<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>> = [];
        if(playing) {
            console.log(midiJSON);
            midiJSON.tracks.forEach((track) => {
                const synth = new Tone.PolySynth(Tone.Synth).toDestination();
                synths.push(synth);
                track.notes.forEach((note) => {
                    console.log(note);
                    synth.triggerAttackRelease(
                        note.name,
                        note.duration,
                        note.time + Tone.now(),
                        note.velocity
                    );
                });
                console.log('played');
            });
        }
        else {
            while(synths.length) {
                const synth = synths.shift();
                synth?.disconnect();
            }
        }
    } 

    

    return(
        <div>
        <button onClick={handlePlayback}>Play me</button>
        </div>
    )
}

export default Playback;