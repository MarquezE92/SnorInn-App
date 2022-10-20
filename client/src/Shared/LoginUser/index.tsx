import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./login.module.css";
import { ChangeEvent, FormEvent } from "react";
import { signInUser } from "../../Redux/slice/user";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signInAdmin } from "../../Redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState("Admin");

  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<boolean>(false);

  const iconVisibility = visibility ? (<BsFillEyeSlashFill />) : (<BsFillEyeFill />);

  const passwordType = visibility ? ("text") : ("password");

  const toggleVisibility = () => {
    setVisibility(!visibility)
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitUser = async (e: FormEvent) => {
    e.preventDefault();
    const response = await dispatch(signInUser(input));
    console.log(response);
    if ((response).type === 'User/login/fulfilled') {
      navigate("/user");
    }
  };
  const handleSubmitAdmin = async (e: FormEvent) => {
    e.preventDefault();
    const response = await dispatch(signInAdmin(input));
    if ((response).type === 'Admin/login/fulfilled') {
      navigate("/dashboard");
    }
  };

  const handleState = () => {
    if (user === "Admin") setUser("User");
    else setUser("Admin");
  };

  const handleGoogle = (credentialResponse: any) => {
    const decoded: any = jwt_decode(credentialResponse.credential);
    const email = decoded.email
    console.log(email);
    dispatch(signInUser({ email: email, google: true, password: "UserGoogle" }));
  };

  return (
    <>
      <span onClick={() => handleModal()}>Sign in</span>
      <Modal show={modal} onHide={() => handleModal()}>
        <button className={styles.adminButton} onClick={() => handleState()}>
          Sign In as {user}
        </button>
        {user === "Admin" ? (
          <div className={styles.mainDiv}>
            <h2 className={styles.title}>Sign in as Client</h2>
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
                type={passwordType}
                id="password"
                name="password"
                value={input.password}
                onChange={handleInput}
              />
              <div className={styles.icon} onClick={toggleVisibility}>{iconVisibility}</div>
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
              <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
            <div>
              Don't have an account yet?
              <Link to="/signup" onClick={() => handleModal()}>
                Sign up
              </Link>
            </div>
          </div>
        ) : (
          <div className={styles.mainDiv}>
            <h2 className={styles.title}>Sign in as Admin</h2>
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
            <div>
              Don't have an account yet?
              <Link to="/signup/admin" onClick={() => handleModal()}>
                Sign up
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Login;
