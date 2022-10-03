import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export interface IRoom{
    _id: string;
    type:string;
    place: string;
    n_beds: number;
    price: number;
    availability: boolean;
    name: string;
    photos: any;
    services: string[];
    rating: number;
    reviews: Object
    description: string;
}

interface IState{
    Rooms:IRoom[];
    Room:IRoom

}

const initialState:IState={
    Rooms:[],
    Room:{
        _id: '',
        type: '',
        place: '',
        n_beds: 0,
        price: 0,
        availability: true,
        name: '',
        photos: '',
        services: [''],
        rating: 0,
        reviews: {},
        description: ''
    }
}

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers:{
        setRooms :(state, action:PayloadAction<IRoom[]>)=>{
            state.Rooms = action.payload
        },
        setDetailRoom :(state, action:PayloadAction<IRoom>)=>{
            state.Room = action.payload
        },
        addCreatedRoom:(state, action:PayloadAction<IRoom>)=>{
            state.Rooms.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getRoomsByPage.fulfilled,(state, action)=>{
            state.Rooms = action.payload
        });
        builder.addCase(getRoomsByPlace.fulfilled,(state, action)=>{
            state.Rooms = action.payload
        })
        builder.addCase(getDetailRoom.fulfilled,(state, action)=>{
            state.Room = action.payload
        })
        builder.addCase(createRoom.fulfilled,(state, action)=>{
            state.Rooms.push(action.payload)
        });
    }
})

export const {setRooms, setDetailRoom, addCreatedRoom} = roomSlice.actions
export default roomSlice.reducer


type Query ={
    place:string;
    name:string;
    n_beds:string;
    type:string
}

export const getRoomsByPage = createAsyncThunk<IRoom[],Number>('rooms/getRoomsByPage', async (value)=>{
    try{
        const json = await axios.get(`http://localhost:3002/rooms?page=${value}`)
        return json.data.docs
    }catch(error){
        console.log(error)
    }
})

export const getRoomsByPlace = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByPlace', async (value)=>{

    const url = `http://localhost:3002/rooms`
    if(value.place){
        const json = await axios.get(url+`/${value.place}`)
            
        console.log(json.data.docs)
        return json.data.docs
    }
   
})

export const getRoomsByName = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByName', async (value)=>{
    
    const url = `http://localhost:3002/rooms`
    if(value.place){
        const json = await axios.get(url+`?name=${value.name}`)
        
        console.log(json.data.docs)
        return json.data.docs
    }
    
})

// export const getRoomsByN_beds = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByN_beds', async (value)=>{
    
//     const url = `http://localhost:3002/rooms`
//     if(value.place){
//         const json = await axios.get(url+`?n_beds=${value.n_beds}`)
        
//         console.log(json.data.docs)
//         return json.data.docs
//     }
    
// })

// export const getRoomsByType = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByType', async (value)=>{

//     const url = `http://localhost:3002/rooms`
//     if(value.place){
//         const json = await axios.get(url+`?type=${value.type}`)
            
//         console.log(json.data.docs)
//         return json.data.docs
//     }
   
// })

export const getRoomsByAllQuery = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByAllQuery', async (value)=>{

    const url = `http://localhost:3002/rooms`
    if(value.place){
        const json = await axios.get(url+`/${value.place}?n_beds=${value.n_beds || 1}&type=${value.type || 'standar'}`)
            
        console.log(json.data.docs)
        return json.data.docs
    }
    
})

export const getDetailRoom = createAsyncThunk<IRoom, any>('room/getDetailRoom', async (_id) => {
    try{
        const json = await axios.get(`http://localhost:3002/room/${_id}`)
        console.log(json.data)
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