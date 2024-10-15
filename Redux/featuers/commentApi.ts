import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Comment } from '@/models/commentModel';
import { commentsModel } from '@/models/commentsModel';

export const commentApi: any = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getCommentByID: builder.query<Comment, string>({
            query: (id) => `/comments/${id}`
        }),
        addComment: builder.mutation({
            query: (comment:Comment) => ({
                url: `comments/add`,
                method: "POST",
                body: {
                    body:comment.body,
                    userId: comment.user.id,
                    postId:comment.postId
                },
            }),
        }),
        updateComment: builder.mutation({
            query: (comment) => ({
                url: `comments/${comment.id}`,
                method: "PUT",
                body:{
                    body:comment.body,
                },
            }),
        }),
        deleteComment: builder.mutation({
            query: (id) => ({  
                url: `comments/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useGetCommentByIDQuery, useGetCommentCommentsQuery,useUpdateCommentMutation, useAddCommentMutation, useDeleteCommentMutation, } = commentApi;
