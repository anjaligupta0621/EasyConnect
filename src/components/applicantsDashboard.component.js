import React from 'react'
import { Link } from 'react-router-dom';
import Header from "./header.component";
import ShortlistCandidate from './shortlistCandidate.component';
import AllApplicants from './allApplicants.component';

import axios from 'axios';
import grammerImage from "../img/grammer.png";
import shortlist from "../img/shortlist-candidate.svg";
import downExcel from "../img/excel-download.svg";
import mathsImage from "../img/maths.png";
import verbalImage from "../img/non-verbal-reasoning.png";
import speakingImage from "../img/speaking.png";
import noCandidateImage from "../img/candidate-no-img.svg";

class ApplicantDashboard extends React.Component {    
    state = {
        step:1,
        allCandidates: [],
        recruiterID: localStorage.getItem("recruiterId"),
        showShortList:false
      };
    
      componentDidMount() {
        var raw = JSON.stringify({
          Recruiter_ID: parseInt(localStorage.getItem("recruiterId")),
        });
        //debugger;
    
        fetch(`http://localhost:8081/getCandidatesByRecruiterId`, {
          body: raw,
          method: "POST",
          mode: "cors",
        })
          .then((response) => response.json())
          .then((result) => {
            //debugger;
            this.setState({ allCandidates: result });
            console.log(this.state.allCandidates);
          })
          .catch((error) => console.log("error", error));
      }

    showApplicant = () => {
        
    }

    prevStep = () => {
        console.log('Previous step');
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    nextStep = () => {
        console.log("Next step");
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render(){

        const { step } = this.state;

        const applicantsRender = () =>
        {
        switch (step) {

            case 1: 
              return <AllApplicants
                        nextStep = {this.nextStep}
                     />;                
            case 2: 
                return  <ShortlistCandidate 
                        prevStep = {this.prevStep}
                         />;
            default: 
               return <div></div>
          }
        }
        return (
            <div className="shortList-Component">
              <Header />
      
              <div class="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div class="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <h1>Shortlist Candidates</h1>
                  <ol class="breadcrumb breadcrumb-arrow">
                    <li>
                      <a href="#">All Job Descriptions</a>
                    </li>
                  </ol>
      
                  <div id="Job-Filters" class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
                    <div class="lhs-filters">
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-excellent"></span>{" "}
                        <p>
                          Excellent{" "}
                          <span class="hidden-xs hidden-sm">(97.5 – 100 %)</span>
                        </p>
                      </div>
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-verygood"></span>{" "}
                        <p>
                          Very Good{" "}
                          <span class="hidden-xs hidden-sm"> (87.5 – 97.5 %)</span>
                        </p>
                      </div>
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-good"></span>{" "}
                        <p>
                          Good <span class="hidden-xs hidden-sm">(75 – 87.5 %)</span>
                        </p>
                      </div>
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-above-average"></span>{" "}
                        <p>
                          Above Average{" "}
                          <span class="hidden-xs hidden-sm">(75 – 87.5 %)</span>
                        </p>
                      </div>
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-average"></span>{" "}
                        <p>
                          Average{" "}
                          <span class="hidden-xs hidden-sm">(50 – 62.5 %)</span>
                        </p>
                      </div>
                      <div class=" col-lg-12 col-md-12 col-sm-12 col-xs-6 legend">
                        <span class="dot-below-average"></span>{" "}
                        <p>
                          Below Average{" "}
                          <span class="hidden-xs hidden-sm">(below 50th %)</span>
                        </p>
                      </div>
                    </div>
                  </div>
      
                  <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12">
                    <div id="postjob">
                      <div class="appl-info">
                        You are viewing{" "}
                        <span>
                          all applicants
                        </span>{" "}
                        for the role
                      </div>
                      <div class="container-fluid">
                        <ul class="nav nav-pills">
                          <li class="active">
                            <a data-toggle="pill" href="#all-applicants">
                              All Applicants{" "}
                              <span>({this.state.allCandidates.length})</span>
                            </a>
                          </li>
                          <li>
                            <a data-toggle="pill" onClick={this.showApplicant()}>
                              Shortlisted (0)
                            </a>
                          </li>
                        </ul>
                        <div class="tab-content">
                          {applicantsRender()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
}

export default ApplicantDashboard;