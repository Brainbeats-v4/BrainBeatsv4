import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Interfaces from '../../util/Interfaces'
import { InstrumentTypes, NoteDurations } from '../../util/Enums'

const initialState:Interfaces.GanglionSettings = {
    instruments: {
      _00: InstrumentTypes.NULL,
      _01: InstrumentTypes.NULL,
      _02: InstrumentTypes.NULL,    
      _03: InstrumentTypes.NULL,
    },

    durations: {
      _00: NoteDurations.NULL,
      _01: NoteDurations.NULL,
      _02: NoteDurations.NULL,    
      _03: NoteDurations.NULL,
    },
    
    bpm: 120,
} 

function apply(state: any, ins1:number, ins2:number, ins3:number, ins4:number, dur1:number, dur2:number, dur3:number, dur4:number, bpm:number){
  let tempState = {
    instruments: {
      _00: ins1,
      _01: ins2,
      _02: ins3,
      _03: ins4,
    },

    durations: {
      _00: dur1,
      _01: dur2,
      _02: dur3,
      _03: dur4,
    },
    
    bpm: bpm,
  }
  
  return tempState;
}

function doQuickSet(state: any, setting: string) {
  switch (setting) {
        case "slow":
            return apply(state, -3, 0, 4, 7, 2, 1, 1, 0, 100);
        case "med":
            return apply(state, -3, 2, 5, 6, 2, 2, 1, 1, 120);
        case "quick":
            return apply(state, 4, 2, 3, 0, 3, 3, 2, 2, 140);
        case "fast":
            return apply(state, -3, 0, 4, 3, 4, 4, 3, 3, 160);
        default:
            return apply(state, -3, 2, 5, 6, 2, 2, 1, 1, 120);
    }

}

export const ganglionMusicGenerationSettingsSlice = createSlice({
  name: 'ganglionMusicGenerationSettingsSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Interfaces.GanglionSettings>) => {
      state = action.payload;
    },
    quickSet: (state, action: PayloadAction<string>) => {
      state = doQuickSet(state, action.payload);
    },
    unset: (state) => {
      state = initialState;
    },
  },
})


export const { set, quickSet, unset } = ganglionMusicGenerationSettingsSlice.actions

export default ganglionMusicGenerationSettingsSlice.reducer