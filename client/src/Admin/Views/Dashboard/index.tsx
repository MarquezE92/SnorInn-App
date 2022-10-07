import React from 'react'
import styles from './dashboard.module.css'
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className= {styles.mainDiv}>
      <div className={styles.compContainer}>
      <div className={styles.cardContainer}>
  <div className={styles.card}>
  <img src={require('../../../Images/avatardefault_92824.png')} alt='admin default' className={styles.img}/>
  <div className={styles.info}>
    <span>John Doe</span>
    <p>Admin :D</p>
  </div>
  <Link to="/create">Create a room</Link>
      </div>
    </div>
  <div className={styles.rooms}>

  </div>
      </div>
    </div>
  )
}

export default AdminDashboard