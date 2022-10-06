import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../../Redux/Store/hooks";
import { getRoomsByPage } from "../../../../Redux/slice/rooms";

const HomeCarousel = () => {
  const dispatch = useAppDispatch();

  const rooms = useAppSelector((state) => state.rooms.Rooms);
  useEffect(() => {
    dispatch(getRoomsByPage());
  }, []);
  return (
    <>
    <Carousel style={{width: 1120, height:500, paddingTop:40}}>
      {rooms?.map((el) => {
        return (
          <Carousel.Item>
            <div className='imgContainer'>
              {" "}
              <img className="d-block w-100" src={el.photos} alt="First $()"style={{width: 1120, height:500}}/>
            </div>
            <Carousel.Caption>
              <h3>{el.name}</h3>
              <p>{el.place}</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
    </>
  );
};

export default HomeCarousel;
