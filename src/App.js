import React from "react"
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import BottomNavbar from './Components/BottomNavbar';
import Home from "./routes/Home";
import CreateActivity from "./routes/CreateActivity";
import Settings from "./routes/Settings";
import Profile from "./routes/Profile";
import History from "./routes/History";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Review from "./routes/Review";
import ReviewandSave from "./routes/ReviewandSave";


function App() {
  
    return (
        <>
       

      
      <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/history" element={<History/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createactivity" element={<CreateActivity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewandsave" element={<ReviewandSave />} />

        </Routes>
        <BottomNavbar />
        
        </>
    );
  }
  
  export default App;
  