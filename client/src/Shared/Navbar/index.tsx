import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Login from "../LoginUser";
import { useAppSelector, useAppDispatch } from "../../Redux/Store/hooks";
import { logout } from "../../Redux/slice/user";
import { BsDoorOpenFill } from "react-icons/bs";


const NavBar = () => {

  const user = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  

  const admin = user.isAdmin;


  const handleLogout = () => {
    dispatch(logout())
    window.location.reload()
  }

  return (
    <>
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
            {admin === null? (
              <button className={styles.navbarButtonAdmin}>
                <NavLink to="/signup/admin" className={styles.NavLink}>
                  Work with us
                </NavLink>{" "}
              </button>
            ) : (
              <></>
            )}

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

            {admin === null? (
              <button className={styles.navbarButton}>
                <NavLink to="/signup" className={styles.NavLink}>
                  Sign Up
                </NavLink>{" "}
              </button>
            ) : (
              <>
                <button className={styles.navbarButtonAdmin}>
                  {admin === true? <NavLink to="/dashboard" className={styles.NavLink}>
                    Profile
                  </NavLink> : <NavLink to="/user" className={styles.NavLink}>
                    Profile
                  </NavLink>
                }
                  
                </button>
                  
                <BsDoorOpenFill onClick={() => handleLogout()} className={styles.logoutBotton}/>
                  
              </>
            )}

            {admin === null? (
              <button className={styles.navbarButton}>
                {" "}
                <Login />
              </button>
            ) : null}
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
