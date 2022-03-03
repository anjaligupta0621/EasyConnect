import React,{useState} from 'react';
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component";
import './App.css';
import LoginModal from './components/login.component';
import Jobseekerheader from './components/jobseeker.component';
import PostJob from './components/postJob.component';
import PostJobDashBoard from './components/postJobDashBoard.component';
import RouterContainer from './components/Routes.component';



function App(props) {

  const [username, setUsername] = useState("");
  const [isLog, setIsLog] = useState("false");
  const [user, setUser] = useState();
  
  console.log("value of isLog --> " + isLog);

  // debugger;

  return (
    <RouterContainer setIsLog={setIsLog} isLog={isLog} />
  );
}

export default App;