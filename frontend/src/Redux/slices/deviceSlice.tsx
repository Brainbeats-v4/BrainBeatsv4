import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Interfaces from '../../util/Interfaces'
import type { RootState } from '../store'

// Initial null state (where NULL is -99 and does not pertain to an instrument or duration)
const initialState:String = "cyton";

export const deviceSlice = createSlice({
  name: 'deviceSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<String>) => {
        // console.log("setting state: ", action.payload);
      state = action.payload
      return state;
    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, unset } = deviceSlice.actions

export const getDevice = (state: RootState) => state.deviceSlice;

export default deviceSlice.reducer