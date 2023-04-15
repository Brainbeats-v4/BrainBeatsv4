import { useState } from 'react';

import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';
import { Buffer } from 'buffer';

import MidiPlayerInterface from 'midi-player-ts';

import * as MidiFileParser from 'midi-file-parser'


type Props = {
    midiString:string;
}


const Playback:React.FC<Props> = ({midiString}) => {
    const [playing, setPlaying] = useState(false);
    const base64String = parseBase64(midiString); // feed this in
    const binaryString = Buffer.from(base64String, 'base64').toString('binary');
    var midi:Midi;

    const blob:Blob = new Blob([binaryString], { type: "audio/midi" });
    
    const url = URL.createObjectURL(blob);
    

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
    function parseBase64(b64String:string) {
        // console.log(b64String.split(','));
        return b64String.split(',')[1];
    }

    async function dontHandlePlayback() {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();

        const decoder = new TextDecoder('iso-8859-1');
        
        const text = decoder.decode(buffer);
        return MidiFileParser(text);
    }

    // TODO:
    function handlePlayback() {

        // this needs to be changed, not now though
        var plyr = new MidiPlayerInterface.Player(function(event:any) {
            // console.log(event);
        });

        plyr.loadFile(url);

        plyr.play();
        
        // var midiJSON = midi.toJSON();
        // setPlaying(!playing);
        // console.log(playing);
        // var synths:Array<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>> = [];
        // if(playing) {
        //     console.log(midiJSON);
            
        //     midiJSON.tracks.forEach((track) => {
        //         const synth = new Tone.PolySynth(Tone.Synth).toDestination();
        //         synths.push(synth);
        //         track.notes.forEach((note) => {
        //             console.log(note);
        //             synth.triggerAttackRelease(
        //                 note.name,
        //                 note.duration,
        //                 note.time + Tone.now(),
        //                 note.velocity
        //             );
        //         });
        //         console.log('played');
        //     });
        // }
        // else {
        //     while(synths.length) {
        //         const synth = synths.shift();
        //         synth?.disconnect();
        //     }
        // }
    } 

    

    return(
        <div>
        <button onClick={dontHandlePlayback}>Play me</button>
        </div>
    )
}

export default Playback;