import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/login-modal-wizard.css";
import "../css/utils.css";
import "../css/suppress.css";
import closelogo from "../img/close.png";

class LoginModal extends React.Component {
  //   state = {
  //     showSignUp: false,
  //     email: "",
  //     password: "",
  //     companyName: "",
  //     recruiterName: "",
  //     corporateWebsite: "",
  //     corporateEmail: "",
  //     contactNumber: "",
  //     signUpPassword: "",
  //   };

  //   onChangeEmailHandler = (event) => {
  //     this.setState({ email: event.target.value, signinErr: false });
  //   };

  //   onChangePasswordHandler = (event) => {
  //     this.setState({ password: event.target.value, signinErr: false });
  //   };

  //   onChangeCompanyNameHandler = (event) => {
  //     this.setState({ companyName: event.target.value });
  //   };

  //   onChangeRecruiterNameHandler = (event) => {
  //     this.setState({ recruiterName: event.target.value });
  //   };

  //   onChangeWebsiteHandler = (event) => {
  //     this.setState({ corporateWebsite: event.target.value });
  //   };

  //   onChangeSignUpEmailHandler = (event) => {
  //     this.setState({ corporateEmail: event.target.value });
  //   };

  //   onChangeContactHandler = (event) => {
  //     this.setState({ contactNumber: event.target.value });
  //   };

  //   onChangeSignUpPasswordHandler = (event) => {
  //     this.setState({ signUpPassword: event.target.value });
  //   };

  state = {
    showSignUp: false,
    email: "",
    password: "",
    companyName: "",
    recruiterName: "",
    corporateWebsite: "",
    corporateEmail: "",
    contactNumber: "",
    signUpPassword: "",
    showLoginError: false,
    showSignupError: false,
  };

  onChangeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  onChangeCompanyNameHandler = (event) => {
    this.setState({ companyName: event.target.value });
  };

  onChangeRecruiterNameHandler = (event) => {
    this.setState({ recruiterName: event.target.value });
  };

  onChangeWebsiteHandler = (event) => {
    this.setState({ corporateWebsite: event.target.value });
  };

  onChangeSignUpEmailHandler = (event) => {
    this.setState({ corporateEmail: event.target.value });
  };

  onChangeContactHandler = (event) => {
    this.setState({ contactNumber: event.target.value });
  };

  onChangeSignUpPasswordHandler = (event) => {
    this.setState({ signUpPassword: event.target.value });
  };

  onSignInHandler = (event) => {
    // event.preventDefault();
    let data = {
      Email: this.state.email,
      Password: this.state.password,
    };
    return fetch(`http://localhost:8081/login`, {
      body: JSON.stringify(data),
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        this.setState({ showLoginError: false });
        this.props.hideLogin();
        this.props.setIsLoggedIn(true);
        localStorage.setItem("token", result.Token);
        localStorage.setItem("recruiterId", result.Recruiter.ID);
        localStorage.setItem("userName", result.Recruiter.Email);
      })
      .catch((e) => {
        this.setState({ showLoginError: true });
        console.log(e);
      });
  };

  // onSignupHandler = (event) => {
  //   event.preventDefault();

