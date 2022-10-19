import React, { FormEvent } from "react";
import styles from "./signUpUser.module.css";
import { useState } from "react";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../Redux/Store/hooks";
import { signUpUser, signInUser} from "../../Redux/slice/user";
import Swal from "sweetalert2";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";

const SignUpUser = () => {
  interface Login {
    email: string;
    password: string;
    isAdmin: boolean;
  }

  const dispatch = useAppDispatch();

  const [input, setInput] = useState<Login>({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [pass, setPass] = useState<string>("");

  const [visibility, setVisibility] = useState<boolean>(false);

  const iconVisibility = visibility? (<BsFillEyeSlashFill/>) : (<BsFillEyeFill/>);

  const passwordType = visibility? ("text") : ("password");

  const toggleVisibility = ()=> {
    setVisibility(!visibility)
  };



  const handleGoogle = (credentialResponse: any) => {
    const decoded:any = jwt_decode(credentialResponse.credential);
    const email = decoded.email
    console.log(email);
    dispatch(signInUser({email: email, google: true, password: "UserGoogle"}));
};

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
    dispatch(signUpUser(input));
    setInput({ email: "", password: "", isAdmin: false});
    setPass("")
  }
  };

  return (
    <div className={styles.principalContainer}>
      <div className={styles.mainDiv}>
        <h2 className={styles.title}>Welcome to SnorInn</h2>
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
          <label className={styles.subtitle} htmlFor="password2">
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
        <GoogleLogin
                onSuccess={handleGoogle}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;
