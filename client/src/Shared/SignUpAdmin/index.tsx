import React, { FormEvent } from "react";
import styles from "./signUpAdmin.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signUpAdmin } from "../../Redux/slice/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { error } from "console";



const SignUpAdmin = () => {
  interface SignUp {
    email: string;
    password: string;
  }

  const dispatch = useAppDispatch();
  const MySwal = withReactContent(Swal);

  const [input, setInput] = useState<SignUp>({
    email: "",
    password: "",
  });
  
  const [pass, setPass] = useState<string>("")



  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlePass = (e: ChangeEvent<HTMLInputElement>)=> {
    setPass(e.target.value)
  }

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
      if(input.password !== pass) {
        Swal.fire("Ups!", "The passwords don't match", "error");

      } else {
        dispatch(signUpAdmin(input));
      setInput({ email: "", password: ""});
      setPass("")
      }
  };

  return (
    <div className={styles.principalContainer}>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Do you have a room to rent? work with us </h2>
        <BsFillArrowDownCircleFill />
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
          <label className={styles.subtitle} htmlFor="password2">
            Verify Password
          </label>
          <input
            className={(pass === input.password)? styles.input : styles.wrong}
            type="password"
            id="password2"
            name="password2"
            value={pass}
            onChange={handlePass}
          />
          <input className={styles.buttonModal} type="submit" value="Sign up" />
        </form>
        
      </div>
    </div>
  );
};

export default SignUpAdmin;
