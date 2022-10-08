import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { IRoom } from './rooms';


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
    userInfo: user ? user : null,
    state:'initial',
    Msg:''
}


const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{ 
        logout:(state)=>{
            state.userInfo = null
           localStorage.removeItem('user')
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

        builder.addCase(signInUser.pending,(state)=>{
            state.state = 'loading'
        })
        builder.addCase(signInUser.fulfilled,(state, action)=>{
            console.log(action)
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
        const json:AxiosResponse = await axios.post('http://localhost:3002/signup',value)
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
        const json:AxiosResponse = await axios.post('http://localhost:3002/login',value)
        localStorage.setItem('user', JSON.stringify(json.data))
        return json.data
      } catch (error) {
        console.log(error)
        return rejectWithValue(error)
      }
    }
)


export const addFavorite = createAsyncThunk<IRoom,string>('User/addFavorite', async (id)=>{
    try{
        const json = await axios.get('http://localhost:3002')
        return json.data
    }catch(error){
        console.log(error)
    }
})



