import styles from "./index.module.css";
import SortBy from "../SortBy";
import { useEffect, useState } from "react";
import { getRoomsByPage, emptyRooms } from "../../../Redux/slice/rooms";
import { useAppDispatch } from "../../../Redux/Store/hooks";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { RootState } from "../../../Redux/Store/store";
import Card from "../Card";
import Paginated from "../Paginated/Paginated";

const RoomCard = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state: RootState) => state.rooms.Rooms);


//-----------------------------ESTADOS LOCALES/FUNCIONES PARA EL PAGINADO----------------------

const [currentPage, setCurrentPage] = useState(1);
const [roomsPerPage, setRoomsPerPage] = useState(6);
const lastRoom:number = currentPage * roomsPerPage;
const firstRoom:number = lastRoom - roomsPerPage;
const currentRooms = rooms.slice(firstRoom, lastRoom);

function paginated(pageNumber:number) {
  setCurrentPage(pageNumber)
};
//------------------------------------------------------------------------------------------

useEffect(() => {
   setTimeout(() => {
    if(currentRooms.length<=0){
      dispatch(getRoomsByPage())
    }
   },1000);

   return ()=>{
    dispatch(emptyRooms())
   }
  },[])
   

  return (
    <div className={styles.pageContainer}>
      
      <SortBy />
    
      <Paginated
      roomsPerPage={roomsPerPage}
      rooms={rooms.length}
      paginated={paginated}
      />

      <div className={styles.mainDiv}>
 
       { Object.keys(currentRooms).length ?

       currentRooms?.map((el) => {
          return (
            <>
              <Card
                _id={el._id}
                photos={el.photos}
                name={el.name}
                services={el.services.map((el) => el)}
                rating={el.rating}
                n_beds={el.n_beds}
                price={el.price}
              />
            </>
          );
        }):
          <div className={styles.spinner}>
              <span></span>
              <span></span>
              <span></span>
          </div>
        }
      </div>
    </div>
  );
};

export default RoomCard;

