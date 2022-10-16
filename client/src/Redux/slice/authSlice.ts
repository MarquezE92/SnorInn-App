import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios, { AxiosResponse } from 'axios'
import { IRoom } from './rooms';
import Swal from "sweetalert2";



export interface IUser{
    email:string;
    password:string;
}

const Admin = JSON.parse(localStorage.getItem('admin')!)



export interface IAdminInfo{
    email:string;
    password:string;
    status:string;
    confirmationCode:String;
    rooms:IRoom[];
    ban:Boolean;
    _id:string;

}

const initialState={
    AdminInfo: Admin ? Admin : {
        email: '',
        password: '',
        status: '',
        confimationCode: '',
        rooms:[],
        ban:false,
        _id: '',
    },
    state:'initial',
    Msg:''
}




const AdminSlice = createSlice({
    name:'Admin',
    initialState,
    reducers:{ 
        logout:(state)=>{
            localStorage.clear()
            state.AdminInfo = initialState;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUpAdmin.pending,(state)=>{
            state.state = 'loading'
        })
        builder.addCase(signUpAdmin.fulfilled,(state, action)=>{
            state.state = 'fullfiled'
            state.AdminInfo = action.payload
            // console.log(action)
        })
        builder.addCase(signUpAdmin.rejected,(state,action)=>{
            state.state = 'rejected'
        })
        

        builder.addCase(signInAdmin.pending,(state)=>{
            state.state = 'loading'
        })
        builder.addCase(signInAdmin.fulfilled,(state, action)=>{
            state.state = 'fullfiled'
            state.AdminInfo = action.payload
            
        })
        builder.addCase(signInAdmin.rejected,(state)=>{
            state.state = 'rejected'
        })
    }
})

export default AdminSlice.reducer
export const {logout} = AdminSlice.actions

//sin registro en base de datos
export const signUpAdmin = createAsyncThunk<IAdminInfo, Partial<IUser>>('Admin/register', async (value, {rejectWithValue}) => {
    try {
        const json:AxiosResponse = await axios.post('http://localhost:3002/signupadmin',value)
        console.log(value)
        Swal.fire("Good job!", "Your account was created succesfuly! Now don't forget to verify your account with the email we sent you", "success");
        localStorage.setItem('admin', JSON.stringify(json.data))
        console.log(json.data)
        return json.data
    } catch (error:any) {
        console.log(error)
        Swal.fire("Ups!", (error.response.data), "error");
        return rejectWithValue(error)
    }
}
)

//registro en base de datos
export const signInAdmin = createAsyncThunk<IAdminInfo, Partial<IUser>>('Admin/login', async (value, {rejectWithValue}) => {
    try {
        const json:AxiosResponse = await axios.post('http://localhost:3002/loginadmin',value)
        localStorage.setItem('admin', JSON.stringify(json.data))
        return json.data
    } catch (error:any) {
        console.log(error)
        Swal.fire("Ups!", (error.response.data), "error");
        return rejectWithValue(error)
      }
    }
)

export const forgetPassword = createAsyncThunk<string, any>('Admin/forgetPassword', async(value)=>{
    try{
        const json:AxiosResponse = await axios.post('http://localhost:3002/forgotPasswordadmin', value)
        Swal.fire("Yes!", 'An email to reset your password will be sent', "success");
        return json.data
    }catch(error:any){
        Swal.fire("Ups!", (error.response.data), "error");
       
    }
})
