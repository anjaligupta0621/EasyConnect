import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/login-modal-wizard.css';
import closelogo from '../img/close.png';
import axios from 'axios';
 
class LoginModal extends React.Component {

    state = {
        email : '',
        loginPassword: ''
    }

    onChangeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    onChangePasswordHandler = (event) => {
        this.setState({loginPassword: event.target.value});
    }

    onSignInHandler = (event) => {

        event.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.loginPassword
        }

        console.log(user);

        axios.post('http://localhost:8081/users', user)
            .then(response => {
                console.log("User Logged In");
            })
            .catch(error => {
                console.log("Error occured");
            })
    }

    render() {
    return (
        <div className='body-outer'>
            {/* <div className='backdrop'/> */}
            <div id="loginModal" className='modal-login'>
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
                                    <label htmlFor="email" className="col-lg-12">Corporate Email ID</label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="emailId" 
                                        type="email" 
                                        id="email" 
                                        value={this.email}
                                        onChange={(event) => this.onChangeEmailHandler(event)} 
                                        className="text-input"/>
                                    </div>
                                
                                    <label htmlFor="pass" className="col-lg-12">Enter Password <a href="#">Forgot Password?</a></label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="emailId" 
                                        type="password" 
                                        id="password" 
                                        value={this.loginPassword}
                                        onChange={(event) => this.onChangePasswordHandler(event)} 
                                        className="text-input" />
                                    </div>
                                
                                    <div className="col-lg-12 login">
                                        <input 
                                            type="submit" 
                                            value="LOG IN" 
                                            onClick={(event) => this.onSignInHandler(event)}
                                            className="text-input"/>
                                    </div>
                                
                                        Don't have an account? <Link to={"/signup"} className="signup-bottom">Sign Up</Link>
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
};

export default LoginModal;