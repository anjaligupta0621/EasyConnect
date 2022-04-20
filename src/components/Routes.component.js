import React from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PostJobDashBoard from "./postJobDashBoard.component";
import Jobseekerheader from "./jobseeker.component";
import Home from "./home.component";
import PostJob from "./postJob.component";
import ApplicantDashboard from "./applicantsDashboard.component";
import CandidateProfile from './candidateProfile.component';
import Resume from './Resume';
import ViewCandidate from './viewCandidate.component';

function RouterContainer(props) {
    return (
        <Router>   
            <Routes>
                <Route path="/jobDashBoard" element={<PostJobDashBoard  />} />
                <Route path="/postJob" element={<PostJob />} />
                <Route path="/user" element={<Jobseekerheader />} />
                <Route path="/shortListCandidate" element={<ApplicantDashboard />} />
                <Route path="/candidateProfile" element={<Resume />} /> 
                <Route path="/viewCandidate" element={<ViewCandidate />} />               
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
    );
}

export default RouterContainer;

