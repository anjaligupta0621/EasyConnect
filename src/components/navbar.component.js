import React from 'react'
import './navbar.component.css';
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import LoginModal from './login.component';


const Navbar =(props) => {

    const nav = useNavigate();
    const postJob = () =>{
        if (props.isLoggedIn) {          
            nav('/jobDashBoard');
        } else {
            props.showLogin();
        }
    }
   
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span className="icon-bar"></span><span className="icon-bar"> </span> <span className="icon-bar"></span> </button>
                        <div className="logo main-logo-box">
                             {/* <a href="#"> <img src={logo} alt="" /></a> */}
                             <span className="main-logo"></span>
                             <div className="logo-name">
                                 <span>EASY</span>
                                 <span>CONNECT</span>
                             </div>
                        </div>
                    </div>

                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="/">Home</a></li>
                            <li><a onClick={postJob}>Post Job Description</a></li>
                            <li><a href="#">Shortlist Candidates</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {
                                    (!props.isLoggedIn && !global.isLoggedIn) ? 
                                    <input name="" type="submit" value="Sign In" className="sign-in-bt-top" id="btnlogin" onClick={props.showLogin} /> :
                                    <input name="" type="submit" value="Sign Out" className="sign-in-bt-top" id="btnlogout" onClick={props.signOut} />
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
  

}

export default Navbar;
