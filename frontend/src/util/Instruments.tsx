/**
* @fileoverview A sample library and quick-loader for tone.js
*
* @author N.P. Brosowsky /(nbrosowsky@gmail.com)
* https://github.com/nbrosowsky/tonejs-instruments
*/

/*  This library referenced from the github link above is recreated in typescript to fit BrainBeats, some of these functions are
    not necessarily useful for our case, but can be incredibly useful when scaling the project and adding new instruments, for example,
    if there is collaboration with the music department, you could add new sounds to the project and then use whatever extension deemed
    fit for the sound files and then assign them with the newExt function. If you ARE interested in adding new sounds, just add the samples
    into the samples folder under an instrument name and define them with the IInstrument interface. */

import * as Tone from 'tone'

/*  These two interfaces can be moved to the interfaces util, but the arguments interface won't be used elsewhere and I don't think that
    the instrument one will be either, but I could be wrong. */
export interface IInstrument {
    'A7'?:string,
    'A1'?:string,
    'A2'?:string,
    'A3'?:string,
    'A4'?:string,
    'A5'?:string,
    'A6'?:string,
    'A#7'?:string,
    'A#1'?:string,
    'A#2'?:string,
    'A#3'?:string,
    'A#4'?:string,
    'A#5'?:string,
    'A#6'?:string,
    'B7'?:string,
    'B1'?:string,
    'B2'?:string,
    'B3'?:string,
    'B4'?:string,
    'B5'?:string,
    'B6'?:string,
    'C1'?:string,
    'C2'?:string,
    'C3'?:string,
    'C4'?:string,
    'C5'?:string,
    'C6'?:string,
    'C7'?:string,
    'C8'?:string,
    'C#7'?:string,
    'C#1'?:string,
    'C#2'?:string,
    'C#3'?:string,
    'C#4'?:string,
    'C#5'?:string,
    'C#6'?:string,
    'D7'?:string,
    'D1'?:string,
    'D2'?:string,
    'D3'?:string,
    'D4'?:string,
    'D5'?:string,
    'D6'?:string,
    'D#7'?:string,
    'D#1'?:string,
    'D#2'?:string,
    'D#3'?:string,
    'D#4'?:string,
    'D#5'?:string,
    'D#6'?:string,
    'E7'?:string,
    'E1'?:string,
    'E2'?:string,
    'E3'?:string,
    'E4'?:string,
    'E5'?:string,
    'E6'?:string,
    'F7'?:string,
    'F1'?:string,
    'F2'?:string,
    'F3'?:string,
    'F4'?:string,
    'F5'?:string,
    'F6'?:string,
    'F#7'?:string,
    'F#1'?:string,
    'F#2'?:string,
    'F#3'?:string,
    'F#4'?:string,
    'F#5'?:string,
    'F#6'?:string,
    'G7'?:string,
    'G1'?:string,
    'G2'?:string,
    'G3'?:string,
    'G4'?:string,
    'G5'?:string,
    'G6'?:string,
    'G#7'?:string,
    'G#1'?:string,
    'G#2'?:string,
    'G#3'?:string,
    'G#4'?:string,
    'G#5'?:string,
    'G#6'?:string,
    
}

export interface IArgs {
    instruments?:Array<IInstrument>|IInstrument,
    baseUrl?:string,
    onload?:any,
    ext?:string,
    minify?:boolean
}

