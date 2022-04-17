import React, { useState, useEffect } from "react";
import { matchPath, useLocation } from "react-router";
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
  const location = useLocation();
  const [user, setUser] = useState(undefined);

  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      var raw = JSON.stringify({
        User: localStorage.getItem("userName"),
        Token: localStorage.getItem("token"),
      });
      //debugger;

      fetch(`http://localhost:8081/getCurrentRecruiter`, {
        body: raw,
        method: "POST",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((result) => {
          //debugger;
          setUser(result);
        })
        .catch((error) => console.log("error", error));
      console.log(user, "---->");
    }
  }, []);
  const checkLocationActive = (curPath) => {
    const isActive = !!matchPath(
      {
        path: curPath,
        exact: true,
        strict: true,
      },
      location.pathname
    );
    return isActive;
  };
  const checkLogin = () => {
    if (localStorage.getItem("token", null) !== null) {
      setIsLoggedInLocal(true);
      return true;
    }
    return false;
  };

  const hideLoginDialog = () => {
    setShowModal(false);
  };

  const signout = () => {
    const reqHeader = {
      Token: localStorage.getItem("token"),
      UserName: localStorage.getItem("userName"),
    };
    return fetch(`http://localhost:8081/logout`, {
      body: JSON.stringify(reqHeader),
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        // debugger;
        // localStorage.removeItem("token");
        // localStorage.removeItem("recruiterId");
        // localStorage.removeItem("userName");
        localStorage.clear();
        setIsLoggedInLocal(false);
        return res.json();
      })
      .then((result) => {
        this.props.setIsLoggedIn(false);
        global.isLoggedIn = false;
        setIsLoggedInLocal(false);
        // localStorage.removeItem("token");
        // localStorage.removeItem("recruiterId");
        // localStorage.removeItem("userName");
        localStorage.clear();
        setUser(undefined);

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
              <img src={recruiterLogo} /> &nbsp;view as Recruiter{" "}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {" "}
              <Link to="/user" className="dropdown-item">
                {" "}
                <img src={jobseekerLogo} /> &nbsp;view as Job seeker
              </Link>{" "}
            </div>
          </div>
        </div>
        <div className={`user-avatar-box ${!user ? "hidebox" : ""}`}>
          <span className="user-avatar"></span>
          <span className="user-name">
            Welcome: {user ? user.Name : "Guest User"}
          </span>
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
              <li className={`${checkLocationActive("/") ? "active" : ""}`}>
                <Link to="/">Home</Link>
              </li>
              <li
                className={`${
                  checkLocationActive("jobDashBoard/") ? "active" : ""
                }`}
              >
                {isLoggedInLocal || checkLogin() ? (
                  <Link to={"/jobDashBoard/"} className="post-job-anchor">
                    Post Job Description
                  </Link>
                ) : (
                  <Link
                    to={""}
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="post-job-anchor"
                  >
                    Post Job Description
                  </Link>
                )}
              </li>

              <li
                className={`${
                  checkLocationActive("/shortListCandidate") ? "active" : ""
                }`}
              >
                {isLoggedInLocal || checkLogin() ? (
                  <Link to="/shortListCandidate" className="shortlist-anchor">
                    ShortList Candidate
                  </Link>
                ) : (
                  <Link
                    to={""}
                    onClick={() => {
                      setShowModal(true);
                    }}
                    className="shortlist-anchor"
                  >
                    ShortList Candidate
                  </Link>
                )}
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {!isLoggedInLocal ? (
                  <input
                    name="login-button"
                    type="submit"
                    value="Sign In"
                    className="sign-in-bt-top"
                    id="btnlogin"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                ) : (
                  <Link to="/" onClick={signout} className="signout-button">
                    Sign Out
                  </Link>
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
