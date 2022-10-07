import React, { useEffect } from 'react'
import {BsFillEmojiSunglassesFill} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styles from './redirect.module.css'


const Redirect = () => {

const navigate = useNavigate();


useEffect(
  () => {
    setTimeout(() => {navigate('/rooms', {replace:true})}, 3000)
  }, []
)

  return (
    <div className={styles.mainDiv}>
        <h1> Your account has been confirmed correctly!</h1>
        <h3> Welcome to the Snor Inn club <BsFillEmojiSunglassesFill /></h3>
    </div>
  )
}

export default Redirect