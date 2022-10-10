import React from 'react';
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/hooks';
import { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import { getDetailRoom} from '../../../Redux/slice/rooms';
import {addFavorite} from '../../../Redux/slice/user'
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

const RoomDetail = ()=> {
	const [modal, setModal] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const {id} = useParams(); 
	const rooms = useAppSelector((state) => state.rooms.Room);
	const user = useAppSelector((state)=>state.auth.userInfo)

	const [fav, setFav]= useState({
		id:id,
		user:user._id
	})


	const handlePay = () => {
		navigate(`/rooms/reserve/${id}`, {replace:true})
	}
	const handleModal = () => {
		setModal(!modal)
	  }

useEffect(() => {
    dispatch(getDetailRoom(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

const addFav = ()=>{
	user._id != ''?
	dispatch(addFavorite(fav)):
	alert('Tienes que iniciar sesion para añadir favoritos')
}
  

return (
	<div className={styles.mainDiv}>
	<div className={styles.card}>

	
	<div className={styles.photosDiv}>
		<img src={rooms.photos} alt="A beautiful room... maybe?" />
		<Button onClick={() => handleModal()} variant="dark">Description</Button>
	</div>
	<div className={styles.infoContainer}>
	 <div className={styles.principalInfo}>
		<h1 className={styles.place}>{rooms.name}</h1>
		<h3>{rooms.place}</h3>
	 </div>
	 <h2>{rooms.type}</h2>
		<h2>{rooms.n_beds} beds</h2>
		<h2>Services:</h2>
	 <div className={styles.servicesContainer}>

		{rooms.services?.map((service:string, i:number)=> (
	 		 		<h2 key={i}>✓ {service}</h2>
	 		 		))}
	 </div>
	 <div>
	 	<h1>Rating: {rooms.rating}☆</h1>
		<button onClick={addFav}>{'<3'}</button>
	 	<div className={styles.reserveContainer}>
			<div className={styles.price}>
			Only ${rooms.price}
			</div>
			<button className={styles.reserveBtn} onClick={() => handlePay()}>
			Reserve now
			</button>
		</div>
	 </div>
	
	 <Modal show={modal} onHide={() => handleModal()}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Room description</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
         {rooms.description}
        </Modal.Body>
        </Modal>

	</div>
	</div>
	</div>
	)
};

export default RoomDetail;