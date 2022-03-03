import React from 'react'

import '../css/styles.css';
import '../css/main.css';
import '../css/menu.css';
import '../css/login-modal-wizard.css';
import '../css/select-drop.css';
import './header.component.css';
// import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./navbar.component.js" 
import recruiterLogo from "../img/recruiter.png"
import jobseekerLogo from "../img/jobseeker.png"

import { withRouter } from 'react-router-dom';

const Header = (props) => {

    const postJob = () => {
        props.showLogin();
    }

    const gotoHome = () => {
        // debugger;
        props.history.push('/home');
    }
   
    return (
        <header>
            <div className="top-select">
                <div className="viewas">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={recruiterLogo}/> &nbsp;view as Recruiter </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a className="dropdown-item" href="/user"> <img src={jobseekerLogo}/> &nbsp;view as Job seeker</a> </div>
                    </div>
                </div>
            </div>
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
                        
                            <li class="active"><Link to="/">Home</Link></li>
                            {
                                (props.isLoggedIn || global.isLoggedIn) ?
                                <li><Link to="/jobDashboard">Post Job Description</Link></li> :
                                <li><button onClick={postJob}>Post Job Description</button></li>
                            }
                            <li><a href="#">Shortlist Candidates</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {
                                    (!props.isLoggedIn && !global.isLoggedIn) ? 
                                    <input name="" type="submit" value="Sign In" className="sign-in-bt-top" id="btnlogin" onClick={props.showLogin} /> :
                                    // <input name="" type="submit" value="Sign Out" className="sign-in-bt-top" id="btnlogout" onClick={props.signOut} />
                                    <a href='\' >Sign Out</a>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header
