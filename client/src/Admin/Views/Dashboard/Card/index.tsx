import React from "react";
import { useAppDispatch } from "../../../../Redux/Store/hooks";
import styles from "./card.module.css";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteRoom } from "../../../../Redux/slice/rooms";
import { NavLink } from "react-router-dom";
import {useState} from 'react'
import { Modal, Button } from "react-bootstrap";

interface Props {
  _id: string;
  name: string;
  photos: string;
}

const CardAdmin = ({ _id, name, photos }: Props) => {
  const [modal, setModal] = useState(false)


  const dispatch = useAppDispatch();

  const handleDelete = (e: string) => {
    dispatch(deleteRoom(e));
    setTimeout(()=> {window.location.reload()},1000)
  };

  const handleModal = () => {
    setModal(!modal)
  }

  return (
    <>
    <div className={styles.cardContainer}>
    <h3 className={styles.name}>{name} </h3>
      <div className={styles.delete}>
        <button onClick={() => handleModal()}>
          <BsFillTrashFill />
        </button>
      </div>
      <div className={styles.imgDiv}>
        <img src={photos} alt=''/>
      </div>
      <button className={styles.editButton}>
        <NavLink to={`/put/${_id}`}>Edit</NavLink>
      </button>
    </div>
    <Modal show={modal} onHide={() => handleModal()} size="sm" centered>
    <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Room will be delete it permanently
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={() => handleDelete(_id)} variant="danger">Delete</Button>
        <Button onClick={() => handleModal()} variant="secondary">Cancel</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};

export default CardAdmin;
