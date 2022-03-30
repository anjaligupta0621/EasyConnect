import React,{useState} from 'react';
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./components/navbar.component"
import Home from "./components/home.component";
import './App.css';
import RouterContainer from './components/Routes.component';



function App(props) {
  return (
    <RouterContainer/>
  );
}

export default App;