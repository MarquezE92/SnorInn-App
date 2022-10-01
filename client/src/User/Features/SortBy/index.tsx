import React, {ChangeEvent} from 'react';
import { useState } from 'react';
import styles from './index.module.css';
import SearchBar from '../../../Shared/Navbar/searchBar';

const SortBy = ()=> {

	const [input, setInput] = useState('');

	function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
		setInput(e.target.value)
	}

	return(
		<div className={styles.sortDiv}>
			<select onChange={handleSelect} className={styles.select}>
                <option disabled selected >Order by price</option>
                <option value="Cheaper">Cheaper</option>
                <option value="More Expensive">More Expensive</option>
            </select>
            <select onChange={handleSelect} className={styles.select}>
                <option disabled selected >Order by rating</option>
                <option value="More Popular">More Popular</option>
                <option value="Less Popular">Less Popular</option>
            </select>
            <SearchBar/>
		</div>
		)
	
}

export default SortBy;