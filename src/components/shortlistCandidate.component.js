import React from 'react'
import { Link } from 'react-router-dom';
import Header from "./header.component";
import axios from 'axios';
import "./shortlistCandidate.component.css";
import addJobButton from '../img/add-job-btn.svg';

class ShortlistCandidate extends React.Component { 
    render(){
        return(
            <div className="shortList-Component">
            <Header />
            <div className="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div className="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
				<h1>Candidates</h1>
				<table className="responsive-table">
					<thead>
					  <tr>
						<th className="hdr-postdt">Posting Date</th>
						<th>Role</th>
						<th>Candidate Name</th>
						<th>Deadline</th>
					  </tr>
					</thead>
					<tbody>
						</tbody>
						<tbody>
							{/* {this.state.jobs.map((item) => (
								<tr key={item.JobID}>
								<td className="no-display">{item.Posted_Date}</td>
								<td className="full-width">{item["Role_Name"]}<a href="#">  (View)</a></td>
								<td >
									<span>Open</span>
								</td>
								<td>{item.CandidateCount}</td>
								<td>{item.Posted_Date}</td>
							</tr>
							))} */}

                            <tr>
								<td className="no-display">03/03/2022</td>
								<td className="full-width">Software Developer</td>
								<td >
									<span>Anjali</span>
								</td>
								{/* <td></td> */}
								<td>04/03/2022</td>
							</tr>
							
						</tbody>
					</table>
					
				</div>
			</div>
            </div>
        )

    };
}
export default ShortlistCandidate;