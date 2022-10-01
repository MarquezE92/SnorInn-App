import React, { useState } from "react";

import style from './searchBar.module.css'



export default function SearchBar(){

    const [search, setSearch] = useState('')
    

    const handleChange=(e)=>{
        e.preventDefault()
        setSearch(e.target.value)
    }

    


    return(
        <>
        <form>
            <input type="text" value={search} className={style.input} placeholder="Search by name..." onChange={handleChange}/>
        </form>
        </>
    )
}