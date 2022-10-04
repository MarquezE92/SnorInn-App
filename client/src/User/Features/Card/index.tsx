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
	<Link to={`/rooms/${_id}`} className={styles.viewLink}>
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
	   
	   <div className={styles.price}>${price}</div>
	  </div>
	 </div>
	</div>
	</Link>
	)

}

export default Card;