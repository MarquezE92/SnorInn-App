import React, { useState, ChangeEvent, FormEvent} from "react";
import HomeCarousel from "./Carousel";
import style from './Home.module.css';
import HomeSearchBar from "./HomeSearchBar";


const Home =()=>{

    return(
        <div className={style.fondo}>   
            <header className={style.homeInfo}>
            <h1>Find the best place to stay...</h1>
            </header>
            <HomeSearchBar/>
            <div className={style.homeInfo2}>
            <h2>The best ones</h2>
            </div>
            <HomeCarousel/>
        </div>
    )

}


export default Home