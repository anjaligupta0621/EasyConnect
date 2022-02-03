import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component";
import './App.css';
import LoginModal from './components/login.component';

function App(props) {
  return (
          // <Navbar/>
          <Router>
           
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginModal />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
  );
}

export default App;