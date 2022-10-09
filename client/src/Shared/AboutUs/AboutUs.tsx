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
		</div>
		)
}

export default AboutUs;