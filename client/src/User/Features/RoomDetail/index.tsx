import React from 'react';
import styles from './index.module.css';


const RoomDetail = ()=> {

interface IRoom {
	type: string,
    place: string,
    location: string,
    n_beds: number,
    price: number,
    services: string[],
    photos: string[],
    rating: number,
    reviews: string[]
};

const services: string[] = ['air-conditioned', 'TV', 'WiFi', 'safe-box', 'parking'];

const photos: string[] = ['https://dorahotel.com.ar/templates/republica/images/pagina/contenido/habitaciones/fichas/triple_standard/01.jpg?f=310322',
'https://dorahotel.com.ar/templates/republica/images/pagina/contenido/habitaciones/fichas/triple_standard/05.jpg?f=310322',
'https://dorahotel.com.ar/templates/republica/images/pagina/contenido/habitaciones/fichas/triple_standard/02.jpg?f=310322'];

const reviews: string[] = ['Great', `I can't wait to come back`]

const Room:IRoom = {
	type: 'Standard',
	place: 'Dorá Hotel',
	location: '963 Maipú St., Buenos Aires City, Argentina',
	n_beds: 3,
	price: 3500,
	services,
	photos,
	rating: 4,
	reviews
};

return (
	<>
	<div className={styles.photosDiv}>
		{Room.photos?.map((photo:string, i:number)=> (
	 		 		<img key={i} src={photo} alt={`slide ${i}`} className={styles.photo}/>
	 		 		))}
	</div>
	<div className={styles.infoContainer}>
	 <div>
		<h1 id={styles.place}>{Room.place}</h1>
		<h3>{Room.location}</h3>
		<div id={styles.reserveContainer}>
			<div id={styles.price}>
			Only ${Room.price}
			</div>
			<button id={styles.reserveBtn}>
			Reserve Now
			</button>
		</div>
	 </div>
	 <div>
		<h2>{Room.type}</h2>
		<h2>{Room.n_beds} beds</h2>
		{Room.services?.map((service:string, i:number)=> (
	 		 		<h2 key={i}>✓ {service}</h2>
	 		 		))}
	    
	 </div>
	 <div>
	 	<h1>Reviews: {Room.rating}☆</h1>
	 	{Room.reviews?.map((review:string, i:number)=> (
	 		 		<h2 key={i} className={styles.review}>-"{review}"</h2>
	 		 		))}
	 </div>
	</div>
	</>
	)
};

export default RoomDetail;