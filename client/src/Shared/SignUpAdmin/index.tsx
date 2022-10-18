import React, { FormEvent } from "react";
import styles from "./signUpAdmin.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signUpAdmin } from "../../Redux/slice/authSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillArrowDownCircleFill, BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
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

  const [visibility, setVisibility] = useState<boolean>(false);

  const iconVisibility = visibility? (<BsFillEyeSlashFill/>) : (<BsFillEyeFill/>);

  const passwordType = visibility? ("text") : ("password");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handlePass = (e: ChangeEvent<HTMLInputElement>)=> {
    setPass(e.target.value)
  };

  const toggleVisibility = ()=> {
    setVisibility(!visibility)
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
            type= {passwordType}
            id="password"
            name="password"
            value={input.password}
            onChange={handleInput}
          />
          <div className={styles.icon} onClick={toggleVisibility}>{iconVisibility}</div>
          <label className={styles.subtitle} htmlFor="password">
            Verify Password
          </label>
          <input
            className={(pass === input.password)? styles.input : styles.wrong}
            type= {passwordType}
            id="password2"
            name="password2"
            value={pass}
            onChange={handlePass}
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
