import {Link} from 'react-router-dom';
import styles from './index.module.css';
//import { beds } from './database.js';
import SortBy from '../SortBy';
import SearchForm  from '../SearchForm';
import { useEffect } from 'react';
import { getRoomsByPage } from '../../../Redux/slice/rooms';
import { useAppDispatch } from '../../../Redux/Store/hooks';
import { useAppSelector } from '../../../Redux/Store/hooks';
import { RootState } from '../../../Redux/Store/store';
import Card from '../Card';


const RoomCard = () => {

const dispatch = useAppDispatch();
const rooms = useAppSelector((state:RootState) => state.rooms.Rooms);

console.log(rooms)
useEffect(()=> {
	dispatch(getRoomsByPage(1))
	
},[])

return (
	<div className={styles.pageContainer}>
		<SearchForm />
		<SortBy />
		
	<div className={styles.mainDiv}>
	{rooms?.map((el) => {
              return (
                <>
                  <Card
				  					_id = {el._id}
                    photos={el.photos}
                    name={el.name}
                    services={el.services.map((el) => el)}
                    rating={el.rating}
                    n_beds={el.n_beds}
					price={el.price}
                  />                  
                </>
              );
            })}
	 
	
	</div>
	</div>
	)

}

export default RoomCard;


// return <div className={styles.RoomCardContainer} key={el.name}>
// 			<div className={styles.imgContainer}><img src={el.photos[0]} alt='not found'/> </div>
// 			 <div className={styles.upperSection}>
// 			  <div id={styles.place}>{el.place}</div>
// 			  <div>☆ {el.rating}</div>
// 			 </div>
// 			 <div >
// 			  <div className={styles.beds}>{el.n_beds} Beds</div>
// 			  <ul>
// 				{el.services}
// 				{/* // ?.map((service:string, i:number)=> ( */}
// 				{/* // 			 <li key={i}>✓{service}</li>
// 				// 			 ))} */}
// 			  </ul>
// 			 </div>
// 			 <div className={styles.bottomSection}>
// 			  <button className={styles.viewButton}>
// 			   <Link to='/detail' className={styles.viewLink} >View</Link>
// 			  </button>
// 			  <div>${el.price}</div>
// 			 </div>
// 			</div>