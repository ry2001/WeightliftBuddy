import React from "react"
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import BottomNavbar from './Components/BottomNavbar';
import Home from "./routes/Home";
import NewActivity from "./routes/NewActivity";
import Settings from "./routes/Settings";
import Profile from "./routes/Profile";
import History from "./routes/History";
import Login from "./routes/Login";
import Register from "./routes/Register";
import About from "./routes/About";
import Display from "./routes/Display";
import Help from "./routes/Help";
import Review from "./routes/Review";
import ReviewandSave from "./routes/ReviewandSave";
import Navigation from "./Components/Navigation";
//import TopHeader from "./Components/TopHeader";


function App() {
  
    return (
        <>
        <div>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/history" element={<History/>} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/createactivity" element={<NewActivity />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/display" element={<Display />} />
          <Route path="/help" element={<Help />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewandsave" element={<ReviewandSave />} />

        </Routes>
        
        </div>
        </>
    );
  }
  
  export default App;
  