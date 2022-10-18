import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../Redux/Store/hooks";
import { useAppSelector } from "../../../Redux/Store/hooks";
import { RootState } from "../../../Redux/Store/store";
import axios from "axios";
import CardAdmin from "./Card";

const AdminDashboard = () => {
  const [data, setData] = useState<any>({});


  const adminInfo = JSON.parse(localStorage.getItem('admin')!);
  const admin = useAppSelector((state: RootState) => state.admin.AdminInfo._id);
  const rooms = async () => {
    const info = await axios.get(
      `http://localhost:3002/roomsByAdminId/${admin}`
    );

    setData(info.data);
  };

  const roomAdmin = data?.rooms;
  useEffect(() => {
    rooms();
  }, []);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.compContainer}>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img
              src={require("../../../Images/avatardefault_92824.png")}
              alt="admin default"
              className={styles.img}
            />
            <div className={styles.info}>
            <p>{adminInfo.email}</p>
            </div>
            <Link to="/create">Create a room</Link>
          </div>
        </div>

        <div className={styles.cardsContainer}>
          {roomAdmin ? (
            <>
              {roomAdmin.map((el: any) => {
                return <CardAdmin _id={el._id} name={el.name} photos={el.photos.url} />;
              })}
            </>
          ) : (
            <div className={styles.loading}>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
