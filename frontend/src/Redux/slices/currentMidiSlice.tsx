import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import {Midi} from '../../util/Interfaces'
import type { RootState } from '../store'

const initialState:String = "";

// We store the base64 string for the current midi file loaded into brainbeats
export const currentMidiSlice = createSlice({
  name: 'currentMidiSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<String>) => {
      state = action.payload
      return state;
    },
    unset: (state) => {
      state = initialState;
    }
  },
})


export const { set, unset } = currentMidiSlice.actions
export const getCurrentMidi = (state: RootState) => state.currentMidiSlice;
export default currentMidiSlice.reducer