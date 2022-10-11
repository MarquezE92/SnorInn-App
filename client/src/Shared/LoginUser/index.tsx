import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import styles from "./login.module.css";
import { ChangeEvent, FormEvent } from "react";
import { signInUser } from "../../Redux/slice/user";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { useNavigate } from "react-router-dom";

const Login = () => {
  


  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleModal = () => {
    setModal(!modal);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    }
    )
  }
 const handleSubmit = (e:FormEvent) => {
      e.preventDefault()
        dispatch(signInUser(input))
  }

  return (
    <>
      <span onClick={() => handleModal()}>Sign in</span>
      <Modal show={modal} onHide={() => handleModal()}>
        <div className={styles.mainDiv}>
          <h2 className={styles.title}>Sign in or Sign up</h2>
          <form className={styles.form}>
            <label className={styles.subtitle} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
            <label className={styles.subtitle} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
            <div
              className={styles.buttonModal}
              onClick={() => () => handleModal()}
            >
              <NavLink to="/admin" onClick={handleSubmit}>Continue with email</NavLink>
            </div>
            <div>
              Did you forget your password?
              <Link to="/restorepassword" onClick={() => handleModal()}>
                Click here
              </Link>
            </div>
          </form>
          <h2 className={styles.title}>or use one of these options</h2>
          <div className={styles.imageContainer}>
            <button className={styles.cardImg}>
              <img src={require("./images/facebook.png")} alt="description" />
            </button>
            <button className={styles.cardImg}>
              <img src={require("./images/gmail.png")} alt="description" />
            </button>
          </div>
          <div>
            Don't have an account yet?
            <Link to="/signup" onClick={() => handleModal()}>
              Sign up
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Login;
