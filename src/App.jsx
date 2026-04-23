
import { Routes, Route } from "react-router-dom";
import "./App.css";

import LoginPage from "./loginPage";
import AddMember from "./addmember";
import Home from "./home";
import Classic from "./Classic";


function App() {
 

  return (
    <>
      

        <Routes>
        <Route path="/" element={<Classic/>} />
        <Route path="/add" element={<AddMember />} />
        <Route path="/home" element={<Home />} />
       
      </Routes>
      
      

    </>
  );
}

export default App;
