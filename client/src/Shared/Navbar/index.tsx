import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Login from "../LoginUser";

const NavBar = () => {
  return (
    <div className={styles.navbarDiv}>
      <img src={require("../../Images/logoSnorInn.jpeg")} alt="SnorInn" id={styles.logoImg} />

      <NavLink to="/" className={styles.NavLink}>
        <button className={styles.navbarButton}>Home</button>
      </NavLink>

      <NavLink to="/rooms" className={styles.NavLink}>
        <button className={styles.navbarButton}>Rooms </button>
      </NavLink>
        <button className={styles.navbarButton}> <Login/></button>
       
    </div>
  );
};

export default NavBar;
