import React, { useState, ChangeEvent, FormEvent} from "react";
import {useAppDispatch} from '../../../Redux/Store/hooks';
import {useNavigate} from 'react-router-dom';
import {getRoomsByAllQuery} from '../../../Redux/slice/rooms';
import style from './Home.module.css';
import {places} from './constantes';
import {Query} from '../../../Redux/slice/rooms'

const Home =()=>{

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [select, setSelect] = useState<Query>({
        place:'',
        name:'',
        n_beds:'',
        page:1,
        type:''
    });

    const findBy=(e:ChangeEvent<HTMLSelectElement>)=>{
        setSelect({
            ...select,
            [e.target.name] : [e.target.value]
        })

    };

   /* const searchBy = (e:any)=>{
        e.preventDefault()
    };*/

    const handleSubmit = (e: FormEvent)=>{
        e.preventDefault();
        if(!select.place || !select.n_beds || !select.type)
        return alert("Select ALL 3 (place, number of beds and category) to search for a room.");
        dispatch(getRoomsByAllQuery(select))
        setTimeout(()=>{navigate('/rooms', {replace:true})}, 2000);
    };


    
    return(
        <div className={style.fondo}>
            <div className={style.card}>
                <form onSubmit={handleSubmit}>
                  
                    <select name="place" onChange={findBy}  defaultValue="place">
                        <option disabled value='place'>PLACE</option>
                        {
                            places?.map((place:string, i:number)=> (
                        <option key={i} value={place}>{place}</option>
                        ))
                        }
                    </select>
                  
                    <select name="n_beds" onChange={findBy} defaultValue="n_beds">
                        <option value= 'n_beds'disabled >N° BEDS</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select name="type" onChange={findBy} defaultValue="category" >
                        <option value='category' disabled >CATEGORY</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                    </select>
                    

                    <button className={style.learn_more} type="submit" onClick={handleSubmit} >
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