import React, { useState } from "react";

import "../css/styles.css";
import "../css/main.css";
import "../css/menu.css";
import "../css/login-modal-wizard.css";
import "./header.component.css";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./navbar.component.js";
import LoginModal from "./login.component";
import recruiterLogo from "../img/recruiter.png";
import jobseekerLogo from "../img/jobseeker.png";
import ShortlistCandidate from "./shortlistCandidate.component";

const Header = (props) => {
    let navigate = useNavigate();
    const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
    const [showModal, setShowModal] = useState(false);

  const checkLogin = () => {
    if (localStorage.getItem('recruiterID', null) !== null) {
        setIsLoggedInLocal(true);
        return true;
    }
    return false;
  }

    const hideLoginDialog = () => {
        setShowModal(false);
    };

    const signout = () => {
        localStorage.removeItem('recruiterID');
        setIsLoggedInLocal(false);
    }

  return (
    <header>
      <div className="top-select">
        <div className="viewas">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src={recruiterLogo} /> &nbsp;view as Recruiter{" "}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {" "}
              <Link to ="/user" className="dropdown-item" >
                {" "}
                <img src={jobseekerLogo} /> &nbsp;view as Job seeker
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#myNavbar"
            >
              {" "}
              <span className="icon-bar"></span>
              <span className="icon-bar"> </span>{" "}
              <span className="icon-bar"></span>{" "}
            </button>
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
              <li className="active">
                <Link to="/">Home</Link>
              </li>
                <li>
                {
                    isLoggedInLocal || checkLogin() ?
                    <Link to={'/jobDashBoard/'}
                    >
                        Post Job Description
                    </Link> : 
                    <Link to={''} onClick={() => {setShowModal(true)}}
                    >
                        Post Job Description
                    </Link>
                }
                </li>
              
                <li>
                {
                   isLoggedInLocal || checkLogin() ?
                  <Link to="/shortListCandidate">
                      ShortList Candidate
                      </Link>
              : 
                
              <Link to={''} onClick={() => {setShowModal(true)}}
              >
                  ShortList Candidate
              </Link>
                }
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {!isLoggedInLocal ? (
                  <input
                    name=""
                    type="submit"
                    value="Sign In"
                    className="sign-in-bt-top"
                    id="btnlogin"
                    onClick={() => {setShowModal(true)}}
                  />
                ) : (
                  <a onClick={signout} href={"/"}>Sign Out</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showModal ? (
            <LoginModal
                hideLogin={hideLoginDialog}
                setIsLoggedIn={() => setIsLoggedInLocal(true)}
            />
        ) : null}
    </header>
  );
};
export default Header;