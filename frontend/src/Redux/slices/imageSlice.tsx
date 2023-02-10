import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as Interfaces from '../../util/Interfaces'
import type { RootState } from '../store'


const initialState = {
    width: 0,
    height: 0,
    color: "",
    description: "",
    urls: {
        raw: "",
        full: "",
        regular: "",
        small: "",
        thumb: "",
    },
}

export const imageSlice = createSlice({
  name: 'imageSlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Interfaces.Picture>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.color = action.payload.color;
      state.description = action.payload.description;
      state.urls = action.payload.urls;
    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, unset } = imageSlice.actions

export const getSettings = (state: RootState) => state.imageSlice;

export default imageSlice.reducer