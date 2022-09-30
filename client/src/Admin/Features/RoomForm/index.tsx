import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import styles from './index.module.css'
import {useAppDispatch} from '../../../Redux/Store/hooks'
import {IRoom, createRoom} from '../../../Redux/slice/rooms'



// interface IRoom {
//     type: string,
//     place: string,
//     n_beds: number,
//     price: number,
//     services: string[],
//     location: string,
//     photos: string,
//     min_user_rating: number,
// }

const RoomForm = () => {
const services = ['service1', 'service2', 'service3', 'service4']
const dispatch = useAppDispatch()


  // const [errors, setErrors] = useState({});

  const [errors, setErrors] = useState<Partial<IRoomValidate>>({});
  const [input, setInput] = useState<Partial<IRoom>>({
    type: '',
    place: '',
    n_beds: 0,
    price: 0,
    services: [] ,
    location: '',
    photos: [],
  });

  interface IRoomValidate {
    [key: string]: any,
}

  const validateForm = (input:IRoomValidate) => {
    let errors : any = {
      type:'',
      location: '',
      price: '',
      place: '',
      n_beds: ''
    };
    if (!input.type.trim()) {
      errors.type = "Type is required";
    } 
    else if (!input.place.trim()) {
      errors.place = "Place is required";
    }
    else if (!input.location.trim()) {
      errors.location = "Location is required";
    }
    else if (!input.price.trim()) {
      errors.price = "Pls select a price";
    }
    else if (!input.n_beds.trim()) {
      errors.n_beds = "Select a number of beds";
    }
    return errors;
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    handleChangeInput(e)
    setErrors(validateForm(input));
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  // const handleChangeTextTarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setInput({
  //     ...input,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
      if (input.services && !(input.services.includes(e.target.value)) ){
        setInput({
          ...input,
          services: [...input.services, e.target.value],
        });}
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Room created successfully");
    dispatch(createRoom(input))
    setInput({
    type: '',
    place: '',
    n_beds: 0,
    price: 0,
    services: [] ,
    location: '',
    photos: [],
    });
  };


  const handleDelete = (e: string) => {
    setInput({
      ...input,
      services: input.services && input.services.filter((el) => el !== e),
    });
  };


  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainDiv}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputDiv}>
            <label>Type:</label>
            <input
              className={styles.input}
              type="text"
              value={input.type}
              name="type"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              required
              maxLength= {255}
            />
           {errors.type && (
              <p className={styles.errorMessage}>{errors.type}</p>
            )}
          </div>
          <div className={styles.inputDiv}>
            <label>Place:</label>
            <input
              className={styles.input}
              value={input.place}
              name="place"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              maxLength={255}
            />
           {errors.place && (
              <p className={styles.errorMessage}>{errors.place}</p>
            )}
          </div>
          <div className={styles.inputDiv}>
            <label>Location:</label>
            <input
              className={styles.input}
              type="text"
              value={input.location}
              name="location"
              onChange={handleChangeInput}
              onBlur={handleBlur}
            />
          </div>
          {errors.location && (
              <p className={styles.errorMessage}>{errors.location}</p>
            )}
          <div className={styles.divInputPhotos}>
            <label>Photos:</label>
            <input
              type="file"
              value={input.photos}
              name="photos"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              className={styles.inputPhotos}
            />
          </div>
          <div className={styles.inputDiv}>
            <label>Beds:</label>
            <input
              value={input.n_beds}
              name="n_beds"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              type="number"
            />
          </div>
          {errors.n_beds && (
              <p className={styles.errorMessage}>{errors.n_beds}</p>
            )}
          <div className={styles.inputDiv}>
            <label>Price:</label>
            <input
              value={input.price}
              name="price"
              onChange={handleChangeInput}
              onBlur={handleBlur}
              type="number"
            />
          </div>
          {errors.price && (
              <p className={styles.errorMessage}>{errors.price}</p>
            )}
          <select onChange={handleSelect}>
            {services.map((el) => (
              <option value={el} key={el}>{el}</option>
            ))}
          </select>
          Services:
          <ul>
            {" "}
            {input.services && input.services.map((el) => (
              <li key={el}>
                {el}
                <button
                  onClick={() => handleDelete(el)}
                  className={styles.deleteButton}
                  type="button"
                >
                  x
                </button>
              </li>
            ))}
          </ul>
          <button type="submit" className={styles.createButton}>
            Create Reservation
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
