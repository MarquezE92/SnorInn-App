import React from "react";
import styles from "./aboutUs.module.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const AboutUs = () => {
	return(
		<div className={styles.aboutContainer}>
			<h1 className={styles.header}>Your rest starts with Snor Inn!</h1>
			
			<div className={styles.subtitleContainer}>
				<div className={styles.subtitle}><BsFillArrowRightCircleFill className={styles.icon}/>Are you looking for a room? We make it <div className={styles.wordE}>SIMPLE</div></div>
				<div className={styles.subtitle}><BsFillArrowRightCircleFill className={styles.icon}/>Do you have a room to rent? This is <div className={styles.wordE}>YOUR PLACE</div></div>
			</div>
			<div className={styles.text}>
				We are THE site in Argentina that offer the possibility to connect all those who have a space or place intended
				to host tourists (be they: in houses, hotels, hostels, bed and breakfast...), and those tourists who want to find 
				their best place to rest. <br/>
				We make available all the necessary information to decide which is the best place for you. And we do it simple, 
				quick and safely, with an electronic payment platform which give security to the owner and the guest.
			</div>
		</div>
		)
}

export default AboutUs;