import React from 'react'
import '../css/main.css';
import '../css/menu.css';


import logo from '../img/contest.png'; 
import recruiterLogo from "../img/recruiter.png"
import jobseekerLogo from "../img/jobseeker.png"
import carousel from '../img/carousel3.png'; 
import NavbarJobseeker from "./navbar.jobseeker.component.js"

const Jobseekerheader = () => {
    return (

<header>
            <div className="top-select">
                <div className="viewas">
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={recruiterLogo}/> &nbsp;View as Job seeker </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton"> <a className="dropdown-item" href="/user"> <img src={jobseekerLogo}/> &nbsp;View as Recruiter</a> </div>
                    </div>
                </div>
            </div>
            <NavbarJobseeker/>
</header>


    )
}

export default Jobseekerheader