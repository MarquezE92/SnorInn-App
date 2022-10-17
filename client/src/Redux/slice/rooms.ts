import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Iinput } from '../../User/Views/User/AddReview/AddReview';

export interface IRoom{
    _id: string;
    userAdminId:string;
    type:string;
    place: string;
    n_beds: number;
    price: number;
    unavailableDates: string[];
    name: string;
    photos: any;
    services: any;
    rating: number;
    reviews: Object;
    description: string;
}

interface IState{
    Rooms:IRoom[];
    RoomsQuery:IRoom[];
    Room:IRoom,

}

const initialState:IState={
    Rooms:[],
    RoomsQuery:[],
    Room:{
        _id: '',
        userAdminId:'',
        type: '',
        place: '',
        n_beds: 0,
        price: 0,
        unavailableDates: [],
        name: '',
        photos: '',
        services: [''],
        rating: 0,
        reviews: {},
        description: ''
    },
}

export const roomSlice = createSlice({
    name:'rooms',
    initialState,
    reducers:{
        setRooms :(state, action:PayloadAction<IRoom[]>)=>{
            state.Rooms = action.payload
        },

        setEmptyRooms :(state)=>{
            state.RoomsQuery = []
        },

        sortRoomsByPrice :(state, action:PayloadAction<string>)=>{
            state.Rooms = action.payload === 'Cheaper' ?
            state.Rooms.sort((a:any , b:any )=> {
                if (a.price === b.price) {
                    return 0;
                  }
                  if (a.price > b.price) {
                    return 1;
                  }
                  return -1;
                }) :
            state.Rooms.sort((a:any, b:any) => {
                if (b.price === a.price) {
                    return 0;
                  }
                  if (b.price < a.price) {
                    return -1;
                  }
                  return 1;
                }) 
        },

        sortRoomsByRating :(state, action:PayloadAction<string>)=>{
            state.Rooms = action.payload === 'More Popular' ?
            state.Rooms.sort((a:any , b:any )=> {
                if (a.rating === b.rating) {
                    return 0;
                  }
                  if (a.rating < b.rating) {
                    return 1;
                  }
                  return -1;
                }) :
            state.Rooms.sort((a:any, b:any) => {
                if (b.rating === a.rating) {
                    return 0;
                  }
                  if (b.rating > a.rating) {
                    return -1;
                  }
                  return 1;
                })
        },

        setDetailRoom :(state, action:PayloadAction<IRoom>)=>{
            state.Room = action.payload
        },
        setNameRooms :(state, action:PayloadAction<string>)=>{
            state.Rooms = state.Rooms.filter(el=>el.name.includes(action.payload))
        },

        addCreatedRoom:(state, action:PayloadAction<IRoom>)=>{
            state.Rooms.push(action.payload)
        },

        editRoom:(state, action:PayloadAction<IRoom>)=>{
            state.Room = action.payload
        },

        deleteRoom:(state, action:PayloadAction<string>)=>{
            state.Rooms = state.Rooms.filter(el=> el._id !== action.payload)
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getRoomsByPage.fulfilled,(state, action)=>{
            state.Rooms = action.payload
        });
        
        builder.addCase(getRoomsByAllQuery.fulfilled,(state, action)=>{
            state.RoomsQuery = action.payload
        });

        builder.addCase(getRoomsByPlace.fulfilled,(state, action)=>{
            state.Rooms = action.payload
        });

        builder.addCase(getRoomsByName.fulfilled,(state, action)=>{
            state.RoomsQuery = action.payload
        });

        builder.addCase(getDetailRoom.fulfilled,(state, action)=>{
            state.Room = action.payload
        });
        builder.addCase(addReview.fulfilled,(state, action)=>{
            if(action.payload !== undefined){
                state.Room.reviews = [...state.Room.reviews, action.payload]
            } 
            console.log(state.Room.reviews)
        });

        builder.addCase(editRoom.fulfilled,(state, action)=>{
            state.Room = action.payload
        });
        builder.addCase(createRoom.fulfilled,(state, action)=>{
            state.Rooms.push(action.payload)
        });
        builder.addCase(deleteRoom.fulfilled,(state, action:any)=>{
            state.Rooms = state.Rooms.filter(el=> el._id !== action.payload)
        });
    }
})

export const {setRooms, setEmptyRooms, setDetailRoom, addCreatedRoom, sortRoomsByPrice, sortRoomsByRating, setNameRooms /*setRoomsByAllQuery*/} = roomSlice.actions
export default roomSlice.reducer


export type Query ={
    place:string;
    name:string;
    n_beds:string;
    page:number;
    type:string
}

export const getRoomsByPage = createAsyncThunk<IRoom[]>('rooms/getRoomsByPage', async ()=>{
    try{
        const json = await axios.get(`/allrooms`)
        return json.data
    }catch(error){
        console.log(error)
    }
})

export const getRoomsByPlace = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByPlace', async (value)=>{

    const url = `/rooms`
    if(value.place){
        const json = await axios.get(url+`/${value.place}`)
            
        return json.data.docs
    }
   
})

export const getRoomsByName = createAsyncThunk<IRoom[],any>('rooms/getRoomsByName', async (value)=>{
    
    const url = `/allrooms`
        const json = await axios.get(url+`${value? `?name=${value}`:''}`)
        return json.data
    
})

export const getRoomsByAllQuery = createAsyncThunk<IRoom[],Partial<Query>>('rooms/getRoomsByAllQuery', async (value)=>{
    
    //const url = `/rooms`
    if(value.place){
        const json = await axios.get(`/rooms/${value.place}?n_beds=${value.n_beds}&type=${value.type}`)
        return json.data.docs
    }
    
})

export const getDetailRoom = createAsyncThunk<IRoom, any>('room/getDetailRoom', async (_id) => {
    
    try{
        const json = await axios.get(`/room/${_id}`)
        return json.data
    }catch(error){
        console.log(error)
    }
}) 

export const createRoom = createAsyncThunk<IRoom,Partial<IRoom>>('rooms/createRoom', async (value)=>{
    try{
        const json = await axios.post(`/rooms/${value.idAdmin}`,value)
        console.log(value)
        return json.data
    }catch(error){
        console.log(error)
    }
})

export const editRoom = createAsyncThunk<IRoom,Partial<IRoom>>('rooms/editRoom', async (value)=>{
    try{
        const json = await axios.put(`/rooms/${value._id}`, value)
        return json.data
    }catch(error){
        console.log(error)
    }
})

export const deleteRoom = createAsyncThunk<IRoom,any>('rooms/deleteRoom', async (_id)=>{
    try{
        await axios.delete(`/room/${_id}`)
        return _id
    }catch(error){
        console.log(error)
    }

})


export const addReview = createAsyncThunk<any, Iinput>('rooms/addReview', async (value)=>{
    try{
        const json = await axios.post('http://localhost:3002/reviewsByClient', value)
        return json.data
    }catch(error:any){
        Swal.fire("Oh No!", error.response.data.error, "error");
        console.log(error)
    }
})

export const getReview = createAsyncThunk<any, string>('rooms/getReview', async (value)=>{
    try{
        const json = await axios.get('http://localhost:3002/reviewsByClient')
        return json.data
    }catch(error){
        console.log(error)
    }
})








   