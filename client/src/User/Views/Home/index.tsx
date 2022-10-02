import React, { useState, ChangeEvent, FormEvent} from "react";
import {useAppDispatch} from '../../../Redux/Store/hooks';
import {useNavigate} from 'react-router-dom';
import {getRoomsByAllQuery} from '../../../Redux/slice/rooms';
import style from './Home.module.css';
import {ISelect, places} from './constantes';


const Home =()=>{

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [select, setSelect] = useState<ISelect>({
        place:'',
        n_beds:'',
        category:''
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
        if(!select.place || !select.n_beds || !select.category)
        return alert("Select ALL 3 (place, number of beds and category) to search for a room.");
        dispatch(getRoomsByAllQuery(select))
        navigate('/rooms', {replace:true});
    };


    
    return(
        <div className={style.fondo}>
            <div className={style.card}>
                <form onSubmit={handleSubmit}>
                  
                    <select name="place" onChange={findBy}>
                        <option disabled selected >PLACE</option>
                        {
                            places?.map((place:string, i:number)=> (
                        <option key={i} value={place}>{place}</option>
                        ))
                        }
                    </select>
                  
                    <select name="n_beds" onChange={findBy}>
                        <option disabled selected>N° BEDS</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select name="category" onChange={findBy}>
                        <option disabled selected>CATEGORY</option>
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premiun">Premiun</option>
                    </select>
                    

                    <button className={style.learn_more} type="submit" /*onClick={searchBy} */>
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