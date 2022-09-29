import React, { useState } from "react";
import { useDispatch } from "react-redux";
import style from './searchBar.module.css'
import { GetRoom } from "../../Redux/Actions";


export default function SearchBar(){

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    const handleChange=(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    const handleSearch=(e)=>{
        e.preventDefault()
        dispatch(GetRoom(search))
    }


    return(
        <>
        <form onSubmit={handleSearch}>
            <input type="text" value={search} className={style.input} placeholder="buscador..." onChange={handleChange}/>
        </form>
        </>
    )
}