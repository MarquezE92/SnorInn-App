import React from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm/index'

const stripePromise = loadStripe("pk_test_51LpGDXJjFvmrQ5VMUwhA7hQyXlFD5BSOT32YVkMqDHnAbPIKLotqgA2XyIU6N89BW2ORqZRGdqorT2c7oRpa2YCH00loMo9Egl")




const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
        <CheckoutForm/>

    </Elements>
  )
}

export default Stripe