import React from "react";
import styles from "./contact.module.css";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const Contact = () => {
	return(
		<div className={styles.contactContainer}>
			<h1 className={styles.header}>Contact with Snor Inn!</h1>
			
			<div className={styles.subtitleContainer}>
				<div className={styles.subtitle}><BsFillArrowRightCircleFill className={styles.icon}/>Our email contact<div className={styles.wordE}>snorinn.2022@gmail.com</div></div>
			</div>
			<div className={styles.text}>
				Our staff of specialists are here to assist you with any trouble. We are  glad to be at the service of our community!. <br/>
            <a className={styles.infoItem} target='_blank' href="mailto:snorinn.2022@gmail.com?subject=Questions+about">Contact us</a>
				
			</div>

		</div>
		)
}

export default Contact;