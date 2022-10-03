import React from 'react';
import { NavLink } from 'react-router-dom';
import logoSnorInn from '../../Images/logoSnorInn.jpeg';
import styles from './Navbar.module.css';


const NavBar = ()=> {
    return (
        <div className={styles.navbarDiv}>
            <img src={logoSnorInn} alt="SnorInn" id={styles.logoImg}/>
            
            <button className={styles.navbarButton}>
                <NavLink to="/" className={styles.NavLink}>Home</NavLink>
            </button>
           
            <button className={styles.navbarButton}>
                <NavLink to="/rooms" className={styles.NavLink}>Rooms</NavLink>
            </button>
            
            <button className={styles.navbarButton}>
            <NavLink to="/admin" className={styles.NavLink}>Admin</NavLink>
            </button>
        </div>
        )
};

export default NavBar;