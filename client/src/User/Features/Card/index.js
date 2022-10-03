import React from 'react';
import {Link} from 'react-router-dom';
import styles from './index.module.css';

const Card = ({photos, name, rating, n_beds, services, price, id})=> {


return (
	<div className={styles.RoomCardContainer}>
	 <img src={photos[0]} alt="habitación" className={styles.Img}/>
	 <div className={styles.secondColumnDiv}>
	  <div className={styles.upperSection}>
	   <div id={styles.place}>{name}</div>
	   <div>☆ {rating}</div>
	  </div>
	  <div >
	   <div className={styles.beds}>{n_beds} Beds</div>
	   <ul>
	 	{services?.map((service, i)=> (
	 		 		<li key={i}>✓{service}</li>
	 		 		))}
	   </ul>
	  </div>
	  <div className={styles.bottomSection}>
	   <button className={styles.viewButton}>
	    <Link to={`/rooms/${id}`} className={styles.viewLink} >View</Link>
	   </button>
	   <div>{price}</div>
	  </div>
	 </div>
	</div>
	)

}

export default Card;