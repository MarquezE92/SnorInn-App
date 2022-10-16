import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "./addReview.module.css"
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/hooks";
import {addReview, IRoom} from '../../../../Redux/slice/rooms'

export interface Iinput {
  userAdminId: string;
  userId: string;
  reservationId: string;
  stars: number;
  roomId: string;
  comment: string;
}

const AddReview = ()=> {

	const {id} = useParams();
  const dispatch = useAppDispatch()
  const rooms = useAppSelector(state=>state.rooms.Rooms)
  const user = JSON.parse(localStorage.getItem('user')!)

  var room:any = rooms.filter((el:IRoom)=>el.reservationId.includes(id!))
 
	const [input, setInput] = useState<Iinput>({
		userAdminId: `${room[0].userAdminId}`,
		userId: `${user._id}`,
		reservationId: `${id}`,
		stars: 0,
		roomId: `${room[0]._id}`,
		comment: ""
	}) 

	const [validated, setValidated] = useState(false);

	const handleSubmit = (e:any)=>{
		e.preventDefault();
    dispatch(addReview(input))
	};

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
 	};

 	const handleChangeTextTarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };


	useEffect(()=> {

	},[])

	return(
		<div className={styles.formContainer}>
			<Form
          onSubmit={handleSubmit}
          className={styles.formDiv}
          noValidate
          validated={validated}
        >
          <h3 className={styles.title}>Share your experience!</h3>
          <FloatingLabel label="stars" className="mb-3">
            <Form.Select
              name="stars"
              onChange={handleSelect}
              required
              defaultValue={""}
            >
              <option disabled value={""}>
                Rate your stay
              </option>
              <option value={1}>
                  1
              </option>
              <option value={2}>
                  2
              </option>
              <option value={3}>
                  3
              </option>
              <option value={4}>
                  4
              </option>
              <option value={5}>
                  5
              </option>
              
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label="comment" className="mb-3">
            <Form.Control
              as="textarea"
              name="comment"
              type="text"
              className={styles.formControl}
              value={input.comment}
              onChange={handleChangeTextTarea}
              required
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please comment us your experience.
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button type="submit" variant="dark" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
		</div>
		)
}

export default AddReview

