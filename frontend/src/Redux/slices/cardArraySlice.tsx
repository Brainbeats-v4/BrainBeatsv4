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
      var Card:any = {textColor:{r:"", g:"",b:"",a:""}, backgroundColor:{r:"", g:"",b:"",a:""}, url:"", text:"", speed:0};
      if (state.length > 0) state.pop();
      action.payload.forEach(card => (state.push(card)));
    },
    unset: (state) => {
      state = initialState;
    }
  },
})



export const { set, unset } = cardArraySlice.actions

export const getSettings = (state: RootState) => state.cardArraySlice;

export default cardArraySlice.reducer