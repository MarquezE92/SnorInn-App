import RoomForm from "./Admin/Features/RoomForm";
import { Routes, Route } from "react-router-dom";



function App() {
  
  return (
    <>
    <Routes>
      <Route path= '/create' element={<RoomForm/>}/>
    </Routes>
    </>
  );
}

export default App;
