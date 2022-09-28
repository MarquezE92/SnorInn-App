import React from 'react'
import {useDispatch} from 'react-redux'
import { GetAllRooms, GetRoom } from './Redux/Actions'

function App() {
  
  const Dispatch = useDispatch()
  

  function HandleRooms(){
    Dispatch(GetAllRooms())
  }

  function HandleRoom(){
    Dispatch(GetRoom())
  }

  return (
    <div className="App">
      <h1>SnorInnApp</h1>
      <button onClick={HandleRooms}>traer una habitacion</button>
      <button onClick={HandleRoom}>traer todas habitacion</button>
    </div>
  );
}

export default App;
