import React from "react";
import { Link } from "react-router-dom";
import Header from "./header.component";
import axios from "axios";
import "./shortlistCandidate.component.css";
import grammerImage from "../img/grammer.png";
import shortlist from "../img/shortlist-candidate.svg";
import downExcel from "../img/excel-download.svg";
import mathsImage from "../img/maths.png";
import verbalImage from "../img/non-verbal-reasoning.png";
import speakingImage from "../img/speaking.png";
import noCandidateImage from "../img/candidate-no-img.svg";

class ShortlistCandidate extends React.Component {
  state = {
    shortlistCandidates: [],
    recruiterID: localStorage.getItem("recruiterId"),
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
        this.setState({ shortlistCandidates: result });
        console.log(this.state.shortlistCandidates);
      })
      .catch((error) => console.log("error", error));
  }

  render() {
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
                    all {this.state.shortlistCandidates.length} applicants
                  </span>{" "}
                  for the role
                </div>
                <div class="container-fluid">
                  <ul class="nav nav-pills">
                    <li class="active">
                      <a data-toggle="pill" href="#all-applicants">
                        All Applicants{" "}
                        <span>({this.state.shortlistCandidates.length})</span>
                      </a>
                    </li>
                    <li>
                      <a data-toggle="pill" href="#shortlist">
                        Shortlisted (0)
                      </a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div id="all-applicants" class="tab-pane fade in active">
                      <div id="Sort-By">
                        <h3>Sort by:</h3>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 sortby">
                          <a href="#" name="category">
                            View All
                          </a>
                          <a href="#" name="category">
                            <img src={grammerImage} /> Software Development
                          </a>
                          <a href="#" name="category">
                            <img src={mathsImage} /> Aptitude
                          </a>
                          <a href="#" name="category">
                            <img src={verbalImage} /> Reasoning
                          </a>
                          <a href="#" name="category">
                            <img src={speakingImage} /> Business Development
                          </a>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                      <div id="download-buttons">
                        <button>
                          <img src={downExcel} />
                          Download as Excel File
                        </button>
                        <button>
                          <img src={shortlist} />
                          Shortlist Candidates
                        </button>
                        <button class="inactive">
                          <img src={downExcel} /> Download as Excel File
                        </button>
                        <button class="inactive">
                          <img src={shortlist} /> Shortlist Candidates
                        </button>
                      </div>
                      <div class="clearfix"></div>
                      <div id="verified" class="margin-top-60">
                        <h3>Candidates with verified Employability Skills</h3>
                        <p>
                          (The Employability Skills of these candidates has been
                          verified using background check)
                        </p>
                        {this.state.shortlistCandidates.map(
                          (candidate, index) => (
                            <div class="block-candidates-display" key={index}>
                              <div class="col-lg-5">
                                <input
                                  name=""
                                  type="checkbox"
                                  value=""
                                  class="check"
                                />
                                <img
                                  src={noCandidateImage}
                                  class="img-candidate"
                                />
                                <h5> {candidate.Name}</h5>
                                <p>
                                  <i class="fa fa-envelope-o"></i>{" "}
                                  {candidate.Email}
                                </p>
                                <p>
                                  <i class="fa fa-phone"></i>{" "}
                                  {candidate.Contact}
                                </p>
                                <p>
                                  <a href="#">
                                    <i class="fa fa-user"></i> View Full Profile
                                  </a>
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <a href="#">
                                    <i class="fa fa-download"></i>
                                  </a>{" "}
                                </p>
                              </div>

                              <div class="col-lg-7 score">
                                <div class="col-lg-4 score-legend">
                                  <span class="dot-excellent"></span>{" "}
                                  <p>Employability Skills</p>
                                </div>
                                <div class="col-lg-4 score-legend">
                                  <span class=" dot-average"></span>{" "}
                                  <p>Aptitude</p>
                                </div>
                                <div class="col-lg-4 score-legend">
                                  <span class="dot-excellent"></span>{" "}
                                  <p>Reasoning</p>
                                </div>
                                <div class="col-lg-4 score-legend">
                                  <span class="dot-excellent"></span>{" "}
                                  <p>Written English</p>
                                </div>
                                <div class="col-lg-4 score-legend">
                                  <span class="dot-excellent"></span>{" "}
                                  <p>Spoken English</p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div class="clearfix"></div>
                    </div>
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
export default ShortlistCandidate;
