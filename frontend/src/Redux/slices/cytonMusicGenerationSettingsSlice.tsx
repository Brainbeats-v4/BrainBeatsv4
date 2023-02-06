import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Interfaces from '../../util/Interfaces'
import { InstrumentTypes, NoteDurations } from '../../util/Enums'

// Initial null state (where NULL is -99 and does not pertain to an instrument or duration)
const initialState:Interfaces.CytonSettings = {
    instruments: {
      _00: InstrumentTypes.NULL,
      _01: InstrumentTypes.NULL,
      _02: InstrumentTypes.NULL,    
      _03: InstrumentTypes.NULL,
      _04: InstrumentTypes.NULL,
      _05: InstrumentTypes.NULL,
      _06: InstrumentTypes.NULL,    
      _07: InstrumentTypes.NULL,
    },

    durations: {
      _00: NoteDurations.NULL,
      _01: NoteDurations.NULL,
      _02: NoteDurations.NULL,    
      _03: NoteDurations.NULL,
      _04: NoteDurations.NULL,
      _05: NoteDurations.NULL,
      _06: NoteDurations.NULL,    
      _07: NoteDurations.NULL,
    },
    
    bpm: 120,
} 

// Apply the provided preset, returned the populated state
function apply(state: any, ins1:number, ins2:number, ins3:number, ins4:number, ins5:number, ins6:number, ins7:number, ins8:number, 
                dur1:number, dur2:number, dur3:number, dur4:number, dur5:number, dur6:number, dur7:number, dur8:number, 
                bpm:number){
  let tempState = {
    instruments: {
        _00: ins1,
        _01: ins2,
        _02: ins3,
        _03: ins4,
        _04: ins5,
        _05: ins6,
        _06: ins7,
        _07: ins8,
    },

    durations: {
        _00: dur1,
        _01: dur2,
        _02: dur3,
        _03: dur4,
        _04: dur5,
        _05: dur6,
        _06: dur7,
        _07: dur8,
    },
    
    bpm: bpm,
  }
  
  return tempState;
}

// Setting presets, passes int values for each instruments, durations, and then tempo
function doQuickSet(state: any, setting: string) {
  switch (setting) {
        case "slow":
            return apply(state, -3, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 2, 3, 4, 100);
        case "med":
            return apply(state, -3, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 2, 3, 4, 120);
        case "quick":
            return apply(state, 4, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 2, 3, 4, 140);
        case "fast":
            return apply(state, -3, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 2, 3, 4, 160);
        default:
            return apply(state, -3, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 2, 3, 4, 120);
    }
}

export const cytonMusicGenerationSettingsSlice = createSlice({
  name: 'cytonMusicGenerationSettingsSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Interfaces.CytonSettings>) => {
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


export const { set, quickSet, unset } = cytonMusicGenerationSettingsSlice.actions

export default cytonMusicGenerationSettingsSlice.reducer