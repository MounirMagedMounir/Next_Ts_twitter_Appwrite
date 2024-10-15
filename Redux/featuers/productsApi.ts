import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {productsModel}from "@/models/productsModel" 
import { Product } from '@/models/productModel';

export const productsApi:any = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
    endpoints:(builder) => ({
        products: builder.query<productsModel[], void>({
            query: () => '/products'
        }),
        searchProduct: builder.query<Product, string>({
            query: (value) => `/products/search?q=${value}`
        }),
        getProductsBYCategory: builder.query<Product, string>({
            query: (category:any) => `/products/category/${category}`
        }),
        getProductsCategories: builder.query<Product, string>({
            query: () => `/products/categories/`
        }),
    })
})

export const { useProductsQuery, useSearchProductQuery,useGetProductsBYCategoryQuery ,useGetProductsCategoriesQuery } = productsApi;




