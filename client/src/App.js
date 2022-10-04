import RoomForm from "./Admin/Features/RoomForm";
import NavBar from "./Shared/Navbar";
import Card from "./User/Features/Card";
import RoomCard from "./User/Features/RoomCard";
import RoomDetail from "./User/Features/RoomDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./User/Views/Home";
import AdminDashboard from "./Admin/Features/Dashboard";
import Login from "./Shared/LoginUser";
import SignUpUser from "./Shared/SignUpUser";

function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUpUser/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path= '/create' element={<RoomForm/>}/>
      <Route path= '/rooms' element={<RoomCard/>}/>
      <Route path= '/rooms/card' element={<Card/>}/>
      <Route path= '/rooms/:id' element={<RoomDetail/>}/>
    </Routes>
    </>
  );
}

export default App;

