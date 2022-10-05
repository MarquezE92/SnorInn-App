import React from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import styles from './checkoutform.module.css'
import axios from 'axios';

const CheckutForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
       const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (!error) {
            const {id} = paymentMethod;

            // FEEEEEEEEEEEEEEEER, ABAJO HAY QUE CAMBIAR LA RUTA FIJATE SI FUNCIONA ASI NOMÁS O HAY QUE HACER UNA ACTION //

            const {data} = await axios.post("http://localhost:3002/api/checkout", {
                id,
                ammount: 10000,
            })
            console.log(data())
        }}




  return (
    <div className={styles.mainDiv}>
        <form onSubmit={handleSubmit} className={styles.form}>
           <div className={styles.imageDiv}>
           <img src={require('../../Images/brianna-tucker-bU5BjwyQbOM-unsplash.jpg')}/></div> 
        <div className={styles.cardDiv}><CardElement/></div>
        <button className={styles.button}>Buy</button>
    </form>
    </div>
    
  )
}

export default CheckutForm