import React, { useState } from 'react';
import styles from './user.module.css';
import { useAppSelector } from "../../../Redux/Store/hooks";
import { RootState } from "../../../Redux/Store/store";
import {Link} from 'react-router-dom';

interface Iroom {
  availability: boolean,
  description: string,
  n_beds: number,
  name: string,
  photos: string[],
  place: string,
  price: number,
  reservationId: string,
  reviews: string[],
  services: string[],
  type: string,
  userAdminId: string,
  _id: string
}

interface Ireserve {
  check_in: string,
  check_out: string,
  roomId: string,
  totalPrice: number,
  userId: string,
  _id: string

}
const User = () => {

  const user = useAppSelector((state: RootState) => state.auth.userInfo);
  console.log(user)
  const [render, setRender] = useState("");

  return (
    <div className={styles.user}>
      <div className={styles.userContainer}>
        <img src={require('../../../Images/avatardefault_92824.png')} alt='user default' className={styles.img}/>
        <div>{user.email}</div>
        <button onClick={()=>setRender("Favorites")}>Favorites</button>
        <button onClick={()=>setRender("Reservations")}>My reservations</button>
      </div>
        <div className={styles.userInfo}>
         <div className={(render==="Reservations")? (styles.render): (styles.noRender)}>
          {(user.reservationId?.length)?
            user.reservationId.map((reservation:Ireserve)=> (
              <div>
                <div>Check in: {reservation.check_in.slice(0,10)}</div>
                <div>Check out: {reservation.check_out.slice(0,10)}</div>
                <div>${reservation.totalPrice}</div>
                <Link to={`/rooms/${reservation.roomId}`}>View Room</Link>
              </div>)):
            ('You have no reservations yet') 
          }
         </div>
         <div className={(render==="Favorites")? (styles.render): (styles.noRender)}>
          {(user.roomFavorites?.length)?
            user.roomFavorites.map((room:Iroom)=> (
              <div>
                <div>{room.name}</div>
                <div>{room.description}</div>
                <div>{room.n_beds} bed</div>
              </div>)):
            ('You have no favorite room yet') 
          }
         </div>
        </div>
    </div>
  )
}

export default User