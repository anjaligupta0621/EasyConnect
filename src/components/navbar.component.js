import React from 'react'
import './navbar.component.css';
import { Navigate } from "react-router-dom";
import logo from '../img/logo.png'; 
import LoginModal from './login.component';
 

class Navbar extends React.Component{

    state = {
        showComponent : false
    }

    onSignIn = (event) => {
        // console.log("lodu")
        window.location = "/login"
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span className="icon-bar"></span><span className="icon-bar"> </span> <span className="icon-bar"></span> </button>
                        <div className="logo"> <a href="#"> <img src={logo} alt=""/></a></div>
                    </div>
                        
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="index.html">Home</a></li>
                            <li><a href="#">Candidate Profile Search</a></li>
                            <li><a href="#">Post Job Description</a></li>
                            <li><a href="#">Shortlist Candidates</a></li>
                        </ul>
                            <ul className="nav navbar-nav navbar-right">
                            <li>
                                <input name="" type="submit" value="Sign In" className="sign-in-bt-top" id="btnlogin" onClick={(event) => this.onSignIn(event)}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }

}    

export default Navbar;
