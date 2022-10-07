import React, { useEffect } from "react";
import styles from "./paswordSentMessage.module.css";
import {BsFillEmojiWinkFill} from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const PaswordSentMessage = () => {

	const navigate = useNavigate();

	useEffect(
  () => {
    setTimeout(() => {navigate('/', {replace:true})}, 3000)
  	}, []
	);

	return (
		<div className={styles.mainDiv}>
      <div className={styles.divContainer}>
        <h1>A mail with your new password has been sent! <BsFillEmojiWinkFill/></h1>
      </div>
    </div>
	)
}

export default PaswordSentMessage;