import React from "react";
import HomeCarousel from "./Carousel";
import style from './Home.module.css';
import HomeSearchBar from "./HomeSearchBar";
import { BsFillArrowDownCircleFill, BsHouseFill } from "react-icons/bs";
const Home =()=>{

    return(
        <div className={style.fondo}>   
            <header className={style.homeInfo}>
            <h1>Find the best place to stay      <BsHouseFill/> </h1>
            </header>
            <HomeSearchBar/>
            <div className={style.homeInfo2}>
            <h2>The best ones <BsFillArrowDownCircleFill/></h2>
            </div>
            <HomeCarousel/>
        </div>
    )

}


export default Home