import RoomForm from "./Admin/Features/RoomForm";
import NavBar from "./Shared/Navbar";
import RoomCard from "./User/Features/RoomCard";
import RoomDetail from "./User/Features/RoomDetail";
import { Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path= '/create' element={<RoomForm/>}/>
      <Route path= '/rooms' element={<RoomCard/>}/>
      <Route path= '/detail' element={<RoomDetail/>}/>
    </Routes>
    </>
  );
}

export default App;