export const bassElectric:IInstrument = {
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'E1': 'E1.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'G1': 'G1.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]'
};
export const bassoon:IInstrument = {
    'A4': 'A4.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]'
};
export const cello:IInstrument = {
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'B2': 'B2.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]'

};
export const clarinet:IInstrument = {
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D6': 'D6.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]'

};
export const contrabass:IInstrument = {
    'C2': 'C2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'G1': 'G1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]'
};
export const flute:IInstrument = {
    'A6': 'A6.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'E6': 'E6.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]'
};
export const frenchHorn:IInstrument =  {
    'D3': 'D3.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'A1': 'A1.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
};
export const guitarAcoustic:IInstrument = {
    'F4': 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'B2': 'B2.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds3.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]'

};
export const guitarElectric:IInstrument = {
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]'
};
export const guitarNylon:IInstrument = {
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G5': 'G3.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'B1': 'B1.[mp3|ogg]',
    'B2': 'B2.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]'
};
export const harmonium:IInstrument = {
    'C2': 'C2.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]'
};
export const harp:IInstrument =  {
    'C5': 'C5.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D6': 'D6.[mp3|ogg]',
    'D7': 'D7.[mp3|ogg]',
    'E1': 'E1.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F6': 'F6.[mp3|ogg]',
    'F7': 'F7.[mp3|ogg]',
    'G1': 'G1.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A6': 'A6.[mp3|ogg]',
    'B1': 'B1.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B5': 'B5.[mp3|ogg]',
    'B6': 'B6.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]'
};
export const organ:IInstrument = {
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'A1': 'A1.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'C1': 'C1.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]'
};
export const piano:IInstrument = {
    'A7': 'A7.[mp3|ogg]',
    'A1': 'A1.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A6': 'A6.[mp3|ogg]',
    'A#7': 'As7.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'A#5': 'As5.[mp3|ogg]',
    'A#6': 'As6.[mp3|ogg]',
    'B7': 'B7.[mp3|ogg]',
    'B1': 'B1.[mp3|ogg]',
    'B2': 'B2.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'B5': 'B5.[mp3|ogg]',
    'B6': 'B6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'C1': 'C1.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C#7': 'Cs7.[mp3|ogg]',
    'C#1': 'Cs1.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'C#6': 'Cs6.[mp3|ogg]',
    'D7': 'D7.[mp3|ogg]',
    'D1': 'D1.[mp3|ogg]',
    'D2': 'D2.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D6': 'D6.[mp3|ogg]',
    'D#7': 'Ds7.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'D#6': 'Ds6.[mp3|ogg]',
    'E7': 'E7.[mp3|ogg]',
    'E1': 'E1.[mp3|ogg]',
    'E2': 'E2.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'E6': 'E6.[mp3|ogg]',
    'F7': 'F7.[mp3|ogg]',
    'F1': 'F1.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'F6': 'F6.[mp3|ogg]',
    'F#7': 'Fs7.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    'G7': 'G7.[mp3|ogg]',
    'G1': 'G1.[mp3|ogg]',
    'G2': 'G2.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'G6': 'G6.[mp3|ogg]',
    'G#7': 'Gs7.[mp3|ogg]',
    'G#1': 'Gs1.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    'G#6': 'Gs6.[mp3|ogg]'
};
export const saxophone:IInstrument = {
    'D#5': 'Ds5.[mp3|ogg]',
    'E3': 'E3.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'G3': 'G3.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'G#4': 'Gs4.[mp3|ogg]',
    'G#5': 'Gs5.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'B3': 'B3.[mp3|ogg]',
    'B4': 'B4.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C#3': 'Cs3.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'C#5': 'Cs5.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]'

};
export const trombone:IInstrument = {
    'A#3': 'As3.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C#2': 'Cs2.[mp3|ogg]',
    'C#4': 'Cs4.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'G#2': 'Gs2.[mp3|ogg]',
    'G#3': 'Gs3.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]',
    'A#2': 'As2.[mp3|ogg]'

};
export const trumpet:IInstrument = {
    'C6': 'C6.[mp3|ogg]',
    'D5': 'D5.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'F4': 'F4.[mp3|ogg]',
    'F5': 'F5.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A#4': 'As4.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]'
};
export const tuba:IInstrument = {
    'A#2': 'As2.[mp3|ogg]',
    'A#3': 'As3.[mp3|ogg]',
    'D3': 'D3.[mp3|ogg]',
    'D4': 'D4.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'F1': 'F1.[mp3|ogg]',
    'F2': 'F2.[mp3|ogg]',
    'F3': 'F3.[mp3|ogg]',
    'A#1': 'As1.[mp3|ogg]'
};
export const violin:IInstrument = {
    'A3': 'A3.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'A6': 'A6.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'E4': 'E4.[mp3|ogg]',
    'E5': 'E5.[mp3|ogg]',
    'E6': 'E6.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'G6': 'G6.[mp3|ogg]'

};
export const xylophone:IInstrument = {
    'C8': 'C8.[mp3|ogg]',
    'G4': 'G4.[mp3|ogg]',
    'G5': 'G5.[mp3|ogg]',
    'G6': 'G6.[mp3|ogg]',
    'G7': 'G7.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]'

};
export const instrumentArr:Array<IInstrument> = [bassElectric, bassoon, cello, clarinet, contrabass, flute, frenchHorn, guitarAcoustic, guitarElectric, guitarNylon, harmonium, harp, organ, piano, saxophone, trombone, trumpet, tuba, violin, xylophone];

