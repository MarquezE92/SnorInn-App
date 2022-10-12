import { configureStore } from "@reduxjs/toolkit";
import rooms from "../slice/rooms";
//import authSlice from "../slice/authSlice"
import users from '../slice/user'
import admin from '../slice/authSlice'


export const store = configureStore({
    reducer:{
       rooms,   
       users,
       admin
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch