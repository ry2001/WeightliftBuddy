import React from "react"
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import BottomNavbar from './Components/BottomNavbar';
import Home from './routes/Home';


function App() {
  
    return (
        <>
        <BottomNavbar />

        <div>
      <h1>Testing!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/Home">Home</Link>
      </nav>
      </div>
        
        </>
    );
  }
  
  export default App;
  