export var SampleLibrary = {
    minify: false,
    ext: '.[mp3|ogg]', // use setExt to change the extensions on all files // do not change this variable //
    baseUrl: '/samples/',
    list: ['bass-electric','bassoon','cello','clarinet','contrabass','flute','french-horn','guitar-acoustic','guitar-electric','guitar-nylon', 'harmonium','harp','organ','piano','saxophone','trombone','trumpet','tuba','violin','xylophone'],
    onload: null,
    instrumentArr, //[bassElectric, bassoon, cello, clarinet, contrabass, flute, frenchHorn, guitarAcoustic, guitarElectric, guitarNylon, harmonium, harp, organ, piano, saxophone, trombone, trumpet, tuba, violin, xylophone],

    setExt: function (newExt:string) {
        var i
        for (i = 0; i < this.instrumentArr.length; i++) {
            for(var property in this.instrumentArr[i]) {
                var soundPath = this.instrumentArr[i][property as keyof IInstrument]
                /*  This if statement is just so typescript can know that the object at this instance isn't undefined,
                    it never will be, but typescript needs to make things difficult sometimes. Once it enters, it's just
                    going to replace the original extension value (.[mp3|ogg]) with whatever we define it to be,
                    usually .mp3 */
                if(soundPath) {
                    soundPath.replace(this.ext, newExt)
                    this.instrumentArr[i][property as keyof IInstrument] = soundPath;
                }
            }
        }
        this.ext = newExt;
        return console.log("sample extensions set to " + this.ext)
    },

    load: function (arg:IArgs) {
        var userArguments, rt, i;
        (arg) ? userArguments = arg: userArguments = {};
        userArguments.instruments = userArguments.instruments || this.instrumentArr;
        userArguments.baseUrl = userArguments.baseUrl || this.baseUrl;
        userArguments.onload = userArguments.onload || this.onload;

        // update extensions if arg given
        if (userArguments.ext) {
            if (userArguments.ext !== this.ext) {
                this.setExt(userArguments.ext)
            }
            userArguments.ext = this.ext
        }

        rt = [];

        // if an array of instruments is passed...
        if (Array.isArray(userArguments.instruments)) {
            for (i = 0; i < userArguments.instruments.length; i++) {
                var newT:any = userArguments.instruments[i];
                /* Minimizing the number of samples to load can be useful, but we don't care all that much
                    for our purposes right now, I'm leaving the code block here for now, it needs to be converted
                    to typescript if we want to use it in the future */
                //Minimize the number of samples to load
                // if (this.minify === true || userArguments.minify === true) {
                //     var minBy = 1;
                //     if (Object.keys(newT).length >= 17) {
                //         minBy = 2
                //     }
                //     if (Object.keys(newT).length >= 33) {
                //         minBy = 4
                //     }
                //     if (Object.keys(newT).length >= 49) {
                //         minBy = 6
                //     }

                //     var filtered = Object.keys(newT).filter(function (_, i) {
                //         return i % minBy != 0;
                //     })
                //     filtered.forEach(function (f) {
                //         delete newT[f]
                //     })

                // }


                rt.push(new Tone.Sampler(
                    newT, {
                        baseUrl: userArguments.baseUrl + userArguments.instruments[i] + "/",
                        onload: userArguments.onload
                    }

                ))
            }

            return rt
            // if a single instrument name is passed...
        } else {
            newT = userArguments.instruments;

            //Minimize the number of samples to load
            // if (this.minify === true || userArguments.minify === true) {
            //     minBy = 1;
            //     if (Object.keys(newT).length >= 17) {
            //         minBy = 2
            //     }
            //     if (Object.keys(newT).length >= 33) {
            //         minBy = 4
            //     }
            //     if (Object.keys(newT).length >= 49) {
            //         minBy = 6
            //     }

            //     filtered = Object.keys(newT).filter(function (_, i) {
            //         return i % minBy != 0;
            //     })
            //     filtered.forEach(function (f) {
            //         delete newT[f]
            //     })
            // }

            var s = new Tone.Sampler(
                newT, {
                    baseUrl: userArguments.baseUrl + userArguments.instruments + "/",
                    onload: userArguments.onload
                }
            )

            return s
        }

    },
    
}
