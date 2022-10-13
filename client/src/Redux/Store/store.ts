import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rooms from "../slice/rooms";
//import authSlice from "../slice/authSlice"
import users from '../slice/user'
import admin from '../slice/authSlice'
import {
    persistReducer,
  } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const reducers = combineReducers({
    rooms: rooms,
    admin: admin,
    users: users,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch