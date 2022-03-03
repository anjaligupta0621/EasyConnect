import { React } from "react";
import '../css/styles.css';
import Header from "./header.component";
import './postJobDashBoard.component.css';
import { Link } from "react-router-dom";
import addJobButton from '../img/add-job-btn.png';

const PostJobDashBoard = (props) => {

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
							<td className="no-display">23 Nov '17</td>
							<td className="full-width">Business Development, Sales ( <a href="#">View</a> )</td>
							<td >
								<div className="toggle_bt">
									<div className="onoffswitch">
										{/* <input type="checkbox" checked="" class="onoffswitch-checkbox" id="onoffswitch1"> */}
										<label for="onoffswitch1" class="onoffswitch-label"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
        
                                    </div>
								</div>
							</td>
                            <td></td>
                            <td>7 Dec  '17 </td>

							
						</tr>
						
						<tr className="closed">
							<td className="no-display">23 Nov  '17</td>
							<td className="full-width">Business Development, Sales ( <a href="#">View</a> )</td>
							<td>
								<div className="toggle_bt">
									<div className="onoffswitch">
										<label for="onoffswitch4" class="onoffswitch-label"><span class="onoffswitch-inner"></span><span class="onoffswitch-switch"></span></label>
									</div>
								</div>
							</td>
							<td></td>
							<td>7 Dec  '17 </td>
						</tr>
						
					</tbody>
				</table>
				
			</div>
		</div>
        </div>
    )
}

export default PostJobDashBoard;