import RoomForm from "./Admin/Features/RoomForm";
import NavBar from "./Shared/Navbar";
import RoomCard from "./User/Features/RoomCard";
import RoomDetail from "./User/Features/RoomDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./User/Views/Home";
import AdminDashboard from "./Admin/Features/Dashboard";
import Login from "./Shared/LoginUser";
import SignUpUser from "./Shared/SignUpUser";
import Stripe from "./Stripe";
import Footer from './Shared/Footer'
import Redirect from "./User/Views/Redirect/Redirect";
import PaswordRestore from "./Shared/LoginUser/PasswordRestore/PaswordRestore";



function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/restorepassword" element={<PaswordRestore/>}/>
      <Route path="/signup" element={<SignUpUser/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      <Route path= '/create' element={<RoomForm/>}/>
      <Route path= '/rooms' element={<RoomCard/>}/>
      <Route path= '/rooms/:id' element={<RoomDetail/>}/>
      <Route path= '/rooms/reserve/:id' element={<Stripe/>}/>
      <Route path= '/confirmedaccount' element={<Redirect/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;

