import { MusicSettings, DataStream4Ch, DataStream8Ch, CytonSettings, GanglionSettings } from "../Interfaces";


import MidiWriter from 'midi-writer-js';

export class MIDIManager {
    public channel0:any ;
    public channel1:any;
    public channel2:any;
    public channel3:any;
    public channel4:any;
    public channel5:any;
    public channel6:any;
    public channel7:any;

    constructor(settings:MusicSettings) {
        this.channel0 = new MidiWriter.Track();
        this.channel1 = new MidiWriter.Track();
        this.channel2 = new MidiWriter.Track();
        this.channel3 = new MidiWriter.Track();
        console.log(Object.keys(settings.deviceSettings.instruments))
        if((Object.keys(settings.deviceSettings.instruments).length / 2) === 8) {
            this.channel4 = new MidiWriter.Track();
            this.channel5 = new MidiWriter.Track();
            this.channel6 = new MidiWriter.Track();
            this.channel7 = new MidiWriter.Track();
        }
    }
    
    public initializeSettings(settings:MusicSettings) {
        /* This is just a start, we're going to work on a condition here
           where the number of tempos get set by the type of settings */
        
        this.channel0.setTempo(settings.bpm);
        this.channel1.setTempo(settings.bpm);
        this.channel2.setTempo(settings.bpm);
        this.channel3.setTempo(settings.bpm);
    
        this.channel0.setTimeSignature(4, 4); 
        this.channel1.setTimeSignature(4, 4); 
        this.channel2.setTimeSignature(4, 4); 
        this.channel3.setTimeSignature(4, 4);     
    }

    public convertInput(data:DataStream8Ch | DataStream4Ch) {
        
    }
}