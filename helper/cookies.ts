'use server'

import { cookies } from 'next/headers'

export const getTokenCookies = () => {

    try {
        const cookieStore = cookies()
   
      
        const userToken = cookieStore.has('token')
        return userToken   
       
    } catch (error) {

    }
}

export const setTokenCookies = (token: string) => {

    try {
        const cookieStore = cookies()
   
         cookieStore.set('token', `${token}`);
        const userToken = cookieStore.has('token')
        return userToken   
       
    } catch (error) {

    }
}


export const deleteTokenCookies = () => {
    try {
        const cookieStore = cookies()
       cookieStore.delete('token');

    } catch (error: any) {

    }

}

