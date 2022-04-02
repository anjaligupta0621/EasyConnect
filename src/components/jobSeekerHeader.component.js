import React, { useState } from "react";

import "./jobSeekerHeader.component.css";
import UserLoginModal from "./userLoginModal.component";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import recruiterLogo from "../img/recruiter.png";
import jobseekerLogo from "../img/jobseeker.png";

const Header = (props) => {
  let navigate = useNavigate();
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const checkLogin = () => {
    if (localStorage.getItem("userID", null) !== null) {
      setIsLoggedInUser(true);
      return true;
    }
    return false;
  };

  const hideLoginDialog = () => {
    setShowUserModal(false);
  };

  const signout = () => {
    const reqHeader = {
      Token: localStorage.getItem("userID"),
      UserName: localStorage.getItem("userName"),
    };
    return fetch(`http://localhost:8081/logout`, {
      body: JSON.stringify(reqHeader),
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");
        setIsLoggedInUser(false);
        this.props.setIsLoggedIn(false);
        global.isLoggedIn = false;
        return res.json();
      })
      .then((result) => {
        this.props.setIsLoggedIn(false);
        global.isLoggedIn = false;
        setIsLoggedInUser(false);
        localStorage.removeItem("userID");
        localStorage.removeItem("userName");

        console.log(result);
      })
      .catch((e) => {
        global.isLoggedIn = false;
      });
  };

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
              <img src={recruiterLogo} /> &nbsp;View as Job seeker{" "}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {" "}
              <a className="dropdown-item" href="/">
                {" "}
                <img src={jobseekerLogo} /> &nbsp;View as Recruiter
              </a>{" "}
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
                <Link to="/user">Home</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {!isLoggedInUser ? (
                  <input
                    name=""
                    type="submit"
                    value="Sign In"
                    className="sign-in-bt-top"
                    id="btnlogin"
                    onClick={() => {
                      setShowUserModal(true);
                    }}
                  />
                ) : (
                  <Link to="/user" onClick={signout}>
                    Sign Out
                  </Link>
                  // <input name="" type="submit" value="Sign Out" className="sign-in-bt-top" id="btnlogout" onClick={props.signOut} />
                  // <Link to="/" onClick={(e)=>signout(e)}>Sign Out</Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showUserModal ? (
        <UserLoginModal
          hideLogin={hideLoginDialog}
          setIsLoggedIn={() => setIsLoggedInUser(true)}
        />
      ) : null}
    </header>
  );
};
export default Header;
