import React from "react";
import "./jobseeker.component.css";

import logo from "../img/contest.png";
import recruiterLogo from "../img/recruiter.png";
import jobseekerLogo from "../img/jobseeker.png";
import carousel1 from "../img/carousel3.png";
import NavbarJobseeker from "./navbar.jobseeker.component.js";

const Jobseekerheader = () => {
    return (
        <div className="body-outer jobseeker-main">
            <header>
                <div className="top-select">
                    <div className="viewas">
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img src={recruiterLogo} /> &nbsp;View as Job seeker{" "}
                            </button>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                            >
                                {" "}
                                <a className="dropdown-item" href="/">
                                    {" "}
                                    <img src={jobseekerLogo} /> &nbsp;View as Recruiter
                                </a>{" "}
                            </div>
                        </div>
                    </div>
                </div>
                <NavbarJobseeker />
            </header>
            <section>
                <div class="jobSeekermain-wrapper">
                    <div class="jobSeekerbody-area">
                        <div class="body-left w-100">
                            <div class="bodylft-content">
                                <div class="left-body-main-container">
                                    <div class="common_top_body">
                                        <div
                                            id="carousel-example-generic"
                                            class="carousel slide"
                                            data-ride="carousel"
                                        >
                                            <div class="carousel-inner">
                                                <div class="item active">
                                                    <img
                                                        class="hidden-xs"
                                                        src={carousel1}
                                                        alt="First slide"
                                                    />
                                                    <img
                                                        class="hidden-md hidden-lg hidden-sm"
                                                        src="img/c4.jpg"
                                                        alt="First slide"
                                                    />
                                                    <div class="header-text">
                                                        <div class="col-md-12 text-left">
                                                            <h3>
                                                                <span>CHOOSE YOUR DREAM COMPANY</span>
                                                            </h3>

                                                            <span class="comm_span_c">
                                                                Apply Job's directly with{" "}
                                                                <span class="style_f">" Single Click"</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="item">
                                                    <img
                                                        class="hidden-xs"
                                                        src="img/carousel1.png"
                                                        alt="Second slide"
                                                    />
                                                    <img
                                                        class="hidden-md hidden-lg hidden-sm"
                                                        src="img/c1.jpg"
                                                        alt="First slide"
                                                    />

                                                    <div class="header-text">
                                                        <div class="col-md-12 text-left">
                                                            <h3>
                                                                <span>
                                                                    PREPARING FOR RECRUITMENT TESTS AND JOB
                                                                    INTERVIEWS
                                                                </span>
                                                            </h3>

                                                            <span class="comm_span_c">
                                                                Our courses on CV Preparation, Interview
                                                                Preparation, English Grammar &amp; Vocabulary,
                                                                <br /> Mathematical Aptitude and Logical
                                                                Reasoning will help you in
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="item">
                                                    <img
                                                        class="hidden-xs"
                                                        src="img/carousel2.png"
                                                        alt="Third slide"
                                                    />
                                                    <img
                                                        class="hidden-md hidden-lg hidden-sm"
                                                        src="img/c2.jpg"
                                                        alt="First slide"
                                                    />
                                                    <div class="header-text">
                                                        <div class="col-md-12 text-left">
                                                            <span class="comm_span_c">
                                                                Participate in our
                                                            </span>

                                                            <h3>
                                                                <span>WEEKLY ONLINE CONTESTS</span>
                                                            </h3>

                                                            <span class="comm_span_c">
                                                                Winners get cash prizes and certificates which
                                                                can{" "}
                                                                <span class="style_f2">
                                                                    " BOOST YOUR RESUME "
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="item">
                                                    <img
                                                        class="hidden-xs"
                                                        src="img/carousel3.png"
                                                        alt="Third slide"
                                                    />
                                                    <img
                                                        class="hidden-md hidden-lg hidden-sm"
                                                        src="img/c3.jpg"
                                                        alt="First slide"
                                                    />
                                                    <div class="header-text">
                                                        <div class="col-md-12 text-left">
                                                            <span class="comm_span_c">Take ourr</span>

                                                            <h3>
                                                                <span>
                                                                    ONLINE EMPLOYABILITY SKILLS ASSESSMENT TESTS
                                                                </span>
                                                            </h3>

                                                            <span class="comm_span_c">
                                                                Candidates with proven, in-demand{" "}
                                                                <span class="style_f2">
                                                                    Employability Skills
                                                                </span>{" "}
                                                                are highly sought after by Recruiters
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <a
                                                class="left carousel-control"
                                                href="#carousel-example-generic"
                                                role="button"
                                                data-slide="prev"
                                            >
                                                <span class="icon-prev" aria-hidden="true"></span>
                                            </a>
                                            <a
                                                class="right carousel-control"
                                                href="#carousel-example-generic"
                                                role="button"
                                                data-slide="next"
                                            >
                                                <span class="icon-next" aria-hidden="true"></span>
                                            </a>
                                        </div>

                                        <div class="clearfix"></div>
                                        <div class="right-body-main-container">
                                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 xs_padding">
                                                <div class="clearfix"></div>
                                                <div class="showing"> Show: <b>all jobs</b></div>
                                                <div class="jobs">
                                                    <a target="_blank" class="job_title">Computer Science Job - <span>new</span></a>
                                                    <p class="companyname"> Arogya Yoga Mandiram - <span class="where">Bangalore, Karnataka</span></p>
                                                    <p> <i class="fa fa-rupee"></i> 15,000 &ndash; <i class="fa fa-rupee"></i> 20,000 a month </p>
                                                    <p class="summary">Experienced/Fresher both can apply for this Job. To train batches for Yoga Studio....</p>
                                                </div>
                                                <div class="jobs">
                                                    <a target="_blank" class="job_title">Marketing Job- <span>new</span></a>
                                                    <p class="companyname"> Arogya Yoga Mandiram - <span class="where">Bangalore, Karnataka</span></p>
                                                    <p> <i class="fa fa-rupee"></i> 15,000 &ndash; <i class="fa fa-rupee"></i> 20,000 a month </p>
                                                    <p class="summary">Experienced/Fresher both can apply for this Job. To train batches for Yoga Studio....</p>
                                                </div>
                                                <div class="jobs">
                                                    <a target="_blank" class="job_title">Business Development Job - <span>new</span></a>
                                                    <p class="companyname"> Arogya Yoga Mandiram - <span class="where">Bangalore, Karnataka</span></p>
                                                    <p> <i class="fa fa-rupee"></i> 15,000 &ndash; <i class="fa fa-rupee"></i> 20,000 a month </p>
                                                    <p class="summary">Experienced/Fresher both can apply for this Job. To train batches for Yoga Studio....</p>
                                                </div>
                                                <div class="jobs">
                                                    <a target="_blank" class="job_title">Software Engineer Testing Job - <span>new</span></a>
                                                    <p class="companyname"> Arogya Yoga Mandiram - <span class="where">Bangalore, Karnataka</span></p>
                                                    <p> <i class="fa fa-rupee"></i> 15,000 &ndash; <i class="fa fa-rupee"></i> 20,000 a month </p>
                                                    <p class="summary">Experienced/Fresher both can apply for this Job. To train batches for Yoga Studio....</p>
                                                </div>
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
};

export default Jobseekerheader;
