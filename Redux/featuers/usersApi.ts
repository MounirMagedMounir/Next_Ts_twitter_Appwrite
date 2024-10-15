import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {usersModel}from "@/models/usersModel" 
import { User } from '@/models/userModel';

export const usersApi:any = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints:(builder) => ({
        users: builder.query<usersModel[], void>({
            query: () => '/users'
        }),
        searchUser: builder.query<User, string>({
            query: (value) => `/users/search?q=${value}`
        }),
        filterUser: builder.query<User, string>({
            query: (prop:any) => `/users/filter?key=${prop.key}&value=${prop.value}`
        }),
    })
})

export const { useUsersQuery, useSearchUserQuery,useFilterUserQuery } = usersApi;




