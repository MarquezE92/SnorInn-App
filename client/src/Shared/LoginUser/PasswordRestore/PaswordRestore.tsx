import React, { ChangeEvent, FormEvent, useState } from "react";
import styles from "./passwordrestore.module.css";
import { useAppDispatch } from "../../../Redux/Store/hooks";

const PaswordRestore = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
            value={email}
            onChange={handleEmail}
          />
          <button className={styles.button}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default PaswordRestore;
