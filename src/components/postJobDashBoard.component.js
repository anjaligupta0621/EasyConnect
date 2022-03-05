import React, { useState } from "react";
import '../css/styles.css';
import Header from "./header.component";
import './postJobDashBoard.component.css';
import { Link } from "react-router-dom";
import addJobButton from '../img/add-job-btn.png';

class PostJobDashBoard extends React.Component{

	state = {
		jobs: [],
		mockJobsResponse: [{
			"JobID": 1,
			"Role_Name": "SDE",
			"Role_Type": "Software Development",
			"Type": "Regular (In-office/On-field)",
			"Location": "Florida",
			"Start_Date": "Immediately",
			"Posted_Date": "3-2-2022",
			"Responsibilities": "sde",
			"Salary_Start": "11",
			"Salary_End": "12",
			"Active": "false",
			"RecruiterID": 1
		  },{
			"JobID": 2,
			"Role_Name": "SDE",
			"Role_Type": "Software Development",
			"Type": "Regular (In-office/On-field)",
			"Location": "Florida",
			"Start_Date": "Immediately",
			"Posted_Date": "3-2-2022",
			"Responsibilities": "sde",
			"Salary_Start": "20",
			"Salary_End": "30",
			"Active": "false",
			"RecruiterID": 1
		  }],
		status: 'Closed',
		applicants: 0
	}


	componentDidMount() {
		
		let id = {
			'Recruiter_ID' : 1
		}

		var raw = JSON.stringify({
			"Recruiter_ID": 1
		});

		
		fetch(`http://localhost:8081/getJobById`, { body: raw, method: "POST", mode:"cors"})
        .then(response => response.text())
		.then(result => {
			// console.log(result)
			this.setState({jobs: result})
			console.log(this.state.jobs)
		})
		.catch(error => console.log('error', error));
	}

	
render() {
    return (
        
        <div >
            <Header />

            <div className="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<div className="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
				<h1>Dashboard <Link to="/postJob"><img src={addJobButton} alt=""/> Post Job</Link></h1>
				<table className="responsive-table">
					<thead>
					  <tr>
						<th className="hdr-postdt">Posting Date</th>
						<th>Role</th>
						<th>Status</th>
						<th><span className="hidden-xs">No. of</span> Applicants</th>
						<th>Deadline</th>
					  </tr>
					</thead>
					<tbody>
						<tr>
							<th className="hdr-postdt">Posting Date</th>
							<th>Role</th>
							<th>Status</th>
							<th><span className="hidden-xs">No. of</span> Applicants</th>
							<th>Deadline</th>
						</tr>
						</tbody>
						<tbody>
							{this.state.mockJobsResponse.map((item) => (
								<tr key={item.JobID}>
								<td className="no-display">{item.Posted_Date}</td>
								<td className="full-width">{item["Role_Name"]}<a href="#">  (View)</a></td>
								<td >
									<div className="toggle_bt">
										<div className="onoffswitch">
											{/* <input type="checkbox" checked="" className="onoffswitch-checkbox" id="onoffswitch1"> */}
											<label htmlFor="onoffswitch1" className="onoffswitch-label"><span className="onoffswitch-inner"></span><span className="onoffswitch-switch"></span></label>
			
										</div>
									</div>
								</td>
								<td>{this.state.applicants}</td>
								<td>{item.Posted_Date}</td>
							</tr>
							))}
							
						</tbody>
					</table>
					
				</div>
			</div>
			</div>
		)
	}
}

export default PostJobDashBoard;