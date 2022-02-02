import React from 'react'
import '../css/main.css';
import '../css/menu.css';
import '../css/styles.css';
import '../css/login-modal-wizard.css';
import '../css/select-drop.css';
import './header.component.css';

import Navbar from "./navbar.component.js" 
import recruiterLogo from "../img/recruiter.png"
import jobseekerLogo from "../img/jobseeker.png"

const Header = () => {
    return (

    <header>
        <div class="top-select">
                <div class="viewas">
                <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={recruiterLogo}/> &nbsp;view as Recruiter </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item" href="#"> <img src={jobseekerLogo}/> &nbsp;view as Job seeker</a> </div>
                    </div>
            </div>
            </div>
       <Navbar/>
    </header>
    

    )
}
export default Header
