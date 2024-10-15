import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {postsModel}from "@/models/postsModel" 
import { Post } from '@/models/postModel';

export const postsApi:any = createApi({
    reducerPath: "postsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints:(builder) => ({
        posts: builder.query<postsModel[], void>({
            query: () => '/posts'
        }),
        searchPost: builder.query<Post, string>({
            query: (value) => `/posts/search?q=${value}`
        }),
        getPostsBYUserID: builder.query<Post, string>({
            query: (id:any) => `/posts/user/${id}`
        }),
    })
})

export const { usePostsQuery, useSearchPostQuery,useGetPostsBYUserIDQuery } = postsApi;




