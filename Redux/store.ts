'use client';

import { configureStore } from '@reduxjs/toolkit';
import { isAuthApi } from './featuers/isAuthApi';
import { userApi } from './featuers/userApi';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { usersApi } from './featuers/usersApi';
import currentUserReducer from './featuers/currentUser';
import settingsReducer from './featuers/settings';
import { postApi } from './featuers/postApi';
import { postsApi } from './featuers/postsApi';
import { productsApi } from './featuers/productsApi';
import { productApi } from './featuers/productApi';
export const store = configureStore({
    reducer: {
        currentUser: currentUserReducer,
        settings: settingsReducer,
        [isAuthApi.reducerPath]: isAuthApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,   
        [postApi.reducerPath]: postApi.reducer,
        [postsApi.reducerPath]: postsApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
     
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([usersApi.middleware, userApi.middleware, isAuthApi.middleware,postApi.middleware,postsApi.middleware,productApi.middleware,productsApi.middleware]),

})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
