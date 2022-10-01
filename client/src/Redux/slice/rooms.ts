import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export interface IRoom{
    _id: string;
    type:string[];
    place: string;
    n_beds: number;
    price: number;
    availability: boolean;
    name: string;
    photos: any;
    services: string[];
    rating: number;
    reviews: Object[]
    description: string;
}

interface IState{
    Rooms:IRoom[];
    Room:IRoom|{}
}

const initialState:IState={
    Rooms:[],
    Room:{}
}

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers:{
        setRooms :(state, action:PayloadAction<IRoom[]>)=>{
            state.Rooms = action.payload
        },
        setRoom :(state, action:PayloadAction<IRoom>)=>{
            state.Room = action.payload
        },
        addCreatedRoom:(state, action:PayloadAction<IRoom>)=>{
            state.Rooms.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllRooms.fulfilled,(state, action)=>{
            state.Rooms = action.payload
        });
        builder.addCase(createRoom.fulfilled,(state, action)=>{
            state.Rooms.push(action.payload)
        })
    }
})

export const {setRooms, setRoom, addCreatedRoom} = roomSlice.actions
export default roomSlice.reducer


export const getAllRooms = createAsyncThunk<IRoom[]>('rooms/getAllRooms', async ()=>{
    try{
        const json = await axios.get('http://localhost:3002/rooms')
        return json.data
    }catch(error){
        console.log(error)
    }
})

export const createRoom = createAsyncThunk<IRoom,Partial<IRoom>>('rooms/createRoom', async (value)=>{
    try{
        const json = await axios.post('http://localhost:3002/rooms',value)
        console.log(json.data)
        return json.data
    }catch(error){
        console.log(error)
    }
})