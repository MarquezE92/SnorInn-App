import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./notFound.module.css";
import { BsFillEmojiDizzyFill } from "react-icons/bs";

const NotFound = () => {

	const navigate = useNavigate();

	useEffect(
  () => {
    setTimeout(() => {navigate('/', {replace:true})}, 3000)
  	}, []
	);

	return(
		<div className={styles.notFoundContainer}>
			<div className={styles.notFoundMsg}><BsFillEmojiDizzyFill className={styles.notFoundIcon}/>Error 404: Page Not Found<BsFillEmojiDizzyFill className={styles.notFoundIcon}/></div>
		</div>
		)
	}

export default NotFound;