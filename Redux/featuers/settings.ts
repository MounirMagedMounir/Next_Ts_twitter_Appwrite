
'use client';

import { getUserLocalStorge } from '@/data/local/webData';
import {  PaletteMode } from '@mui/material';
import { PayloadAction, createSlice,nanoid } from '@reduxjs/toolkit';

export type settings ={
theme:PaletteMode

}
type InitialState={
    value: settings;
}
const initialState ={
    value:{
        theme:getUserLocalStorge("theme")
   
    }as settings,
    
}as InitialState;

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        changeTheme:(state, action: PayloadAction<PaletteMode>) =>{
            return {
                value: {
                    theme:action.payload,
                   
                }
            }

       
        },

    }
})

export const { changeTheme, } = settingsSlice.actions;

export default settingsSlice.reducer;