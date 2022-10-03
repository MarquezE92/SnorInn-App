import React, {ChangeEvent, useEffect} from 'react';
import { useState } from 'react';
import styles from './index.module.css';
import SearchBar from '../../../Shared/Navbar/searchBar';

import {useAppDispatch, useAppSelector} from '../../../Redux/Store/hooks'
import { sortRoomsPrice, getRoomsByPage, sortRoomsRating} from '../../../Redux/slice/rooms'

const SortBy = ()=> {

	const [input, setInput] = useState('');
    const dispatch = useAppDispatch()
    const rooms =  useAppSelector((state)=>state.rooms)
    
    
	function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        setInput(e.target.value)
	}
    
    function sortByPrice(e:ChangeEvent<HTMLSelectElement>){
        e.preventDefault()
        setInput(e.target.value)
        dispatch(sortRoomsPrice(e.target.value))
    }
    
    function sortByRating(e:ChangeEvent<HTMLSelectElement>){
        e.preventDefault()
        setInput(e.target.value)
        dispatch(sortRoomsRating(e.target.value))
    }

    
	return(
        
        <div className={styles.sortDiv}>
            <select onChange={sortByPrice} className={styles.select}>
                <option disabled selected >Order by price</option>
                <option value="Cheaper">Cheaper</option>
                <option value="More Expensive">More Expensive</option>
            </select>

            <select onChange={sortByRating} className={styles.select}>
                <option disabled selected >Order by rating</option>
                <option value="More Popular">More Popular</option>
                <option value="Less Popular">Less Popular</option>
            </select>
            <SearchBar
           
            
            />
		</div>
		)
	
}

export default SortBy;