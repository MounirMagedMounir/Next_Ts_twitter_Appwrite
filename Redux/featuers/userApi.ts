import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/models/userModel';

export const userApi: any = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getUserByID: builder.query<User, string>({
            query: (id) => `/users/${id}`
        }),
        addUser: builder.mutation({
            query: (user:User) => ({
                url: `users/add`,
                method: "POST",
                body: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                },
            }),
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `users/${user.id}`,
                method: "PUT",
                body:{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                },
            }),
        }),
        deleteuser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useGetUserByIDQuery, useUpdateUserMutation, useAddUserMutation, useDeleteuserMutation, } = userApi;
