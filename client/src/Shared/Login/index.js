import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./login.module.css";

const Login = () => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <button onClick={() => setModal(!modal)}>Login</button>
      <Modal show={modal} onHide={() => setModal(!modal)}>
        <div className={styles.mainDiv}>
          <h2 className={styles.title}>Login or Sign up</h2>
          <div>Email</div>
          <input className={styles.input} />
          
            <div className={styles.buttonModal} onClick={()=> setModal(!modal)}><NavLink to='/admin'>Continue with email</NavLink></div>
          
          <h2 className={styles.title}>or use one of these options</h2>
          <div className={styles.imageContainer}>
            <button className={styles.cardImg}>
              <img src={require("./images/facebook.png")} />
            </button>
            <button className={styles.cardImg}>
              <img src={require("./images/gmail.png")} />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
