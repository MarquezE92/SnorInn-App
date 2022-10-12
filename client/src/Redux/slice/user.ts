import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { IRoom } from './rooms';
import Swal from "sweetalert2";



export interface IUser{
    email:string;
    password:string;
    isAdmin:Boolean
}

const user = JSON.parse(localStorage.getItem('user')!)



export interface IUserInfo{
    email:string;
    _id:string;
    isAdmin:Boolean;
    reserva:Object[];
    favorite:Object[]
}

const initialState={
    userInfo: user ? user : {
        confimationCode: '',
        email: '',
        isAdmin: null,
        password: '',
        reservationId: [],
        roomFavorites: [],
        status: '',
        _id: '',
    },
    state:'initial',
    Msg:''
}




const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{ 
        logout:(state)=>{
            localStorage.clear()
            state.userInfo = initialState;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUpUser.pending,(state)=>{
            state.state = 'loading'
            console.log(state.state)
        })
        builder.addCase(signUpUser.fulfilled,(state, action)=>{
            state.state = 'fullfiled'
            state.userInfo = action.payload
            // console.log(action)
        })
        builder.addCase(signUpUser.rejected,(state,action)=>{
            state.state = 'rejected'
            console.log(action)
        })

        builder.addCase(addFavorite.pending, (state)=>{
            state.state = 'loading'
        })
        builder.addCase(addFavorite.fulfilled, (state, action)=>{
            state.state = 'fullfiled'
            const user = JSON.parse(localStorage.getItem('user')!)

            if(user){
                user.roomFavorites = [...user.roomFavorites, action.payload]
                localStorage.setItem('user', JSON.stringify(user))
            }
            
           console.log(user.roomFavorites)
        })

        builder.addCase(payment.pending, (state)=>{
            state.state = 'loading'
        })
        builder.addCase(payment.fulfilled, (state, action)=>{
            state.state = 'fullfiled'
            const user = JSON.parse(localStorage.getItem('user')!)

            if(user){
                user.reservationId = [...user.reservationId, action.payload]
                localStorage.setItem('user', JSON.stringify(user))
            }
            
           console.log(user.reservationId)
        })

        builder.addCase(signInUser.pending,(state)=>{
            state.state = 'loading'
        })
        builder.addCase(signInUser.fulfilled,(state, action)=>{
            state.state = 'fullfiled'
            state.userInfo = action.payload

        })
        builder.addCase(signInUser.rejected,(state)=>{
            state.state = 'rejected'
        })
    }
})

export default UserSlice.reducer
export const {logout} = UserSlice.actions

//sin registro en base de datos
export const signUpUser = createAsyncThunk<IUserInfo, Partial<IUser>>('User/register', async (value, {rejectWithValue}) => {
      try {
        const json:AxiosResponse = await axios.post('https://snor-inn-api.onrender.com/signup',value)
        localStorage.setItem('user', JSON.stringify(json.data))
        return json.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
}
)

//registro en base de datos
export const signInUser = createAsyncThunk<IUserInfo, Partial<IUser>>('User/login', async (value, {rejectWithValue}) => {
    try {
        const json:AxiosResponse = await axios.post('https://snor-inn-api.onrender.com/login',value)
        localStorage.setItem('user', JSON.stringify(json.data))
        return json.data
      } catch (error:any) {
        console.log(error)
        Swal.fire("Ups!", (error.response.data), "error");
        return rejectWithValue(error)
      }
    }
)

export const forgetPassword = createAsyncThunk<string, any>('User/forgetPassword', async(value)=>{
    try{
        const json:AxiosResponse = await axios.post('https://snor-inn-api.onrender.com/forgotPassword', value)
        Swal.fire("Yes!", 'An email to reset your password will be sent', "success");
        return json.data
    }catch(error:any){
        Swal.fire("Ups!", (error.response.data), "error");
       
    }
})


export const addFavorite = createAsyncThunk<IRoom,Object>('User/addFavorite', async (value)=>{
    try{
        const json = await axios.post('https://snor-inn-api.onrender.com/favorites',value)
        Swal.fire("Great!", "You added this room to your favorites!", "success");
        return json.data

    }catch(error){
        console.log(error)
    }
})

export const payment = createAsyncThunk<IRoom,Object>('User/datapeyment', async (value)=>{
    try{
        const json = await axios.post('https://snor-inn-api.onrender.com/dataPeyment',value)
        return json.data
    }catch(error){
        console.log(error)
    }
})



