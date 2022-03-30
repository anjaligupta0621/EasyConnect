import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PostJobDashBoard from "./postJobDashBoard.component";
import Jobseekerheader from "./jobseeker.component";
import Home from "./home.component";
import PostJob from "./postJob.component";
import ShortListCandidate from "./shortlistCandidate.component";

function RouterContainer(props) {
    return (
        <Router>   
            <Routes>
                <Route path="/jobDashBoard" element={<PostJobDashBoard  />} />
                <Route path="/postJob" element={<PostJob />} />
                <Route path="/user" element={<Jobseekerheader />} />
                <Route path="/shortListCandidate" element={<ShortListCandidate />} />
                <Route path="/" element={<Home/>} />
            </Routes>
        </Router>
    );
}

export default RouterContainer;

