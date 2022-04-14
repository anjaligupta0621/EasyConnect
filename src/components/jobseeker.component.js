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
import UserLoginModal from "./userLoginModal.component";

class Jobseeker extends React.Component{

    state = {
        jobs: [],
        currentPage: 1,
        jobsPerPage: 10,
        showModal: false,
        applied: false,
        clickedJob: null,
        isLoggedIn: global.isLoggedIn,
        jobIsApplied: []
    }

    componentDidMount() {
        axios.post('http://localhost:8081/getAllJobs')
            .then(res => {
                const processedJobs = [];

                for (let i = 0; i<res.data.length; i++) {
                    processedJobs.push([res.data[i].JobID, res.data[i], false])
                }
                console.log(processedJobs)
                this.setState({jobs:processedJobs});
                console.log(this.state.jobs);
            })
            .catch(err => console.log(err))
    }

    hideLoginDialog = () => {
		this.setState({
			showModal: false,
		});
	};

	setIsLoggedInUser = (isLoggedIn) => {
		// debugger;
		// this.props.log(true);
		// debugger;
		this.setState({
			isLoggedIn: isLoggedIn,
		});
	};

    signout = () => {
        const reqHeader = {
          Token: localStorage.getItem("userID"),
          UserName: localStorage.getItem("userName"),
        };
        return fetch(`http://localhost:8081/logout`, {
          body: JSON.stringify(reqHeader),
          method: "POST",
          mode: "cors",
        })
          .then((res) => {
            // localStorage.removeItem("userID");
            // localStorage.removeItem("userName");
            this.setIsLoggedInUser(false);
            return res.json();
          })
          .then((result) => {
            this.props.setIsLoggedIn(false);
            global.isLoggedIn = false;
            this.setIsLoggedInUser(false);
            localStorage.removeItem("userID");
            localStorage.removeItem("userName");
    
            console.log(result);
          })
          .catch((e) => {
            global.isLoggedIn = false;
          });
      };

    applyJob = (clickedId) => {
        console.log("inside applyJob");
        console.log(clickedId);  

        const user = {
            JobJobID: clickedId,
            CandidateUserID: parseInt(localStorage.getItem("ID"))
           
        }

    
            console.log("inside isLoggedIn");
            fetch(`http://localhost:8081/applyForJob`, {
                body: JSON.stringify(user),
                method: "POST",
                mode: "cors",
                })
                .then((res) => {
                    console.log("Applied!");
                    // console.log(res.json());
                    return res.json();
                })
                .then((result) => {
                    console.log("Result");
                })
                .catch((e) => {
                    console.log(e);
                });

            let filterAndUpdateJobs = this.state.jobs;
            
            // console.log(filterAndUpdateJobs)
            
            for (let i = 0; i < filterAndUpdateJobs.length; i++) {
                // traversing list of lists

                if(filterAndUpdateJobs[i][0] === clickedId){
                    // matching job id found and hence update its 3rd element to True/False
                    //console.log(filterAndUpdateJobs[i][j][2])
                    if(filterAndUpdateJobs[i][2] === false) {
                        filterAndUpdateJobs[i][2] = true
                    } else {
                        filterAndUpdateJobs[i][2] = false
                    }
                    break
                }
            }
            
            console.log(filterAndUpdateJobs);

            this.setState({jobs:filterAndUpdateJobs});
    }

    render(){
        
        const indexOfLastJob = this.state.currentPage * this.state.jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - this.state.jobsPerPage;
        const currentJobs = this.state.jobs.slice(indexOfFirstJob,indexOfLastJob);
        console.log(this.state.isLoggedIn);
        const paginate = (pageNumber) => {this.setState({currentPage: pageNumber})};


        return (
            <div className="body-outer jobseeker-main">
                <JobSeekerHeader />
                {this.state.showModal ? (
                    <UserLoginModal
                    hideLogin={this.hideLoginDialog}
                    setIsLoggedIn={() => this.setIsLoggedInUser(true)}
                    />
                ) : null}
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
                                                    {currentJobs.sort((a,b) => b[1].JobID - a[1].JobID).map((item) => (
                                    
                                                        <div className="jobs" key={item[1].JobID}>
                                
                                                            <a target="_blank" className="job_title">{item[1].Role_Name} <span>new</span></a>
                                                            <Button 
                                                                onClick={() => this.applyJob(item[1].JobID)}
                                                                disabled={item[2]}
                                                                style={{'float':'right'}}>
                                                                    {item[2]  ? "Applied" : "Easy Apply"}
                                                            </Button>
                                                            <p className="companyname"> Amazon - <span className="where">USA</span></p>
                                                            <p> <i className="fa fa-dollar"></i> {item[1].Salary_Start} &ndash; <i className="fa fa-dollar"></i> {item[1].Salary_End} per hour </p>
                                                            <p className="summary">{item[1].Responsibilities}</p>
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