import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Login from "../LoginUser";
import {useAppSelector, useAppDispatch} from '../../Redux/Store/hooks'
import {logout}from '../../Redux/slice/user'


const NavBar = () => {


  const user = useAppSelector(state=>state.auth.userInfo)
  const dispatch = useAppDispatch()


  const handleLogout =()=>{
      dispatch(logout())
  }


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
            user.email ==''?
            (<button className={styles.navbarButton}>
            <NavLink to="/signup" className={styles.NavLink}>
              Sign Up
            </NavLink>{" "}
          </button>
          
          
          ):
          <button onClick={handleLogout}>
            profile
          </button>
          }

         {user.email ==''?
          <button className={styles.navbarButton}>
            {" "}
            <Login />
          </button>
          :<></>
        }
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
