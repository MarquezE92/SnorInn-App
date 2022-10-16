import React, { FormEvent, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "./checkoutform.module.css";
import { RootState } from "../../Redux/Store/store";
import { useSelector } from "react-redux";
import {useAppSelector, useAppDispatch} from '../../Redux/Store/hooks';
import { payment_reserv } from "../../Redux/slice/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// Para el calendario
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

interface IUserInfo{
    confimationCode:string;
    email:string;
    _id:string;
    isAdmin:Boolean;
    password:string;
    reservationId: string[];
    status:string;
    roomFavorites:Object[]
}

interface IDatesRange {
  dates: string[];
  nigths: number
}

const CheckutForm = () => {
  const stripe: any = useStripe();
  const elements: any = useElements();
  const rooms = useSelector((state: RootState) => state.rooms.Room);
  const dispatch = useAppDispatch()
  const user:IUserInfo = useAppSelector(state=>state.users.userInfo);
  

  //-----------PARA EL CALENDARIO
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  

  const handleDate = (e:any)=> {
    setDates([e.selection])
  }

    const getDatesInRange = (startDate:Date, endDate:Date): IDatesRange=> {
    let nigths = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start);

    const dates = [];

    while (date < end) {
      dates.push(new Date(date).toString());
      date.setDate(date.getDate() + 1);
      nigths+=1;
    }

    return {dates, nigths};
  };


  //--------------------------------------------------------
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      // try{
        const { id } = paymentMethod;
        const { email, _id } = user;
        // const json = await axios.post("http://localhost:3002/dataPeyment", {
        //   id,
        //   amount: Number(rooms.price + "00")*nigths,
        //   email,
        //   userId: _id,
        //   roomId: rooms._id,
        //   check_in: dates[0].startDate,
        //   check_out: dates[0].endDate,
        //   dates: getDatesInRange(dates[0].startDate,dates[0].endDate)
        // });
      //   console.log(json)
      // }catch(error:any){
      //   Swal.fire("Oh No!", error.response.data.message, "error")
      // }
      dispatch(payment_reserv({
        id,
        amount: Number(rooms.price + "00")*getDatesInRange(dates[0].startDate,dates[0].endDate).nigths,
        email,
        userId: _id,
        roomId: rooms._id,
        check_in: dates[0].startDate,
        check_out: dates[0].endDate,
        dates: getDatesInRange(dates[0].startDate,dates[0].endDate).dates
      }))
 
      if((await res).meta.requestStatus==='fulfilled'){
        navigate("/rooms", { replace: true });
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
              <img src={rooms.photos.url} alt=''/>
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
  {//------------------------------CALENDARIO RESERVAS
  }
        <div className={styles.calendarContainer}>
          <span
                  onClick={() => setOpenDate(!openDate)}
                  className={styles.headerSearchText}
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
          {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDate}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className={styles.date}
                    minDate={new Date()}
                    disabledDates={rooms.unavailableDates?.map(date=> new Date(date))}
                  />
                )}
        </div>

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
