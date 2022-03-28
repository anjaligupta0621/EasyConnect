import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/login-modal-wizard.css';
import '../css/utils.css';
import '../css/suppress.css';
import closelogo from '../img/close.png';

 
class ApplyJobModal extends React.Component {

    state = {
		showSignUp: false,
        name: "",
        email:"",
        password:"",
        contactNumber: ''
	}

    onChangeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    onChangePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    onChangeNameHandler = (event) => {
        this.setState({name: event.target.value});
    }

    onChangeContactHandler = (event) => {
        this.setState({contactNumber: event.target.value});
    }

    onSubmitHandler = event => {

        event.preventDefault();
        
        const user = {
            Name: this.state.name,
            Email: this.state.email,
            Password: this.state.password,
            Contact: this.state.contactNumber
        }

        console.log(JSON.stringify(user));
        // fetch(`http://localhost:8081/signup`, {body: JSON.stringify(user), method: "POST", mode:"cors"})
        //     .then(res => {
        //         console.log("User Added Succesfully")
        //         return res.json();
        //     })
        //     .then(result => {
        //         this.setState({
        //             email: user.Email,
        //             password: user.Password,
        //             companyName: '',
        //             recruiterName: '',
        //             corporateWebsite: '',
        //             corporateEmail: '',
        //             contactNumber: '',
        //             signUpPassword: '', 
        //         })
        //     })
        //     .catch( e =>{
        //         console.log(e);
        //     })

    }

    render() {
    return (
        <div >
            <div id="loginModal" className='modal-login suppress-bg'>

                <div className="modal-content-login"> 
                    <span className="closecv" onClick={this.props.hideLogin}> 
                        <img src={closelogo} width="26" height="27" alt="close" />               
                    </span>

                    <div className="modal-body w-100">
                            <h1>Jobseeker Details</h1>
                                <div>
                                    <label htmlFor="name" className="col-lg-12">Name</label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="name" 
                                        type="text" 
                                        id="name" 
                                        value={this.state.name}
                                        onChange={(event) => this.onChangeNameHandler(event)} 
                                        className="text-input"/>
                                    </div>

                                    <label htmlFor="email" className="col-lg-12">Email ID</label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="emailId" 
                                        type="email" 
                                        id="email" 
                                        value={this.state.email}
                                        onChange={(event) => this.onChangeEmailHandler(event)} 
                                        className="text-input"/>
                                    </div>
                                
                                    <label htmlFor="pass" className="col-lg-12">Enter Password <a href="#">Forgot Password?</a></label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="Password" 
                                        type="password" 
                                        id="password" 
                                        value={this.state.password}
                                        onChange={(event) => this.onChangePasswordHandler(event)} 
                                        className="text-input" />
                                    </div>

                                    <label htmlFor="contact" className="col-lg-12">Contact Number </label>
                                    <div className="col-lg-12">
                                        <input 
                                        name="contact" 
                                        type="number" 
                                        id="contact" 
                                        value={this.state.contactNumber}
                                        onChange={(event) => this.onChangeContactHandler(event)} 
                                        className="text-input"/>
                                    </div>
                                
                                    <div className="col-lg-12 login bg-transparent">
                                        <input 
                                            type="submit" 
                                            value="APPLY" 
                                            onClick={(event) => this.onSubmitHandler(event)}
                                            className="text-input"/>
                                    </div>
                                       
                                </div>
                        </div>
                    </div>
                </div>
           </div>
        
    );
};
};

export default ApplyJobModal;