import React from 'react';
import styles from './index.module.css';
import { useAppDispatch, useAppSelector } from '../../../Redux/Store/hooks';
import { useState, useEffect } from "react";
import {useParams } from 'react-router-dom';
import { getDetailRoom} from '../../../Redux/slice/rooms';
import {addFavorite, removeFavorite} from '../../../Redux/slice/user'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'; 
import { BsFillHeartFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { BsFillStarFill } from "react-icons/bs";


const stars = (s:number):number[]=> {
	let star = 1;
	let repeate: number[] = [1]
	while(star < s) {
		repeate.push(star);
		++star
	}
	return repeate
}

const RoomDetail = ()=> {
	const [modal, setModal] = useState(false);
	const [modal2, setModal2] = useState(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const {id} = useParams(); 
	const rooms = useAppSelector((state) => state.rooms.Room);
	const user = useAppSelector(state=>state.users.userInfo)
	
	const [fav, setFav]= useState({
		roomFavorites:id,
		idClient: user._id
	})
	
	
	const handlePay = () => {
		navigate(`/rooms/reserve/${id}`, {replace:true})
	}
	const handleModal = () => {
		setModal(!modal)
	}
	const handleModal2 = () => {
		setModal2(!modal2)
	}
	
	useEffect(() => {
		dispatch(getDetailRoom(id));
	}, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps
	
	const addFav = ()=>{
		const userLocal = JSON.parse(localStorage.getItem('user')!)
		if(user._id !== ''){
			const room = userLocal.roomFavorites.find((el:any)=>el._id===fav.roomFavorites)
		if( room == undefined ){
			dispatch(addFavorite(fav))
			const userLocal = JSON.parse(localStorage.getItem('user')!)
		}else{
			dispatch(removeFavorite(fav))
		}
	}else{
		alert('YOU NEED TO BE LOGED TO ADD TO FAVORITES')
	}
}
  

return (
	<div className={styles.mainDiv}>
	<div className={styles.card}>

	
	<div className={styles.photosDiv}>
		<img src={rooms.photos.url} alt="A beautiful room... maybe?" />
		<Button onClick={() => handleModal()} variant="dark">Description</Button>
		<Button onClick={() => handleModal2()} variant="dark" className={styles.reviewBtn}>Reviews</Button>
	</div>
	<div className={styles.infoContainer}>
	 <div className={styles.principalInfo}>
	 <div className={styles.placeAndFav}>
		<h1 className={styles.place}>{rooms.name}</h1>
		{
			user.isAdmin ? 
			<></>:
			<button onClick={addFav} className={styles.fav}><BsFillHeartFill className={styles.favIcon}/></button>
		}
		</div>
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
	 	<h1>Rating: {stars(rooms.rating).map(st=> <BsFillStarFill className={styles.star}/>)}</h1>
		
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
        <Modal.Header className={styles.modalHeader} closeButton>
          <Modal.Title>Room description</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
         {rooms.description}
        </Modal.Body>
        </Modal>

    <Modal show={modal2} onHide={() => handleModal2()}  size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header className={styles.modalHeader} closeButton>
        	<Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
        {
            rooms.reviews.map(rev=>(
            		<>
                  <h4>{user.email} {stars(rev.stars).map(st=> <BsFillStarFill className={styles.star}/>)}</h4>
									<p className={styles.comment}>- "{rev.comment}" </p>
								</>                
            	))
          }    
        </Modal.Body>         
         
    </Modal>
	</div>
	</div>
	</div>
	)
};

export default RoomDetail;