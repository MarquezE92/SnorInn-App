import React from 'react';
import logoSnorInn from '../../Images/logoSnorInn.jpeg';
import styles from './Navbar.module.css';

const NavBar = ()=> {
    return (
        <div className={styles.navbarDiv}>
            <img src={logoSnorInn} alt="SnorInn" id={styles.logoImg}/>
            <button className={styles.navbarButton}>Home</button>
            <button className={styles.navbarButton}>About</button>
            <button className={styles.navbarButton}>Rooms</button>
            <button className={styles.navbarButton}>LogIn</button>
        </div>
        )
};

export default NavBar;