import { MusicSettings, DataStream4Ch, DataStream8Ch, CytonSettings, GanglionSettings } from "../Interfaces";

import MidiWriter from 'midi-writer-js';

export class MIDIManager {


    public MIDIChannels:MidiWriter.Track[] = [];
    public channel0:any;

    public settings:MusicSettings

    constructor(settings:MusicSettings) {
        var channel0 = new MidiWriter.Track();
        this.channel0 = channel0;
        var channel1 = new MidiWriter.Track();
        var channel2 = new MidiWriter.Track();
        var channel3 = new MidiWriter.Track();
        this.MIDIChannels.push(channel0, channel1, channel2, channel3)
        /*  This block initializes 4 more channels to write MIDI to in the case that
            we are using the cyton board, it does this by looking at the number of channels
            in the instrument setting since it is specific to the device. */
        console.log(Object.keys(settings.deviceSettings.instruments))
        if((Object.keys(settings.deviceSettings.instruments).length / 2) === 8) {
            var channel4 = new MidiWriter.Track();
            var channel5 = new MidiWriter.Track();
            var channel6 = new MidiWriter.Track();
            var channel7 = new MidiWriter.Track();
            this.MIDIChannels.push(channel4, channel5, channel6, channel7)
        }

        this.settings = settings;
        this.initializeSettings(settings);
    }
    
    public initializeSettings(settings:MusicSettings) {
        /* This is just a start, we're going to work on a condition here
           where the number of tempos get set by the type of settings */
        for(var i = 0; i < this.MIDIChannels.length; i++) {
            this.MIDIChannels[i].setTempo(settings.bpm, 0);
            this.MIDIChannels[i].setTimeSignature(4, 4);
        } 
    }

    public returnMIDI() {
        var write = new MidiWriter.Writer(this.MIDIChannels);
        var writeURI = write.dataUri();
        return writeURI;
    }

    /* This function is a helper in order to return the proper type to assign to the
       pitch in the MidiWriter. There may be a better solution to this in the future
       but for now it's practical to use this implementation */
    private definePitch(noteAndOctave:any) {
        var pitch:MidiWriter.Pitch;
        var {note, octave}: {note:string, octave:number} = noteAndOctave;
        switch(note) {
            case 'A':
                pitch = `A${octave}`;
                break;
            case 'A#':
                pitch = `A#${octave}`;
                break;
            case 'B':
                pitch = `B${octave}`;
                break;
            case 'C':
                pitch = `C${octave}`
                break;
            case 'C#':
                pitch = `C#${octave}`
                break;
            case 'D':
                pitch = `D${octave}`
                break;
            case 'D#':
                pitch = `D#${octave}`
                break;
            case 'E':
                pitch = `E${octave}`
                break;
            case 'F':
                pitch = `F${octave}`
                break;
            case 'F#':
                pitch = `F#${octave}`
                break;
            case 'G':
                pitch = `G${octave}`
                break;
            case 'G#':
                pitch = `G#${octave}`
                break;
            default:
                pitch = `A${octave}`
                break;
        }
        return pitch;
    }

    public convertInput(noteData:any[]) {
        for(var i = 0; i < noteData.length; i++) {
            var noteDuration:MidiWriter.Duration = '1';
            if (noteData[i].writer.noteType === "sixteenth") noteDuration = '16';
            else if (noteData[i].writer.noteType === "eigth") noteDuration = '8';
            else if (noteData[i].noteType === "quarter") noteDuration ='4';
            else if (noteData[i].noteType === "half") noteDuration = '2';
            else if (noteData[i].noteType === "whole") noteDuration = '1';
            var generatedNote;
            var pitch:MidiWriter.Pitch = this.definePitch(noteData[i].noteAndOctave);

            if (noteData[i].noteAndOctave.note === -1) // Rest
                generatedNote = new MidiWriter.NoteEvent({wait: noteDuration, duration: noteDuration, pitch: pitch});
            else
                generatedNote = new MidiWriter.NoteEvent({pitch: pitch, duration: noteDuration});
            this.MIDIChannels[i].addEvent(generatedNote);
        }     
    }
}