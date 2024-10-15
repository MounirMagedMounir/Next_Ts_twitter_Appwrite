
'use client';

import { getUserLocalStorge } from '@/data/local/webData';
import { PayloadAction, createSlice,nanoid } from '@reduxjs/toolkit';

type User ={
    id:number,
 email: string,
firstName: string,
lastName: string,
gender: string,
image: string,

}
type InitialState={
    value: User;
}
const initialState ={
    value:{
        id:getUserLocalStorge("user").id,
        email:getUserLocalStorge("user").email,
        firstName:getUserLocalStorge("user").firstName,
        lastName: getUserLocalStorge("user").lastName,
        gender: getUserLocalStorge("user").gender,
        image: getUserLocalStorge("user").image,
   
    }as User,
    
}as InitialState;

export const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        logout:()=>{
            return initialState
        },

        Login:(state, action: PayloadAction<User>) =>{
            return {
                value: {
                    id:action.payload.id,
                    email:action.payload.email ,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    gender: action.payload.gender,
                    image:action.payload.image,
                }
            }

       
        },

    }
})

export const { logout,Login, } = currentUserSlice.actions;

export default currentUserSlice.reducer;