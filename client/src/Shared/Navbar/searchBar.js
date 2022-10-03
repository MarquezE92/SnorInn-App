import React, { useState } from "react";

import style from './searchBar.module.css'
import {useAppDispatch} from '../../Redux/Store/hooks'
import {getRoomsByName} from '../../Redux/slice/rooms'


export default function SearchBar(){

    const [search, setSearch] = useState('')
    const dispatch = useAppDispatch()

    const handleChange=(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(getRoomsByName(search))
    }

    


    return(
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            value={search} 
            className={style.input} 
            placeholder="Search by name..." 
            onChange={handleChange}/>
        </form>
        </>
    )
}