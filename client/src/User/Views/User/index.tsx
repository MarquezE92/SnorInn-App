import React, { useState } from "react";
import styles from "./user.module.css";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { RootState } from "../../../Redux/Store/store";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsFillBinocularsFill, BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

interface Iroom {
  availability: boolean;
  description: string;
  n_beds: number;
  name: string;
  photos: any;
  place: string;
  price: number;
  reservationId: string;
  reviews: string[];
  services: string[];
  type: string;
  userAdminId: string;
  _id: string;
}

interface Ireserve {
  check_in: string;
  check_out: string;
  roomId: string;
  totalPrice: number;
  userId: string;
  _id: string;
}
const User = () => {
  const user = JSON.parse(localStorage.getItem('user')!);
  const [render, setRender] = useState("");

  const totalReservations: Ireserve[] = user.reservationId;
  const lastReservation: number = totalReservations.length;
  const pages: number = Math.ceil(lastReservation/5);
  const lastReservations: Ireserve[] = (totalReservations.length > 5) ?
        totalReservations.slice(((pages-1)*5), lastReservation) :
        totalReservations;
  


  const [currentPage, setCurrentPage] = useState(pages-1);
  const [reservations, setReservations] = useState(lastReservations);

  const handlePageClick = (p:number)=>{
    if(p < pages && p >= 0) {
      setCurrentPage(p);
    setReservations(totalReservations.slice((p*5),(p*5)+5))
    }
    
  }

  return (
    <div className={styles.mainDiv}>
      <div className={styles.user}>
        <div className={styles.userContainer}>
          <div className={styles.cardContainer}>
            <img
              src={require("../../../Images/avatardefault_92824.png")}
              alt="user default"
              className={styles.img}
            />
            <div>{user.email}</div>
            <button
              onClick={() => setRender("Favorites")}
              className={styles.button}
            >
              Favorites
            </button>
            <button
              onClick={() => setRender("Reservations")}
              className={styles.button}
            >
              My reservations
            </button>
          </div>
        </div>
        <div className={styles.userInfo}>
          <div
            className={
              render === "Reservations" ? styles.render : styles.noRender
            }
          >
            <div className={styles.arrowContainer}>
              <BsFillCaretLeftFill onClick={()=>handlePageClick(currentPage -1)} className={currentPage? styles.activated : styles.deactivated}/>
              <BsFillCaretRightFill onClick={()=>handlePageClick(currentPage +1)} className={(currentPage === (pages-1))? styles.deactivated : styles.activated}/>
            </div>
            {reservations?.length
              ? reservations.map((reservation: Ireserve) => (
                  <div className={styles.reservationContainer}>
                    <div className={styles.linksContainer}>
                      <Link to={`/rooms/${reservation?.roomId}`}><BsFillBinocularsFill className={styles.viewIcon}/></Link>
                      <Link to={`/reviewForm/${reservation?._id}`} className={styles.reviewBtn}>Add review</Link>
                    </div>
                    <div className={styles.infoContainer}>
                      <div>🡺 Check in: {reservation?.check_in.slice(0, 10)}</div>
                      <div>🡸 Check out: {reservation?.check_out.slice(0, 10)}</div>
                      <div>Total amount: ${reservation?.totalPrice}</div>
                    </div>
                  </div>
                ))
              : <div className={styles.emptyMsg}>You have no reservations yet</div>}
          </div>
          <div
            className={render === "Favorites" ? styles.render : styles.noRender}
          >
            {user.roomFavorites?.length
              ? user.roomFavorites.map((room: Iroom) => (
                
                  <button className={styles.roomCard}>
                    <NavLink to={`/rooms/${room._id}`}>
                      <h3>{room.name}</h3>
                      <div>${room.price} per night</div>
                      <div>{room.n_beds} bed</div>
                      <img src={room.photos.url}/>
                    </NavLink>
                  </button>
                ))
              : <div className={styles.emptyMsg} id={styles.favOnly}>You have no favorite room yet</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
