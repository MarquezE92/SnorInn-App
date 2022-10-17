import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styles from "./addReview.module.css";
import { useAppDispatch, useAppSelector } from "../../../../Redux/Store/hooks";
import {addReview, IRoom} from '../../../../Redux/slice/rooms';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

interface Iinput {
  adminId: string;
  userId: string;
  reservationId: string;
  stars: number;
  roomId: string;
  comment: string;
}

const AddReview = ()=> {

	const {id} = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const rooms = useAppSelector(state=>state.rooms.Rooms);
  const user = JSON.parse(localStorage.getItem('user')!);

	const [input, setInput] = useState<Iinput>({
		adminId: "",
		userId: "",
		reservationId: `${id}`,
		stars: 0,
		roomId: "",
		comment: ""
	}) 

	const [validated, setValidated] = useState(false);

	const handleSubmit = (e:any)=>{
		e.preventDefault();
    if(input.stars && input.comment) {
      dispatch(addReview(input))
      setTimeout(()=>{navigate(`/rooms/${room[0]._id}`, {replace:true})}, 1000);
    } else {
      return MySwal.fire({
            title: <strong>Ups!</strong>,
            html: <i>Your review is not complete until you rate and leave a comment.</i>,
            icon: 'error'
          })
    }
    
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

	},)

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
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </Form>
		</div>
		)
}

export default AddReview

