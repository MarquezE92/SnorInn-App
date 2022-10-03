import styles from "./index.module.css";
import SortBy from "../SortBy";
import { useEffect } from "react";
import { getRoomsByPage } from "../../../Redux/slice/rooms";
import { useAppDispatch } from "../../../Redux/Store/hooks";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { RootState } from "../../../Redux/Store/store";
import Card from "../Card";

const RoomCard = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state: RootState) => state.rooms.Rooms);

  console.log(rooms.length)

useEffect(() => {
    if (rooms.length < 1) {
      dispatch(getRoomsByPage(1))}
  }, [])
   
  useEffect(() => {
    return () => {
      dispatch(getRoomsByPage(1));
    }
}, []);


  return (
    <div className={styles.pageContainer}>
      
      <SortBy />

      <div className={styles.mainDiv}>
        {rooms?.map((el) => {
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
        })}
      </div>
    </div>
  );
};

export default RoomCard;

