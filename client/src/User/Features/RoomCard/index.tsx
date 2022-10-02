import {Link} from 'react-router-dom';
import styles from './index.module.css';
import { beds } from './database.js';
import SortBy from '../SortBy';
import SearchForm  from '../SearchForm';



const RoomCard = () => {




const roomInfo =  beds.map((el) => {return {
 	 place: el.place,
 	 n_beds: el.n_beds,
    price: el.price,
    services: el.services,
    photo: el.photo,
    rating: el.rating
}})
console.log(roomInfo)

// interface IRoom {
//     place: string,
//     n_beds: number,
//     price: number,
//     services: string[],
//     photo: string,
//     rating: number
// };

// const services: string[] = ['air-conditioned', 'TV', 'WiFi', 'safe-box', 'parking'];

// const Room:IRoom = {
// 	place: 'Dorá Hotel',
// 	n_beds: 3,
// 	price: 3500,
// 	services,
// 	photo: 'https://dorahotel.com.ar/templates/republica/images/pagina/contenido/habitaciones/fichas/triple_standard/01.jpg?f=310322',
// 	rating: 4
// };



return (
	<div className={styles.pageContainer}>
		<SearchForm />
		<SortBy />
		
	<div className={styles.mainDiv}>
		{roomInfo?.map((el:any) => {return <div className={styles.RoomCardContainer} key={el.name}>
			<div className={styles.imgContainer}><img src={el.photo} alt='not found'/> </div>
			 <div className={styles.upperSection}>
			  <div id={styles.place}>{el.place}</div>
			  <div>☆ {el.rating}</div>
			 </div>
			 <div >
			  <div className={styles.beds}>{el.n_beds} Beds</div>
			  <ul>
				{el.services}
				{/* // ?.map((service:string, i:number)=> ( */}
				{/* // 			 <li key={i}>✓{service}</li>
				// 			 ))} */}
			  </ul>
			 </div>
			 <div className={styles.bottomSection}>
			  <button className={styles.viewButton}>
			   <Link to='/detail' className={styles.viewLink} >View</Link>
			  </button>
			  <div>${el.price}</div>
			 </div>
			</div>
		})}
	 
	
	</div>
	</div>
	)

}

export default RoomCard;