import React from "react";
import { NavLink } from "react-router-dom";
import logoSnorInn from "../../Images/logoSnorInn.jpeg";
import styles from "./Navbar.module.css";
import Login from "../Login";

const NavBar = () => {
  return (
    <div className={styles.navbarDiv}>
      <img src={logoSnorInn} alt="SnorInn" id={styles.logoImg} />

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
