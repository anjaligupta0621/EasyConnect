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
        <div id="all-applicants" class="tab-pane fade in active">
                      <div id="verified" class="margin-top-60">
                        <h3>Shortlist Candidates</h3>
                        <p>
                          ( candidates has been
                          shortlisted  according to their Skills)
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

                  
                 
    );
  }
}
export default ShortlistCandidate;
