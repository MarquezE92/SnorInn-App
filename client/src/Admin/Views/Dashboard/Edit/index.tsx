import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useState } from "react";
import styles from "./edit.module.css";
import { useAppDispatch } from "../../../../Redux/Store/hooks";
import {editRoom } from "../../../../Redux/slice/rooms";
import { beds, services, types, places, rating } from "./constants";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { getDetailRoom } from "../../../../Redux/slice/rooms";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const servicesInfo = services;
  const bedsInfo = beds;
  const placesInfo = places;
  const { id } = useParams();
 

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<any>({});
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState<any>({
    _id: id,
  });
  const [validated, setValidated] = useState(false);



  const room: any = async () => {
    const info = await axios.get(`https://snor-inn-api.onrender.com/room/${id}`);
    console.log(info.data);
    setRooms(info.data);
    setInput({
      ...input,
      services: info.data.services,
    });
  };
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleDelete = (e: string) => {
    setInput({
      ...input,
      services: input.services && input.services.filter((el:string) => el !== e),
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleServicesSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    if (input.services && !input.services.includes(e.target.value)) {
      setInput({
        ...input,
        services: [...input.services, e.target.value],
      });
    }
  };

  // SECCION CARGAR IMAGENES

  const handlePhotos = (e: ChangeEvent<any>) => {
    const reader: any = new FileReader();
    const file = e.target.files[0];
    const isValidSize = file.size < 5000000;
    const isNameOfOneImageRegEx = /.(jpe?g|gif|png)$/i;
    const isValidType = isNameOfOneImageRegEx.test(file.name);

    if (!isValidSize) {
      return alert("Image size must be smalles than 5mb");
    }
    if (!isValidType) {
      return alert("You just can upload images");
    } else
      reader.onloadend = () =>
        setInput({
          ...input,
          photos: reader.result,
        });

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<any>) => {
       e.preventDefault()
      dispatch(editRoom(input));
      Swal.fire("Good job!", "Your room was edited!", "success");
      setTimeout(() => navigate("/dashboard", { replace: false }), 2200);
  };



  useEffect(() => {
    dispatch(getDetailRoom(id));
    room();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(()=> {
    if (input.services?.length <= 4) {
      setInput({
        ...input,
        type: 'Basic'
      })
    }
    else if (input.services?.length > 4 && input.services?.length <= 7) {
      setInput({
        ...input,
        type: 'Standard'
      })
    }
    else if (input.services?.length > 7 && input.services?.length <= 10) {
      setInput({
        ...input,
        type: 'Premium'
      })
    }
  },[input.services])
  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainDiv}>
        <div className={styles.title}>Edit your room </div>
        <Form
          onSubmit={handleSubmit}
          className={styles.formDiv}
          noValidate
          validated={validated}
        >
          <FloatingLabel label="Place" className="mb-3">
            <Form.Select name="place" onChange={handleSelect} defaultValue={""}>
              <option disabled value={""}>
                {rooms.place}
              </option>
              {placesInfo.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <FloatingLabel label={`Name: ${rooms.name}`} className="mb-3">
            <Form.Control
              type="text"
              value={input.name}
              name="name"
              onChange={handleChangeInput}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </FloatingLabel>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              name="photos"
              onChange={handlePhotos}
              accept=".jpg, .jpeg, .png, .gif"
            />
          </Form.Group>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

          <FloatingLabel label="Number of beds" className="mb-3">
            <Form.Select
              name="n_beds"
              onChange={handleSelect}
              defaultValue={""}
            >
              <option disabled value={""}>
                {rooms.n_beds}
              </option>
              {bedsInfo.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel label={`Price: ${rooms.price}`} className="mb-3">
            <Form.Control
              value={input.price}
              name="price"
              onChange={handleChangeInput}
              type="number"
              min={"1"}
              max={"1000000"}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please provide a price.
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel label="Services">
            <Form.Select
              onChange={handleServicesSelect}
              required
              defaultValue={""}
            >
              <option disabled value={""}>
                Choose an option
              </option>
              {servicesInfo.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>

          <Form.Text>Services:</Form.Text>
          <ul className={styles.servicesList}>
            {" "}
            {input.services &&
              input.services.map((el:string) => (
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
          <Button
            variant="secondary"
            className={styles.descriptionButton}
            onClick={() => handleModal()}
          >
            Description
          </Button>
          <Button type="submit" variant="dark">
            Edit
          </Button>
        </Form>
        <Modal show={openModal} onHide={() => handleModal()}>
          <Modal.Header>
            <Modal.Title>Room description</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <Form.Control
              as="textarea"
              name="description"
              className={styles.formControl}
              value={input.description}
              onChange={handleChangeTextTarea}
            />
            <Button onClick={() => handleModal()}>Set Description</Button>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Edit;
