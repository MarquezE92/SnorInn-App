import React from "react";
import styles from "./paswordSentMessage.module.css";

const PaswordSentMessage = () => {
	return (
		<div className={styles.mainDiv}>
      <div className={styles.divContainer}>
        <h1>A mail with your new password has been sent! :)</h1>
      </div>
    </div>
	)
}

export default PaswordSentMessage;