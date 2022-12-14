import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../Redux/Store/hooks";
import { getRoomsByPage } from "../../../../Redux/slice/rooms";
import styles from "./carousel.module.css";

const HomeCarousel = () => {
  const dispatch = useAppDispatch();

  const rooms = useAppSelector((state) => state.rooms.Rooms);
  useEffect(() => {
    dispatch(getRoomsByPage());
  }, []);
  return (
    <>
    <Carousel style={{width: 1000, height:500, paddingTop:40}}>
      {rooms?.length?
        rooms?.map((el) => {
        return (
          <Carousel.Item>
            <div className='imgContainer'>
              {" "}
              <img className="d-block w-100" src={el.photos.url} alt="First $()"style={{width: 1120, height:500}}/>
            </div>
            <Carousel.Caption style={{paddingBottom:40}}>
              <h3>{el.name}</h3>
              <p>{el.place}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      }):
      <div className={styles.spinner}>
              <span></span>
              <span></span>
              <span></span>
          </div>
    }
    </Carousel>
    </>
  );
};

export default HomeCarousel;

