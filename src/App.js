import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component";
import './App.css';
import LoginModal from './components/login.component';
import SignUpModal from './components/signup.component';
import Jobseekerheader from './components/jobseeker.component';
import PostJob from './components/postJob.component';


function App(props) {
  return (
          // <Navbar/>
          <Router>
           
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginModal />} />
              <Route path="/signup" element={<SignUpModal />} />
              <Route path="/postjob" element={<PostJob />} />
              <Route path="/" element={<Home />} />
              <Route path="/user" element={<Jobseekerheader />} />
            </Routes>
          </Router>
  );
}

export default App;