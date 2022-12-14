import React, {ChangeEvent} from 'react';
import styles from './index.module.css';
import SearchBar from '../SearchForm/searchBar';

import {useAppDispatch} from '../../../Redux/Store/hooks'
import { sortRoomsByPrice, sortRoomsByRating} from '../../../Redux/slice/rooms'

type props ={
    jump:()=>void
}

const SortBy = ({jump}:props)=> {

    const dispatch = useAppDispatch()
    
    
    function sortByPrice(e:ChangeEvent<HTMLSelectElement>){
        e.preventDefault()
        dispatch(sortRoomsByPrice(e.target.value))
        jump()
    }
    
    function sortByRating(e:ChangeEvent<HTMLSelectElement>){
        e.preventDefault()
        dispatch(sortRoomsByRating(e.target.value))
        jump()
    }

    
	return(
        <div className={styles.principalContainer}>
        <div className={styles.sortDiv}>
            <select onChange={sortByPrice} className={styles.select} defaultValue='Order by price'>
                <option disabled value='Order by price' >Order by price</option>
                <option value="Cheaper">Cheaper</option>
                <option value="More Expensive">More Expensive</option>
            </select>

            <select onChange={sortByRating} className={styles.select} defaultValue='Order by rating'>
                <option disabled  value='Order by rating'>Order by rating</option>
                <option value="More Popular">More Popular</option>
                <option value="Less Popular">Less Popular</option>
            </select>
            <SearchBar
            jump = {jump}
            />
		</div>
        </div>
		)
	
}

export default SortBy;