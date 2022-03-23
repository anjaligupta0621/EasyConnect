import React from 'react'
import './navbar.component.css';
import { useNavigate } from "react-router-dom";
import logo from '../img/logo.png';
import LoginModal from './login.component';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const Navbar =(props) => {

    const nav = useNavigate();
    // const history = useHistory();
    const postJob = () =>{
        if (props.isLoggedIn) {          
            this.props.history.push('/jobDashBoard');
        } else {
            props.showLogin();
        }
    }

    const gotoHome = () => {
        debugger;
        this.props.history.push('/home');
    }
   
        return (
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
                            <li className="active"><button onClick={gotoHome}>Home</button></li>
                            <li><button onClick={postJob}>Post Job Description</button></li>
                            <li><a href="#">Shortlist Candidates</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {
                                    (!props.isLoggedIn && !global.isLoggedIn) ? 
                                    <input name="" type="submit" value="Sign In" className="sign-in-bt-top" id="btnlogin" onClick={props.showLogin} /> :
                                    <input name="" type="submit" value="Sign Out" className="sign-in-bt-top" id="btnlogout" onClick={props.signOut} />
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
  

}

export default Navbar;
