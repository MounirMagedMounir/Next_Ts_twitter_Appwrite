import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '@/models/productModel';

export const productApi: any = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    endpoints: (builder) => ({
        getProductByID: builder.query<Product, string>({
            query: (id) => `/products/${id}`
        }),
        addProduct: builder.mutation({
            query: (product:Product) => ({
                url: `products/add`,
                method: "POST",
                body: {
                    title: product.title,
                    price: product.price,

                },
            }),
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `products/${product.id}`,
                method: "PUT",
                body:{
                    title: product.title,
                    price: product.price,
                },
            }),
        }),
        deleteproduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: "DELETE",
            }),
        }),
    })
})

export const { useGetProductByIDQuery, useUpdateProductMutation, useAddProductMutation, useDeleteProductMutation, } = productApi;
