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
import AboutUs from "./Shared/AboutUs/AboutUs";
import NotFound from "./Shared/NotFound/NotFound";
import { PrivateRoutes, PublicRoutes } from "./routes/privateRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import PaswordSentMessage from "./Shared/LoginUser/PasswordRestore/PaswordSentMessage";
import User from "./User/Views/User";
import Edit from "./Admin/Views/Dashboard/Edit";
import AddReview from "./User/Views/User/AddReview/AddReview";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        

        <Route path="/paswordsent" element={<PaswordSentMessage />} />
        <Route path="/restorepassword" element={<PaswordRestore />} />
        <Route path="/confirmedaccount" element={<Redirect />} />

        
        <Route path="/rooms" element={<RoomCard />} />
        <Route path="/rooms/:id" element={<RoomDetail />} />

        <Route path="/about" element={<AboutUs />} />
        
        
        <Route element={<AuthRoutes/>}>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create" element={<RoomForm />} />
          <Route path="/put/:id" element={<Edit />} />
        </Route>
        
        <Route element={<PublicRoutes/>}>
        <Route path="/signup" element={<SignUpUser />} />
        <Route path="/signup/admin" element={<SignUpAdmin />} />
        </Route>

        <Route element={<PrivateRoutes/>}>
          <Route path="/user" element={<User />} />
          <Route path="/rooms/reserve/:id" element={<Stripe />} />
          <Route path="/reviewForm/:id" element={<AddReview />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
