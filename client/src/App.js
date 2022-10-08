import RoomForm from "./Admin/Features/RoomForm";
import NavBar from "./Shared/Navbar";
import RoomCard from "./User/Features/RoomCard";
import RoomDetail from "./User/Features/RoomDetail";
import { Routes, Route } from "react-router-dom";
import Home from "./User/Views/Home";
import AdminDashboard from "./Admin/Views/Dashboard";
import SignUpUser from "./Shared/SignUpUser";
import Stripe from "./Stripe";
import Footer from "./Shared/Footer";
import Redirect from "./User/Views/Redirect/Redirect";
import PaswordRestore from "./Shared/LoginUser/PasswordRestore/PaswordRestore";
import SignUpAdmin from "./Shared/SignUpAdmin";
import { PrivateRoutes } from "./routes/privateRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import PaswordSentMessage from "./Shared/LoginUser/PasswordRestore/PaswordSentMessage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        

        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/signup/admin" element={<SignUpAdmin />} />
        <Route path="/paswordsent" element={<PaswordSentMessage />} />
        <Route path="/restorepassword" element={<PaswordRestore />} />
        <Route path="/confirmedaccount" element={<Redirect />} />

        
        <Route path="/rooms" element={<RoomCard />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />
        
        
        <Route element={<AuthRoutes/>}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/create" element={<RoomForm />} />
        </Route>

        <Route element={<PrivateRoutes/>}>
          <Route path="/rooms/reserve/:id" element={<Stripe />} />
        </Route>

        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
