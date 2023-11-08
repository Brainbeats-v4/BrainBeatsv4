// We will not be using this file. We will be using
// Component/Playback/Playback.tsx
import { Midi } from '@tonejs/midi'

export default async function trackPlayback(midiFile: string) {

    console.log("Loading midi file...");

    // load a midi file in the browser
    const midi = await Midi.fromUrl(midiFile);
    console.log("midi is:", midi)

    //the file name decoded from the first track
    const name = midi.name;

    //get the tracks
    midi.tracks.forEach((track: any) => {
        //tracks have notes and controlChanges

        //notes are an array
        const notes = track.notes
        notes.forEach((note: any) => {
            console.log({ note });
            //note.midi, note.time, note.duration, note.name
        })

        //the control changes are an object
        //the keys are the CC number
        // track.controlChanges[64]

        //they are also aliased to the CC number's common name (if it has one)
        track.controlChanges.sustain.forEach((cc: any) => {
            // cc.ticks, cc.value, cc.time
        })

        //the track also has a channel and instrument
        //track.instrument.name
    })

}
