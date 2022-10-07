import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppDispatch } from "../Redux/Store/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store/store";
import CheckoutForm from "./CheckoutForm/index";
import { useEffect } from "react";
import { getDetailRoom } from "../Redux/slice/rooms";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LpGDXJjFvmrQ5VMUwhA7hQyXlFD5BSOT32YVkMqDHnAbPIKLotqgA2XyIU6N89BW2ORqZRGdqorT2c7oRpa2YCH00loMo9Egl"
);

const Stripe = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetailRoom(id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
