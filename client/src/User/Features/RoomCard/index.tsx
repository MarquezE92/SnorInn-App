import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

const RoomCard = ()=> {

interface IRoom {
    place: string,
    n_beds: number,
    price: number,
    services: string[],
    photo: string,
    rating: number
};

const services: string[] = ['air-conditioned', 'TV', 'WiFi', 'safe-box', 'parking'];

const Room:IRoom = {
	place: 'Dorá Hotel',
	n_beds: 3,
	price: 3500,
	services,
	photo: 'https://dorahotel.com.ar/templates/republica/images/pagina/contenido/habitaciones/fichas/triple_standard/01.jpg?f=310322',
	rating: 4
};

return (
	<div className={styles.RoomCardContainer}>
	 <img src={Room.photo} alt="Room" className={styles.Img}/>
	 <div className={styles.secondColumnDiv}>
	  <div className={styles.upperSection}>
	   <div id={styles.place}>{Room.place}</div>
	   <div>☆ {Room.rating}</div>
	  </div>
	  <div >
	   <div className={styles.beds}>{Room.n_beds} Beds</div>
	   <ul>
	 	{Room.services?.map((service:string, i:number)=> (
	 		 		<li key={i}>✓{service}</li>
	 		 		))}
	   </ul>
	  </div>
	  <div className={styles.bottomSection}>
	   <button className={styles.viewButton}>
	    <Link to='/detail' className={styles.viewLink} >View</Link>
	   </button>
	   <div>${Room.price}</div>
	  </div>
	 </div>
	</div>
	)

}

export default RoomCard;