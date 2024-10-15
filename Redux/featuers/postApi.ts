import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '@/models/postModel';
import { commentsModel } from '@/models/commentsModel';

export const postApi: any = createApi({
    reducerPath: "postApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getPostByID: builder.query<Post, string>({
            query: (id) => `/posts/${id}`
        }),
        getPostComments: builder.query<commentsModel, string>({
            query: (id) => `/posts/${id}/comments`
        }),
        addPost: builder.mutation({
            query: (post:Post) => ({
                url: `posts/add`,
                method: "POST",
                body: {
                    title: post.title,
                    body:post.body,
                    userId: post.userId,
                    reactions:post.reactions
                },
            }),
        }),
        updatePost: builder.mutation({
            query: (post) => ({
                url: `posts/${post.id}`,
                method: "PUT",
                body:{
                    title: post.title,
                    body:post.body,
                    userId: post.userId,
                    reactions:post.reactions
                },
            }),
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                
                url: `posts/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useGetPostByIDQuery, useGetPostCommentsQuery,useUpdatePostMutation, useAddPostMutation, useDeletePostMutation, } = postApi;
