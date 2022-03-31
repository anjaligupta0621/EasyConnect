import React from "react";
import "./jobseeker.component.css";

import logo from "../img/contest.png";
import recruiterLogo from "../img/recruiter.png";
import jobseekerLogo from "../img/jobseeker.png";
import carousel1 from "../img/carousel3.png";
import NavbarJobseeker from "./navbar.jobseeker.component.js";
import Pagination from "./Pagination.component";
import axios from "axios";
import { Button } from "react-bootstrap";
import JobSeekerHeader from "./jobSeekerHeader.component";

class Jobseeker extends React.Component{

    state = {
        jobs: [],
        currentPage: 1,
        jobsPerPage: 10,
        showModal: false
    }

    componentDidMount() {
        axios.post('http://localhost:8081/getAllJobs')
            .then(res => {
                // console.log(res.data);
                this.setState({jobs:res.data})
                console.log(this.state.jobs);
            })
            .catch(err => console.log(err))
    }

    hideLoginDialog = () => {
		this.setState({
			showModal: false,
		});
	};

	setIsLoggedIn = (isLoggedIn) => {
		// debugger;
		this.props.log(true);
		// debugger;
		this.setState({
			isLoggedIn: isLoggedIn,
		});
	};

    render(){
        
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        const currentJobs = this.state.jobs.slice(indexOfFirstJob,indexOfLastJob);

        const paginate = (pageNumber) => {this.setState({currentPage: pageNumber})};

        const applyJob = (event) => {
            event.preventDefault();
            this.setState({showModal:true});
        }

        return (
            <div className="body-outer jobseeker-main">
                <JobSeekerHeader />
                <section>
                    <div className="jobSeekermain-wrapper">
                        <div className="jobSeekerbody-area">
                            <div className="body-left w-100">
                                <div className="bodylft-content">
                                    <div className="left-body-main-container">
                                        <div className="common_top_body">
                                            <div
                                                id="carousel-example-generic"
                                                className="carousel slide"
                                                data-ride="carousel"
                                            >
                                                <div className="carousel-inner">
                                                    <div className="item active">
                                                        <img
                                                            className="hidden-xs"
                                                            src={carousel1}
                                                            alt="First slide"
                                                        />
                                                        <img
                                                            className="hidden-md hidden-lg hidden-sm"
                                                            src="img/c4.jpg"
                                                            alt="First slide"
                                                        />
                                                        <div className="header-text">
                                                            <div className="col-md-12 text-left">
                                                                <h3>
                                                                    <span>CHOOSE YOUR DREAM COMPANY</span>
                                                                </h3>

                                                                <span className="comm_span_c">
                                                                    Apply Job's directly with{" "}
                                                                    <span className="style_f">" Single Click"</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img
                                                            className="hidden-xs"
                                                            src="img/carousel1.png"
                                                            alt="Second slide"
                                                        />
                                                        <img
                                                            className="hidden-md hidden-lg hidden-sm"
                                                            src="img/c1.jpg"
                                                            alt="First slide"
                                                        />

                                                        <div className="header-text">
                                                            <div className="col-md-12 text-left">
                                                                <h3>
                                                                    <span>
                                                                        PREPARING FOR RECRUITMENT TESTS AND JOB
                                                                        INTERVIEWS
                                                                    </span>
                                                                </h3>

                                                                <span className="comm_span_c">
                                                                    Our courses on CV Preparation, Interview
                                                                    Preparation, English Grammar &amp; Vocabulary,
                                                                    <br /> Mathematical Aptitude and Logical
                                                                    Reasoning will help you in
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="item">
                                                        <img
                                                            className="hidden-xs"
                                                            src="img/carousel2.png"
                                                            alt="Third slide"
                                                        />
                                                        <img
                                                            className="hidden-md hidden-lg hidden-sm"
                                                            src="img/c2.jpg"
                                                            alt="First slide"
                                                        />
                                                        <div className="header-text">
                                                            <div className="col-md-12 text-left">
                                                                <span className="comm_span_c">
                                                                    Participate in our
                                                                </span>

                                                                <h3>
                                                                    <span>WEEKLY ONLINE CONTESTS</span>
                                                                </h3>

                                                                <span className="comm_span_c">
                                                                    Winners get cash prizes and certificates which
                                                                    can{" "}
                                                                    <span className="style_f2">
                                                                        " BOOST YOUR RESUME "
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="item">
                                                        <img
                                                            className="hidden-xs"
                                                            src="img/carousel3.png"
                                                            alt="Third slide"
                                                        />
                                                        <img
                                                            className="hidden-md hidden-lg hidden-sm"
                                                            src="img/c3.jpg"
                                                            alt="First slide"
                                                        />
                                                        <div className="header-text">
                                                            <div className="col-md-12 text-left">
                                                                <span className="comm_span_c">Take ourr</span>

                                                                <h3>
                                                                    <span>
                                                                        ONLINE EMPLOYABILITY SKILLS ASSESSMENT TESTS
                                                                    </span>
                                                                </h3>

                                                                <span className="comm_span_c">
                                                                    Candidates with proven, in-demand{" "}
                                                                    <span className="style_f2">
                                                                        Employability Skills
                                                                    </span>{" "}
                                                                    are highly sought after by Recruiters
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <a
                                                    className="left carousel-control"
                                                    href="#carousel-example-generic"
                                                    role="button"
                                                    data-slide="prev"
                                                >
                                                    <span className="icon-prev" aria-hidden="true"></span>
                                                </a>
                                                <a
                                                    className="right carousel-control"
                                                    href="#carousel-example-generic"
                                                    role="button"
                                                    data-slide="next"
                                                >
                                                    <span className="icon-next" aria-hidden="true"></span>
                                                </a>
                                            </div>

                                            <div className="clearfix"></div>
                                            <div className="right-body-main-container">
                                                <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12 xs_padding">
                                                    <div className="clearfix"></div>
                                                    <div className="showing"> Show: <b>all jobs</b></div>
                                                    {currentJobs.map((item) => (
                                                        <div className="jobs" key={item.JobID}>
                                                            <a target="_blank" className="job_title">{item.Role_Name} <span>new</span></a>
                                                            <Button 
                                                                onClick={(event) => applyJob(event)}
                                                                style={{'float':'right'}}>Apply</Button>
                                                            <p className="companyname"> Arogya Yoga Mandiram - <span className="where">Bangalore, Karnataka</span></p>
                                                            <p> <i className="fa fa-dollar"></i> {item.Salary_Start} &ndash; <i className="fa fa-dollar"></i> {item.Salary_End} per hour </p>
                                                            <p className="summary">{item.Responsibilities}</p>
                                                        </div>  
                                                    ))}
                                                    <Pagination jobsPerPage={this.state.jobsPerPage} totalJobs={this.state.jobs.length} paginate={paginate} />
                                                </div>
                                            </div>
                                            

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default Jobseeker;
