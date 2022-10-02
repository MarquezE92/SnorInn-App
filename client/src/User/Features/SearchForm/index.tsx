import React from 'react';
import style from './index.module.css';

const SearchForm = ()=> {
	return (
		    <div className={style.card}>
                                
                    <select>
                        <option disabled selected >PLACE</option>
                        <option value="provincia1">Bogotá</option>
                        <option value="provincia2">Buenos Aires</option>
                        <option value="provincia3">Montevideo</option>
                        <option value="provincia4">Lima</option>
                    </select>
                  
                    <select>
                        <option disabled selected>N° BEDS</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select>
                        <option disabled selected>CATEGORY</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premiun">Premiun</option>
                    </select>
                
            </div>
		)
}

export default SearchForm;