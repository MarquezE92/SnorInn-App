import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { ChangeEvent, FormEvent } from "react";
import { signInUser } from "../../Redux/slice/user";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signInAdmin } from "../../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  


  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState('Admin');

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
 const handleSubmitUser = (e:FormEvent) => {
      e.preventDefault()
        dispatch(signInUser(input))
        setTimeout(()=>{navigate('/user')},1000) 
  }
  const handleSubmitAdmin = (e:FormEvent) => {
    e.preventDefault()
      dispatch(signInAdmin(input))
      setTimeout(()=>{navigate('/dashboard')},1000) 
}

  const handleState = () => {
    if (user === 'Admin')
    setUser('User')
    else setUser('Admin')
  }
  return (
    <>
      <span onClick={() => handleModal()}>Sign in</span>
      <Modal show={modal} onHide={() => handleModal()}>
        <button className={styles.adminButton} onClick={()=> handleState()}>Sign In as {user}</button>
        {user === 'Admin' ? <div className={styles.mainDiv}>
          <h2 className={styles.title}>Sign in or Sign up as Client</h2>
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
              <button onClick={handleSubmitUser}>Continue with email</button>
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
        </div>: <div className={styles.mainDiv}>
          <h2 className={styles.title}>Sign in or Sign up as Admin</h2>
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
              <button onClick={handleSubmitAdmin}>Continue with email</button>
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
            <Link to="/signup/admin" onClick={() => handleModal()}>
              Sign up
            </Link>
          </div>
        </div>}
      </Modal>
    </>
  );
};

export default Login;
