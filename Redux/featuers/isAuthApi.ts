import { setUserLocalStorge } from '@/data/local/webData';
import { setTokenCookies } from '@/helper/cookies';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Login } from './currentUser';

export const isAuthApi: any = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({  
        login: builder.mutation({
            query: (user) => ({
                url: "auth/login",
                method: "POST",
                body:{
                    username: user.Username,
                    password: user.Password,}
                 ,
            }),  async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    setTokenCookies(data.token);
                    setUserLocalStorge("user",data);
                    dispatch(Login(data)); 
                } catch (error) {}
              },
        }),
    })
})

export const { useLoginMutation,  } = isAuthApi;



