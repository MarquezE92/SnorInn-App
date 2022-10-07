import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer = () => {
  const [linkedin, setLinkedin] = useState(null);

  const handleClick = () => {
    linkedin === null ? setLinkedin(true) : setLinkedin(null);
  };

  const gente = [
    {
      name: "Jhon",
      linkedin: "https://www.linkedin.com/in/jhon-coneo-hernandez-9a930b174/",
    },
    {
      name: "Fer",
      linkedin:
        "https://www.linkedin.com/in/fernando-pascual-full-stack-developer/",
    },
    {
      name: "Franco",
      linkedin: "https://www.linkedin.com/in/franco-nahuel-moreno-770186236/",
    },
    {
      name: "Pablo",
      linkedin: "https://www.linkedin.com/in/pablo-la-madrid-934298248/",
    },
    {
      name: "Fefi",
      linkedin:
        "https://www.linkedin.com/in/estefan%C3%ADa-m%C3%A1rquez-137b45175/",
    },
    {
      name: "Frank",
      linkedin: "https://www.linkedin.com/in/frank-aguado-7a8888167/",
    },
  ];

  return (
    <footer className={styles.footerDiv}>
      <div className={styles.footerInfo}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <Link>About us</Link>
          </div>
          <div className={styles.infoItem}>
            <Link>Faq</Link>
          </div>
          <div className={styles.infoItem}>
            <Link>Contact</Link>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.imgDiv}>
            <a href="https://github.com/MarquezE92/SnorInn-App">
              <img src={require("./images/signo-de-github.png")} alt="" />
            </a>
          </div>
          <div className={styles.imgDiv}>
            <button onClick={handleClick}>
              <img src={require("./images/linkedin.png")} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.linkedin}>
        {" "}
        {linkedin
          ? gente.map((el) => (
              <a href={el.linkedin}>
                <div className={styles.infoUs}>{el.name}</div>
              </a>
            ))
          : null}
      </div>
    </footer>
  );
};

export default Footer;
