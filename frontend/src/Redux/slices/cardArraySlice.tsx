import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {Card} from '../../util/Interfaces'
import type { RootState } from '../store'

const initialState: Card[] = [];

export const cardArraySlice = createSlice({
  name: 'cardArraySlice',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Card[]>) => {
      state = action.payload;
      console.log(state);
    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, unset } = cardArraySlice.actions

export const getSlice = (state: RootState) => state.cardArraySlice;

export default cardArraySlice.reducer