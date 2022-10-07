import React, { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./checkoutform.module.css";
import { RootState } from "../../Redux/Store/store";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CheckutForm = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const rooms = useSelector((state: RootState) => state.rooms.Room);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      const { data } = await axios.post("http://localhost:3002/dataPeyment", {
        id,
        amount: rooms.price,
      });
      console.log(data);
      alert("successful payment");
      navigate("/rooms", { replace: true });
    }
  };

  return (
    <div className={styles.mainDiv}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{rooms.name}</h2>
        {rooms ? (
          <div className={styles.roomContainer}>
            <div className={styles.imageDiv}>
              <img src={rooms.photos} />
            </div>
            <div className={styles.infoContainer}>
              <section>
                <h3>{rooms.place}</h3>
              </section>
              <div className={styles.price}>
                Price per night: <br />${rooms.price} ARS
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className={styles.cardDiv}>
          <CardElement />
        </div>
        <button type="submit" className={styles.button}>
          Reserve
        </button>
      </form>
    </div>
  );
};

export default CheckutForm;
