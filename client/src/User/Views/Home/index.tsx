import React from "react";
import style from './Home.module.css'


const Home =()=>{

    return(
        <div className={style.fondo}>
            <div className={style.card}>
                <form>
                    <select>
                        
                        <option disabled selected >place</option>
                        <option value="provincia1">provincia1</option>
                        <option value="provincia2">provincia2</option>
                        <option value="provincia3">provincia3</option>
                        <option value="provincia4">provincia4</option>
                    </select>
                    
                    <select>
                        <option disabled selected>n° beds</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    
                    <select>
                        <option disabled selected>category</option>
                        <option value="basic">basic</option>
                        <option value="standard">standard</option>
                        <option value="premiun">premiun</option>
                    </select>
                    
                    <button className={style.learn_more}>
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