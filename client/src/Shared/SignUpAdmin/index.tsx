import React, { FormEvent } from "react";
import styles from "./signUpAdmin.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signUpUser } from "../../Redux/slice/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { error } from "console";



const SignUpAdmin = () => {
  interface SignUp {
    email: string;
    password: string;
    isAdmin: boolean;
  }

  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);

  const [input, setInput] = useState<SignUp>({
    email: "",
    password: "",
    isAdmin: true,
  });
  




  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //     setInput(prevState => ({
  //       ...prevState,
  //       local: {
  //         ...prevState.local,
  //         [name]: value
  //       }
  //   })
  //     )}

  // [e.target.name]: e.target.value


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
      dispatch(signUpUser(input));
      setInput({ email: "", password: "", isAdmin: true });
  };

  return (
    <div className={styles.principalContainer}>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Do you have a room to rent? work with us <BsFillArrowDownCircleFill/></h2>
        <form className={styles.form} onSubmit={handleSubmit}>
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
          <input className={styles.buttonModal} type="submit" value="Sign up" />
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

export default SignUpAdmin;
