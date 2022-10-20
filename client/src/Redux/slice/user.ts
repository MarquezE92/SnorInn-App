import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { IRoom } from './rooms';
import Swal from "sweetalert2";



export interface IUser{
    email:string;
    password:string;
    google: boolean;
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
    Loading:false
}




const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{ 
        logout:(state)=>{
            localStorage.clear()
            state.userInfo = initialState;
        },
        loading:(state, action)=>{
            state.Loading = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signUpUser.pending,(state)=>{
            state.state = 'loading'
        })
        builder.addCase(signUpUser.fulfilled,(state, action)=>{
            state.state = 'fullfiled'
            
            //state.userInfo = action.payload
            // console.log(action)
        })
        builder.addCase(signUpUser.rejected,(state,action)=>{
            state.state = 'rejected'
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
            
        })

        builder.addCase(removeFavorite.pending, (state)=>{
            state.state = 'loading'
        })
        builder.addCase(removeFavorite.rejected, (state)=>{
            state.state = 'rejected'
            
        })
        builder.addCase(removeFavorite.fulfilled, (state, action)=>{
            state.state = 'fullfiled'
            const user = JSON.parse(localStorage.getItem('user')!)
            if(user){
                user.roomFavorites = user.roomFavorites.filter((el:any)=>el._id!==action.payload._id)
                localStorage.setItem('user', JSON.stringify(user))
            }
            
          
        })

        builder.addCase(payment_reserv.pending, (state)=>{
            state.state = 'loading'
        })
        builder.addCase(payment_reserv.rejected, (state)=>{
            state.state = 'rejected'
        })
        builder.addCase(payment_reserv.fulfilled, (state, action)=>{
            state.state = 'fullfiled'
            const user = JSON.parse(localStorage.getItem('user')!)
            if(user && action.payload!==undefined){
                user.reservationId = [...user.reservationId, action.payload]
                localStorage.setItem('user', JSON.stringify(user))
            }
            
           //console.log(user.reservationId)
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
export const {logout, loading} = UserSlice.actions

//sin registro en base de datos
export const signUpUser = createAsyncThunk<IUserInfo, Partial<IUser>>('User/register', async (value, {rejectWithValue}) => {
      try {
        const json:AxiosResponse = await axios.post('http://localhost:3002/signup',value)
        Swal.fire("Yes!", 'your account was created successfully, now verify your account with the email sent to your email', "success");
        // localStorage.setItem('user', JSON.stringify(json.data))
        return json.data
    } catch (error:any) {
        console.log(error)
        Swal.fire("Ups!", (error.response.data), "error");
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
      } catch (error:any) {
        Swal.fire("Ups!", (error.response.data), "error");
        return rejectWithValue(error)
      }
    }
)

export const forgetPassword = createAsyncThunk<string, any>('User/forgetPassword', async(value)=>{
    try{
        const json:AxiosResponse = await axios.post('http://localhost:3002/forgotPassword', value)
        Swal.fire("Yes!", 'An email to reset your password will be sent', "success");
        return json.data
    }catch(error:any){
        Swal.fire("Ups!", (error.response.data), "error");
       
    }
})


export const addFavorite = createAsyncThunk<IRoom,Object>('User/addFavorite', async (value)=>{
    try{
        const json = await axios.post('http://localhost:3002/favorites',value)
        Swal.fire("Great!", "You added this room to your favorites!", "success");
        return json.data

    }catch(error:any){
        Swal.fire("Ups!", (error.response.data), "error");
    }
})

export const removeFavorite = createAsyncThunk<IRoom,Object>('User/removeFavorite', async (value)=>{
    try{
        const json = await axios.put('http://localhost:3002/favoriteByIdRoom',value)
        Swal.fire("Great!", "You remove this room to your favorites!", "success");
        return json.data

    }catch(error){
        console.log(error)
    }
})

export const payment_reserv = createAsyncThunk<Object,Object>('User/payment_reserv', async (value)=>{
    try{
        const res = await axios.post('http://localhost:3002/dataPeyment',value)
   
            if(res.status===200){
                const json:AxiosResponse = await axios.post('http://localhost:3002/reservation', value)
                Swal.fire("Great!", "Your payment was processed correctly. You'll receive your receipt via mail.", "success");
                return json.data
            }

    }catch(error:any){
        console.log(error)
        Swal.fire("Oh No!", error.response.data.message, "error");
    }
})



