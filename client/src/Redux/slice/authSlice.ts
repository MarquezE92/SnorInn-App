import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import Swal from "sweetalert2";

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
    try {
        const res = await axios.post('http://localhost:3002/signup', body
        )
        Swal.fire("Good job!", "Your account was created succesfuly!", "success");
        return res.data
    } catch (error:any) {
        console.log(error)
        return Swal.fire("Ups!", error.response.data._message?(error.response.data._message):(error.response.data), "error")   
    }
   
})

export const signInUser:any = createAsyncThunk('local-singup', async (body)=>{

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
        extraReducers:{
            
        }
})


export const {addUser} = authSlice.actions;

export default authSlice.reducer