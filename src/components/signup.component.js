import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/login-modal-wizard.css';
import closelogo from '../img/close.png';

class SignUpModal extends React.Component {

    state = {
        companyName: '',
        recruiterName: '',
        corporateWebsite: '',
        corporateEmail: '',
        contactNumber: '',
        password: ''
    }

    onChangeCompanyNameHandler = (event) => {
        this.setState({ companyName: event.target.value });
    }

    onChangeRecruiterNameHandler = (event) => {
        this.setState({ recruiterName: event.target.value });
    }

    onChangeWebsiteHandler = (event) => {
        this.setState({ corporateWebsite: event.target.value });
    }

    onChangeEmailHandler = (event) => {
        this.setState({ corporateEmail: event.target.value });
    }

    onChangeContactHandler = (event) => {
        this.setState({ contactNumber: event.target.value });
    }

    onChangePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }


    render() {
        return (
            <div>
                {/* <div className='backdrop'/> */}
                <div id="loginModal" className='modal-login'>
                    <div className="modal-content-login">
                        <span className="closecv">
                            <Link to="/">
                                <img src={closelogo} width="26" height="27" alt="close" />
                            </Link>
                        </span>

                        <div className="modal-header">
                            <div
                                id="registration_form"

                                className="overlay-main">
                                <Link
                                    to="/login"
                                    style={{
                                        textDecoration: "none",
                                        color: "#383838",
                                        fontSize: "14px",
                                        display: "block",
                                        height: "40px",
                                        backgroundColor: "#fff",
                                        lineHeight: "40px",
                                        paddingLeft: "10px"
                                    }}>
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Login</Link>

                                <section>
                                    <div className="wizard">
                                        <form role="form">
                                            <div className="tab-content">
                                                <h3>Please provide your Login Details</h3>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Name of the Company*</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="name"
                                                                id="name"
                                                                required
                                                                value={this.companyName}
                                                                onChange={() => this.onChangeCompanyNameHandler}
                                                                className="text-inputs" />
                                                        </div>

                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Name of the Recruiter*</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="name"
                                                                id="name"
                                                                required
                                                                value={this.recruiterName}
                                                                onChange={() => this.onChangeRecruiterNameHandler}
                                                                className="text-inputs" />

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Corporate Website</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="name"
                                                                id="name"
                                                                value={this.corporateWebsite}
                                                                onChange={() => this.onChangeWebsiteHandler}
                                                                className="text-inputs" />

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Corporate email ID*</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="Email"
                                                                type="email"
                                                                id="email"
                                                                required
                                                                value={this.corporateEmail}
                                                                onChange={() => this.onChangeEmailHandler}
                                                                className="text-inputs" />
                                                            <span id="emailError"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ padding: "0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Contact Number*</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                id="name"
                                                                required
                                                                value={this.contactNumber}
                                                                onChange={() => this.onChangeContactHandler}
                                                                className="text-inputs" />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ padding: "0px  10px 0px 0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Password* <span>(6 or more characters)</span></div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="password"
                                                                id="password"
                                                                required
                                                                value={this.password}
                                                                onChange={() => this.onChangePasswordHandler}
                                                                className="text-inputs" />
                                                            <span id="passwordError"></span>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ padding: "1px 0 0 0px" }}>

                                                        <div className="col-lg-12 legend" style={{ padding: "0px" }}>Re-enter Password*</div>
                                                        <div className="col-lg-12" style={{ padding: "0px" }}>
                                                            <input
                                                                name="name"
                                                                type="password"
                                                                id="password"
                                                                required
                                                                className="text-inputs" />
                                                            <span id="passwordError"></span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-lg-12" style={{ padding: "0px" }}>
                                                    <input type="submit" className="btn btn-primary next-step submit-button" id="submit" data-toggle="modal" data-target=".bd-example-modal-sm" value="submit"/>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </form>
                                    </div>
                                </section>

                            </div>

                            <img src="img/login-logo.png" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default SignUpModal;