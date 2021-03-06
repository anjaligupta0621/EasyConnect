import React from 'react'
import './navbar.jobseeker.component.css';

const NavbarJobseeker = () => {

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
                            <li className="active"><a href="index.html">Home</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <input name="" type="submit" value="Sign In" className="sign-in-bt-top" id="btnlogin" onClick={(event) => this.onSignIn(event)} />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    

}

export default NavbarJobseeker;
