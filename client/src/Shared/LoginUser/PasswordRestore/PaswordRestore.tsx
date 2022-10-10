import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./passwordrestore.module.css";
import { useAppDispatch } from "../../../Redux/Store/hooks";
import {forgetPassword} from '../../../Redux/slice/user'

const PaswordRestore = () => {
  const [email, setEmail] = useState({email:""});
  const dispatch = useAppDispatch();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({email:e.target.value});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgetPassword(email))
  };

  return (
    <div className={styles.mainDiv}>
      <form className={styles.divContainer} onSubmit={handleSubmit}>
        <h1>Restore your password</h1>
        <p>
          Enter your email so that we can send you an email to create a new
          password.
        </p>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Your email..."
            type="email"
            value={email.email}
            onChange={handleEmail}
          />
          <button className={styles.button} onClick={handleSubmit}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default PaswordRestore;
