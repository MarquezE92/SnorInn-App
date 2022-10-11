import React, { FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./checkoutform.module.css";
import { RootState } from "../../Redux/Store/store";
import { useSelector } from "react-redux";
import {useAppSelector} from '../../Redux/Store/hooks';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckutForm = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const rooms = useSelector((state: RootState) => state.rooms.Room);
  const user = useAppSelector(state=>state.auth.userInfo);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try{
        const { id } = paymentMethod;
        const { email } = user;
        const { data } = await axios.post("http://localhost:3002/dataPeyment", {
          id,
          amount: Number(rooms.price + "00"),
          email,
        });
        console.log(data)
        Swal.fire("Great!", "Your payment was processed correctly. You'll receive your receipt via mail.", "success");
        navigate("/rooms", { replace: true });
      }catch(error:any){
        Swal.fire("Oh No!", error.response.data.message, "error")
      }
    } else {Swal.fire("Oh No!", "Something is wrong with yout card", "error");}
  };

  return (
    <div className={styles.mainDiv}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{rooms.name}</h2>
        {rooms ? (
          <div className={styles.roomContainer}>
            <div className={styles.imageDiv}>
              <img src={rooms.photos} alt=''/>
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
