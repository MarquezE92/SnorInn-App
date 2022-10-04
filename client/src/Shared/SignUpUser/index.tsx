import React from "react";
import styles from "./signUpUser.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";

interface Authentication {
  email: string;
  password: string;
}

const SignUpUser = () => {
    const [input, setInput] = useState<Authentication>({
        email: "",
        password: "",
      });

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        }
        )
      }

  return (
    <div className={styles.principalContainer}>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Welcome to SnorInn</h2>
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
          <input className={styles.buttonModal} type='submit' value="Sign up"/>
        </form>
        <h2 className={styles.title}>or use one of these options</h2>
        <div className={styles.imageContainer}>
          <button className={styles.cardImg}>gmail</button>
          <button className={styles.cardImg}>facebook</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;