  //   const user = {
  //     Name: this.state.recruiterName,
  //     Email: this.state.corporateEmail,
  //     Password: this.state.signUpPassword,
  //     Organization: this.state.companyName,
  //     Website: this.state.corporateWebsite,
  //     Contact: this.state.contactNumber,
  //   };
  //   console.log(JSON.stringify(user));
  //   fetch(`http://localhost:8081/signup`, {
  //     body: JSON.stringify(user),
  //     method: "POST",
  //     mode: "cors",
  //   })
  //     .then((res) => {
  //       console.log("User Added Succesfully");
  //       return res.json();
  //     })
  //     .then((result) => {
  //       this.setState({
  //         email: user.Email,
  //         password: user.Password,
  //         companyName: "",
  //         recruiterName: "",
  //         corporateWebsite: "",
  //         corporateEmail: "",
  //         contactNumber: "",
  //         signUpPassword: "",
  //       });
  //       this.hideSignUp();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  showSignUp = () => {
    this.setState({ showSignUp: true });
  };

  onSignupHandler = (event) => {
    event.preventDefault();

    const user = {
      Name: this.state.recruiterName,
      Email: this.state.corporateEmail,
      Password: this.state.signUpPassword,
      Organization: this.state.companyName,
      Website: this.state.corporateWebsite,
      Contact: this.state.contactNumber,
    };
    console.log(JSON.stringify(user));
    fetch(`http://localhost:8081/signup`, {
      body: JSON.stringify(user),
      method: "POST",
      mode: "cors",
    })
      .then((res) => {
        console.log("User Added Succesfully");
        return res.json();
      })
      .then((result) => {
        this.setState({
          email: user.Email,
          password: user.Password,
          companyName: "",
          recruiterName: "",
          corporateWebsite: "",
          corporateEmail: "",
          contactNumber: "",
          signUpPassword: "",
          showSignUp: false,
        });
        this.setState({ showSignupError: false });
        this.props.hideLogin();
        this.props.setIsLoggedIn(true);
        global.isLoggedIn = true;
        localStorage.setItem("token", result.Token);
        localStorage.setItem("recruiterId", result.Recruiter.ID);
        localStorage.setItem("userName", result.Recruiter.Email);
      })
      .catch((e) => {
        this.setState({ showSignupError: true });
        console.log(e);
      });
  };

  showSignUp = () => {
    this.setState({ showSignUp: true });
  };

  hideSignUp = () => {
    this.setState({ showSignUp: false });
  };

  render() {
    return (
      <div>
        <div id="loginModal" className="modal-login suppress-bg">
          <div className="modal-content-login">
            <span className="closecv" onClick={this.props.hideLogin}>
              <img src={closelogo} width="26" height="27" alt="close" />
            </span>

            <div
              className="modal-header"
              style={{ display: this.state.showSignUp ? "block" : "none" }}
            >
              <label
                className={`error-handling ${
                  !this.state.showSignupError ? "hide-error-message" : ""
                }`}
              >
                User Already Registered
              </label>
              <div id="registration_form" className="overlay-main">
                <a
                  onClick={this.hideSignUp}
                  style={{
                    textDecoration: "none",
                    color: "#383838",
                    fontSize: "14px",
                    display: "block",
                    height: "40px",
                    backgroundColor: "#fff",
                    lineHeight: "40px",
                    paddingLeft: "10px",
                  }}
                  href="#"
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i> Back
                  to Login
                </a>

                <section>
                  <div className="wizard">
                    <form role="form">
                      <div className="tab-content">
                        <h3>Please provide your Login Details</h3>
                        <div
                          className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                          style={{ padding: "0px" }}
                        >
                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Name of the Company
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="company-name"
                                type="text"
                                id="company-name"
                                value={this.companyName}
                                onChange={(event) =>
                                  this.onChangeCompanyNameHandler(event)
                                }
                                className="text-inputs"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Name of the Recruiter
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="recruiter-name"
                                type="text"
                                id="recruiter-name"
                                value={this.recruiterName}
                                onChange={(event) =>
                                  this.onChangeRecruiterNameHandler(event)
                                }
                                className="text-inputs"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Corporate Website
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="corporate-website"
                                type="text"
                                id="corporate-website"
                                value={this.corporateWebsite}
                                onChange={(event) =>
                                  this.onChangeWebsiteHandler(event)
                                }
                                className="text-inputs"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Corporate email ID
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="corporate-email"
                                type="email"
                                id="corporate-email"
                                value={this.corporateEmail}
                                onChange={(event) =>
                                  this.onChangeSignUpEmailHandler(event)
                                }
                                className="text-inputs"
                              />
                              <span id="emailError"></span>
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Contact Number
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="contact-number"
                                type="text"
                                id="contact-number"
                                value={this.contactNumber}
                                onChange={(event) =>
                                  this.onChangeContactHandler(event)
                                }
                                className="text-inputs"
                              />
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Password <span>(6 or more characters)</span>
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="signup-password"
                                type="password"
                                id="signup-password"
                                value={this.password}
                                onChange={(event) =>
                                  this.onChangeSignUpPasswordHandler(event)
                                }
                                className="text-inputs"
                              />
                              <span id="passwordError"></span>
                            </div>
                          </div>

                          <div
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                            style={{ padding: "0px" }}
                          >
                            <div
                              className="col-lg-12 legend"
                              style={{ padding: "0px" }}
                            >
                              Re-enter Password
                            </div>
                            <div
                              className="col-lg-12"
                              style={{ padding: "0px" }}
                            >
                              <input
                                name="password-repeat"
                                type="password"
                                id="password-repeat"
                                className="text-inputs"
                              />
                              <span id="passwordError"></span>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12" style={{ padding: "0px" }}>
                          <button
                            type="button"
                            className="btn btn-primary next-step submit-button"
                            id="signup-submit"
                            name="signup-submit"
                            onClick={(event) => this.onSignupHandler(event)}
                            data-toggle="modal"
                            data-target=".bd-example-modal-sm"
                          >
                            submit
                          </button>
                        </div>

                        <div className="clearfix"></div>
                      </div>
                    </form>
                  </div>
                </section>
              </div>

              <img src="img/login-logo.png" />
            </div>

            <div className="modal-body w-100">
              <label
                className={`error-handling ${
                  !this.state.showLoginError ? "hide-error-message" : ""
                }`}
              >
                Incorrect Email/Password
              </label>

              <h1>Recruiter Login</h1>
              <div>
                <label htmlFor="email" className="col-lg-12">
                  Corporate Email ID
                </label>
                <div className="col-lg-12">
                  <input
                    name="emailId"
                    type="email"
                    id="email"
                    value={this.state.email}
                    onChange={(event) => this.onChangeEmailHandler(event)}
                    className="text-input"
                  />
                </div>

                <label htmlFor="pass" className="col-lg-12">
                  Enter Password <a href="#">Forgot Password?</a>
                </label>
                <div className="col-lg-12">
                  <input
                    name="login-password"
                    type="password"
                    id="login-password"
                    value={this.state.password}
                    onChange={(event) => this.onChangePasswordHandler(event)}
                    className="text-input"
                  />
                </div>

                <div className="col-lg-12 login bg-transparent">
                  <input
                    type="submit"
                    name="login-submit"
                    value="LOG IN"
                    onClick={(event) => this.onSignInHandler(event)}
                    className="text-input"
                  />
                </div>
                <div className="text-white padding-0-15">
                  Don't have an account?{" "}
                  <a onClick={this.showSignUp} className="signup-bottom">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
