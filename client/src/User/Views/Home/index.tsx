import React, {FormEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../Redux/Store/hooks';
import style from './Home.module.css';
import {getAllRooms} from '../../../Redux/slice/rooms';


const Home =()=>{

    const dispatch = useAppDispatch();

    const allRooms = useAppSelector(state=> state.rooms);

    useEffect(()=>{
        dispatch(getAllRooms());
    },[]);

    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault();
        console.log(allRooms.Rooms)
    };

    


    return(
        <div className={style.fondo}>
            <div className={style.card}>
                <form onSubmit={handleSubmit}>
                  
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
                    
                    <button className={style.learn_more} type="submit">
                        <span className={style.circle} aria-hidden="true">
                        <span id={style.arrow} className={style.icon}></span>
                        </span>
                        <span className={style.button_text}>search</span>
                    </button>
                </form>
            </div>
        </div>
    )

}


export default Home