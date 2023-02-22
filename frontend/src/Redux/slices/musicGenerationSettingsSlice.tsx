import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Interfaces from '../../util/Interfaces'
import { InstrumentTypes, NoteDurations, KeyGroups } from '../../util/Enums'
import type { RootState } from '../store'

// Initial null state (where NULL is -99 and does not pertain to an instrument or duration)
const initialState:Interfaces.MusicSettings = {
  deviceSettings: {
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
  },
  
    octaves: 1,
    numNotes: 7,
    bpm: 120,
    keyGroup: "Major",
    scale: "A",
} 

// Apply the provided preset, returned the populated state
function apply(deviceSettings:Interfaces.GanglionSettings|Interfaces.CytonSettings, bpm:number, octaves:number, numNotes:number, keyGroup:string, scale:string){
  let tempState = {
    deviceSettings,
    numNotes, 
    octaves,
    bpm,
    keyGroup,
    scale,
  }
  
  return tempState;
}

// Setting presets, passes int values for each instruments, durations, and then tempo
function doQuickSet(state: any, setting: string) {
  var settings:Interfaces.CytonSettings|Interfaces.GanglionSettings;
  switch (setting) {
        case "slow":
          if((Object.keys(state.deviceSettings.instruments).length / 2) === 8) {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3,
                _04: -3,
                _05: 1,
                _06: 2,
                _07: 3
              },
              durations: {
                _00: 2,
                _01: 1,
                _02: 1,
                _03: 0,
                _04: 2,
                _05: 1,
                _06: 1,
                _07: 0
              }
            }
          }
          else {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3
              },
              durations: {
                _00: 2,
                _01: 1,
                _02: 1,
                _03: 0,
              }
            }
          }
          return apply(settings, 100, 1, 7, 'Minor', 'F');
        case "med":
          if((Object.keys(state.deviceSettings.instruments).length / 2) === 8) {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3,
                _04: -3,
                _05: 1,
                _06: 2,
                _07: 3
              },
              durations: {
                _00: 2,
                _01: 2,
                _02: 1,
                _03: 1,
                _04: 2,
                _05: 2,
                _06: 1,
                _07: 1
              }
            }
          }
          else {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3
              },
              durations: {
                _00: 2,
                _01: 2,
                _02: 1,
                _03: 1,
              }
            }
          }
            return apply(settings, 120, 1, 7, 'Minor', 'F');
        case "quick":
          if((Object.keys(state.deviceSettings.instruments).length / 2) === 8) {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3,
                _04: -3,
                _05: 1,
                _06: 2,
                _07: 3
              },
              durations: {
                _00: 3,
                _01: 3,
                _02: 2,
                _03: 2,
                _04: 3,
                _05: 3,
                _06: 2,
                _07: 2
              }
            }
          }
          else {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3
              },
              durations: {
                _00: 3,
                _01: 3,
                _02: 2,
                _03: 2,
              }
            }
          }
          return apply(settings, 140, 1, 7, 'Major', 'F');
        case "fast":
          if((Object.keys(state.deviceSettings.instruments).length / 2) === 8) {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3,
                _04: -3,
                _05: 1,
                _06: 2,
                _07: 3
              },
              durations: {
                _00: 4,
                _01: 4,
                _02: 3,
                _03: 3,
                _04: 4,
                _05: 4,
                _06: 3,
                _07: 3
              }
            }
          }
          else {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3
              },
              durations: {
                _00: 4,
                _01: 4,
                _02: 3,
                _03: 3,
              }
            }
          }
          return apply(settings, 160, 2, 14, 'Major', 'F');
        default:
          if((Object.keys(state.deviceSettings.instruments).length / 2) === 8) {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3,
                _04: -3,
                _05: 1,
                _06: 2,
                _07: 3
              },
              durations: {
                _00: 2,
                _01: 1,
                _02: 1,
                _03: 0,
                _04: 2,
                _05: 1,
                _06: 1,
                _07: 0
              }
            }
          }
          else {
            settings = {
              instruments: {
                _00: -3,
                _01: 1,
                _02: 2,
                _03: 3
              },
              durations: {
                _00: 2,
                _01: 1,
                _02: 1,
                _03: 0,
              }
            }
          }
          return apply(settings, 100, 1, 7, 'Minor', 'F');
    }
}

export const musicGenerationSettingsSlice = createSlice({
  name: 'musicGenerationSettingsSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Interfaces.MusicSettings>) => {
      state.deviceSettings = action.payload.deviceSettings;
      state.bpm = action.payload.bpm;
      state.numNotes = action.payload.numNotes;
      state.octaves = action.payload.octaves;
      state.keyGroup = action.payload.keyGroup;
      state.scale = action.payload.scale;
    },
    quickSet: (state, action: PayloadAction<string>) => {
      let temp = doQuickSet(state, action.payload);

      state.deviceSettings = temp.deviceSettings; 
      state.bpm = temp.bpm;
      state.octaves = temp.octaves;
      state.numNotes = temp.numNotes;
      state.keyGroup = temp.keyGroup;
      state.scale = temp.scale;

    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, quickSet, unset } = musicGenerationSettingsSlice.actions

export const getSettings = (state: RootState) => state.musicGenerationSettingsSlice;

export default musicGenerationSettingsSlice.reducer