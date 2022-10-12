import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Login from "../LoginUser";
import { useAppSelector, useAppDispatch } from "../../Redux/Store/hooks";
import { logout } from "../../Redux/slice/user";
import { BsDoorOpenFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const user = useAppSelector((state) => state.users.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const admin = user.isAdmin;


  const handleLogout = () => {
    navigate('/')
    dispatch(logout())
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
                <form onSubmit={() => handleLogout()}>
                  <button type='submit'><BsDoorOpenFill  className={styles.logoutBotton}/></button> 
                </form>
               
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
