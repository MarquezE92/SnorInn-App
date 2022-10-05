import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PendingActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import axios from 'axios';

interface Users {
    email: string,
    password: string,
}
interface IUsers {
    users: Users[],
}

const initialState:IUsers = {
    users: []
}

export const signUpUser:any = createAsyncThunk('local-singup', async (body)=>{
    console.log(body)
    const res = await axios.post('http://localhost:3002/signup', body
    )
    return res.data
})
export const signInUser:any = createAsyncThunk('local-singup', async (body)=>{
    console.log(body)
    const res = await axios.post('http://localhost:3002/login', body
    )
    return res.data
})


const authSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            addUser:(state, action:PayloadAction<Users>)=>{
                state.users.push(action.payload)
            },
        },
        extraReducers: {
           
        }
})


export const {addUser} = authSlice.actions;

export default authSlice.reducer