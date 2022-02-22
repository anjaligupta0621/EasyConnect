import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login-modal-wizard.css";
import closelogo from "../img/close.png";

class LoginModal extends React.Component {
  state = {
    email: "",
    loginPassword: "",
  };

  onChangeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePasswordHandler = (event) => {
    this.setState({ loginPassword: event.target.value });
  };

  render() {
    return (
      <div>
        {/* <div className='backdrop'/> */}
        <div id="loginModal" className="modal-login">
          <div className="modal-content-login">
            <span className="closecv">
              <Link to="/">
                <img src={closelogo} width="26" height="27" alt="close" />
              </Link>
            </span>

            <div className="modal-header">
              <div className="modal-body">
                <h1>Recruiter Login</h1>
                <form>
                  <label htmlFor="email" className="col-lg-12 text-left">
                    Corporate Email ID*
                  </label>
                  <div className="col-lg-12">
                    <input
                      name="emailId"
                      type="email"
                      id="email"
                      required
                      value={this.email}
                      onChange={(event) => this.onChangeEmailHandler}
                      className="text-input"
                    />
                  </div>

                  <label htmlFor="pass" className="col-lg-12 text-left">
                    Enter Password *<a href="#">Forgot Password?</a>
                  </label>
                  <div className="col-lg-12">
                    <input
                      name="emailId"
                      type="password"
                      id="password"
                      required
                      value={this.loginPassword}
                      onChange={(event) => this.onChangePasswordHandler}
                      className="text-input"
                    />
                  </div>

                  <div className="col-lg-12 login">
                    <input
                      type="submit"
                      value="LOG IN"
                      className="text-input"
                    />
                  </div>

                  <div className="text-left">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="signup-bottom">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
