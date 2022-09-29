import RoomForm from "./Admin/Features/RoomForm";
import NavBar from "./Shared/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <>
    <NavBar/>
    <Routes>
      <Route path= '/create' element={<RoomForm/>}/>
    </Routes>
    </>
  );
}

export default App;

