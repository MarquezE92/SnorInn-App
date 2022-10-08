import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Login from "../LoginUser";
import {useAppSelector, useAppDispatch} from '../../Redux/Store/hooks'
import {logout}from '../../Redux/slice/user'


const NavBar = () => {

  const user = useAppSelector(state=>state.auth)
  const dispatch = useAppDispatch()
 



  return (
    <header className={styles.navbarDiv}>
      <nav className={styles.mainDiv}>
        <div className={styles.logoDiv}>
          <img
            src={require("../../Images/logoSnorInn.jpeg")}
            alt="SnorInn"
            id={styles.logoImg}
          />
        </div>
        <div className={styles.groupDiv}>
        <button className={styles.navbarButtonAdmin}>
            <NavLink to="/signup/admin" className={styles.NavLink}>
              Work with us
            </NavLink>{" "}
          </button>
          <button className={styles.navbarButton}>
            <NavLink to="/" className={styles.NavLink}>
              Home{" "}
            </NavLink>
          </button>

          <button className={styles.navbarButton}>
            <NavLink to="/rooms" className={styles.NavLink}>
              Rooms
            </NavLink>{" "}
          </button>
          
          {
            user.userInfo == null?
            
         (<button className={styles.navbarButton}>
            <NavLink to="/signup" className={styles.NavLink}>
              Sign Up
            </NavLink>{" "}
          </button>):
          <button onClick={()=>dispatch(logout())}>
            profile
          </button> 
          }

          {
            user.userInfo==null?
            
          (<button className={styles.navbarButton}>
            {" "}
            <Login />
          </button>):
          <></>
         
          }
        
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
