import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

type Props = {
    _id: string;
    n_beds: number;
    price: number;
    name: string;
    photos: any;
    services: string[];
    rating: number;
};

const Card = ({photos, name, rating, n_beds, services, price, _id}:Props)=> {


return (
	<div className={styles.RoomCardContainer}>
	 <img src={photos[0]} alt="habitación" className={styles.Img}/>
	 <div className={styles.secondColumnDiv}>
	  <div className={styles.upperSection}>
	   <div id={styles.place}>{name}</div>
	   <div>☆ {rating}</div>
	  </div>
	  <div className={styles.middleSection}>
	   <div className={styles.beds}>{n_beds} Beds</div>
	   <ul>
	 	{services?.map((service, i)=> (
	 		 		<li key={i}>✓{service}</li>
	 		 		))}
	   </ul>
	  </div>
	  <div className={styles.bottomSection}>
	   <button className={styles.viewButton}>
	    <Link to={`/rooms/${_id}`} className={styles.viewLink} >View</Link>
	   </button>
	   <div>${price}</div>
	  </div>
	 </div>
	</div>
	)

}

export default Card;