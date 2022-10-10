import React from "react";
import { useAppDispatch } from "../../../../Redux/Store/hooks";
import styles from "./card.module.css";
import { BsFillXSquareFill } from "react-icons/bs";
import { deleteRoom } from "../../../../Redux/slice/rooms";
import { NavLink } from "react-router-dom";

interface Props {
  _id: string;
  name: string;
  photos: string;
}

const CardAdmin = ({ _id, name, photos }: Props) => {
  const dispatch = useAppDispatch();

  const handleDelete = (e: string) => {
    dispatch(deleteRoom(e));
    window.location.reload();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.name}>{name} </div>
      <div className={styles.delete}>
        <button onClick={() => handleDelete(_id)}>
          <BsFillXSquareFill />
        </button>
      </div>
      <div className={styles.imgDiv}>
        <img src={photos} />
      </div>
      <button className={styles.editButton}>
        <NavLink to={`/put/${_id}`}>Edit</NavLink>
      </button>
    </div>
  );
};

export default CardAdmin;
