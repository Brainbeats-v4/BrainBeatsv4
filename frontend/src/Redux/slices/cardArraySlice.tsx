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
      // Clear the state before we add to it again
      while (state.length > 0) {
        state.pop();
      }
      // state = initialState;
      action.payload.forEach(card => (state.push(card)));
    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, unset } = cardArraySlice.actions

export const getSlice = (state: RootState) => state.cardArraySlice;

export default cardArraySlice.reducer