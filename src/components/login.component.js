import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/login-modal-wizard.css';
import '../css/utils.css';
import '../css/suppress.css';
import closelogo from '../img/close.png';

 
class LoginModal extends React.Component {

    state = {
		showSignUp: false,
        email:"",
        password:"",
        companyName: '',
        recruiterName: '',
        corporateWebsite: '',
        corporateEmail: '',
        contactNumber: '',
        signUpPassword: ''
	}

    onChangeEmailHandler = (event) => {
        this.setState({email: event.target.value});
    }

    onChangePasswordHandler = (event) => {
        this.setState({password: event.target.value});
    }

    onChangeCompanyNameHandler = (event) => {
        this.setState({companyName: event.target.value});
    }

    onChangeRecruiterNameHandler = (event) => {
        this.setState({recruiterName: event.target.value});
    }

    onChangeWebsiteHandler = (event) => {
        this.setState({corporateWebsite: event.target.value});
    }

    onChangeSignUpEmailHandler = (event) => {
        this.setState({corporateEmail: event.target.value});
    }

    onChangeContactHandler = (event) => {
        this.setState({contactNumber: event.target.value});
    }

    onChangeSignUpPasswordHandler = (event) => {
        this.setState({signUpPassword: event.target.value});
    }

    onSignInHandler =(event)=>{

        let data ={
            Email :this.state.email,
            Password: this.state.password
        }    
        fetch(`http://localhost:8081/login`, {body: JSON.stringify(data), method: "POST", mode:"cors"})
        .then(res => {
            // debugger;
            localStorage.setItem('token',1);
            console.log(localStorage.getItem('token'));
            return res.json();
        }).then(result => {
            this.props.hideLogin();
            this.props.setIsLoggedIn(true);
            global.isLoggedIn = true;
            localStorage.setItem('recruiterID',result.ID);
            console.log(localStorage.getItem('recruiterID'));
            // debugger;
        }).catch( e => {
            global.isLoggedIn = false;
            // debugger;
        })     
    }

    onSignupHandler = event => {

        event.preventDefault();
        
        const user = {
            Name: this.state.recruiterName,
            Email: this.state.corporateEmail,
            Password: this.state.signUpPassword,
            Organization: this.state.companyName,
            Website: this.state.corporateWebsite,
            Contact: this.state.contactNumber
        }
        console.log(JSON.stringify(user));
        fetch(`http://localhost:8081/signup`, {body: JSON.stringify(user), method: "POST", mode:"cors"})
            .then(res => {
                console.log("User Added Succesfully")
                return res.json();
            })
            .then(result => {
                this.setState({
                    email: user.Email,
                    password: user.Password,
                    companyName: '',
                    recruiterName: '',
                    corporateWebsite: '',
                    corporateEmail: '',
                    contactNumber: '',
                    signUpPassword: '', 
                })
            })
            .catch( e =>{
                console.log(e);
            })

    }

    showSignUp= ()=>{
      this.setState({showSignUp:true})
    };


    
    hideSignUp= ()=>{
        this.setState({showSignUp:false})
      };

    render() {
    return (
        <div >
            <div id="loginModal" className='modal-login suppress-bg'>

                <div className="modal-content-login"> 
                    <span className="closecv" onClick={this.props.hideLogin}> 
                        <img src={closelogo} width="26" height="27" alt="close" />               
                    </span>

                <div className="modal-header" style={ {display:this.state.showSignUp ? 'block':'none'}} >
                            <div 
                                id="registration_form" 
                            
                                className="overlay-main"> 
                                <a
                                    onClick ={this.hideSignUp}
                                    
                                    style={{textDecoration: "none",
                                            color: "#383838",
                                            fontSize: "14px",
                                            display: "block",
                                            height: "40px",
                                            backgroundColor: "#fff",
                                            lineHeight: "40px",
                                            paddingLeft: "10px"}}
                                            href="#">
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i> Back to Login</a>
                                    
                                <section>
                                    <div className="wizard">								
                                        <form role="form">
                                            <div className="tab-content">
                                                <h3>Please provide your Login Details</h3>		
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                            
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Name of the Company</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="name" 
                                                            id="name" 
                                                            value={this.companyName} 
                                                            onChange={(event) => this.onChangeCompanyNameHandler(event)} 
                                                            className="text-inputs" />
                                                        </div>
                                                            
                                                    </div>
                                                            
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Name of the Recruiter</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="name" 
                                                            id="name"
                                                            value={this.recruiterName} 
                                                            onChange={(event) => this.onChangeRecruiterNameHandler(event)} 
                                                            className="text-inputs" />
                                                                    
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Corporate Website</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="name" 
                                                            id="name"
                                                            value={this.corporateWebsite}
                                                            onChange={(event) => this.onChangeWebsiteHandler(event)}  
                                                            className="text-inputs" />
                                                                    
                                                        </div>
                                                    </div>
                                                            
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Corporate email ID</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="Email" 
                                                            type="email" 
                                                            id="email" 
                                                            value={this.corporateEmail}
                                                            onChange={(event) => this.onChangeSignUpEmailHandler(event)} 
                                                            className="text-inputs" />
                                                            <span id="emailError"></span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Contact Number</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="text" 
                                                            id="name"
                                                            value={this.contactNumber}
                                                            onChange={(event) => this.onChangeContactHandler(event)} 
                                                            className="text-inputs" />
                                                        </div>
                                                    </div>
                                                            
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Password <span>(6 or more characters)</span></div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="password" 
                                                            id="password" 
                                                            value={this.password}
                                                            onChange={(event) => this.onChangeSignUpPasswordHandler(event)} 
                                                            className="text-inputs" />
                                                            <span id="passwordError"></span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{padding:"0px"}}>
                                                                
                                                        <div className="col-lg-12 legend" style={{padding:"0px"}}>Re-enter Password</div>
                                                        <div className="col-lg-12" style={{padding:"0px"}}>
                                                            <input 
                                                            name="name" 
                                                            type="password" 
                                                            id="password" 
                                                            className="text-inputs" />
                                                            <span id="passwordError"></span>
                                                        </div>
                                                    </div>
                                                            
                                                </div>
                                                        
                                                <div className="col-lg-12" style={{padding:"0px"}}>
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-primary next-step submit-button" 
                                                        id="submit" 
                                                        onClick={(event) => this.onSignupHandler(event)}
                                                        data-toggle="modal" 
                                                        data-target=".bd-example-modal-sm">submit</button>
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
                            <h1>Recruiter Login</h1>
                                <div>
                                    <label htmlFor="email" className="col-lg-12">Corporate Email ID</label>
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
                                
                                    <div className="col-lg-12 login bg-transparent">
                                        <input 
                                            type="submit" 
                                            value="LOG IN" 
                                            onClick={(event) => this.onSignInHandler(event)}
                                            className="text-input"/>
                                    </div>
                                 <div className="text-white padding-0-15">
                                 Don't have an account? <a onClick={this.showSignUp} href="#" className="signup-bottom">Sign Up</a>
                                 </div>
                                       
                                </div>
                        </div>
                    </div>
                </div>
           </div>
        
    );
};
};

export default LoginModal;