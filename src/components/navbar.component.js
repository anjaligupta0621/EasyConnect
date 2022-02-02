import React from 'react'
import './navbar.component.css';

import logo from '../img/logo.png'; 
 

const Navbar = () => {
    return (

    <nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span><span class="icon-bar"> </span> <span class="icon-bar"></span> </button>
                <div class="logo"> <a href="#"> <img src={logo} alt=""/></a></div>
            </div>
                
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="index.html">Home</a></li>
                    <li><a href="#">Candidate Profile Search</a></li>
                    <li><a href="#">Post Job Description</a></li>
                    <li><a href="#">Shortlist Candidates</a></li>
                </ul>
                    <ul class="nav navbar-nav navbar-right">
                    <li>
                            <input name="" type="submit" value="Sign In" class="sign-in-bt-top" id="btnlogin"/>
                        </li>
                    </ul>
            </div>
        </div>
    </nav>
   
       
        
   
    

    )
}
export default Navbar
