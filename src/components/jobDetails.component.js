import { React } from "react";
import {Grid,Button, Divider, Container, TextField } from "@material-ui/core";
import '../css/login-modal-wizard.css';
import '../css/main.css';
import '../css/styles.css';
import '../css/menu.css';
import '../css/select-drop.css';

const JobDetails = ({ prevStep, nextStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
    }
    
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    return (
        <div className="body-outer">
            <div className="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{'overflow':'scroll'}}>
			    <div className="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12" > 
				    <h1>Post New Job</h1>
				    <div id="postjob"></div>
            <div className="container-fluid"  >
            <ul className="nav nav-pills">
                <li><a data-toggle="pill" onClick={Previous}>Organization Details</a></li>
                <li class="active"><a data-toggle="pill" href="#description">Job Description</a></li>
		    </ul>
                <div className="tab-content">

                <form>
                    
                <div id="description" className="tab-pane fade in active">
                                    <div id="rolename">
                                        <h3>Role Name</h3>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input name="organization name" type="text" value="Junior Business Development Manager" />
                                        </div>
                                    </div>
                
                                    <div className="clearfix"></div>
                                    <div id="roleType" className="border-top">
                                        <h3>Role Type</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Software Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Web Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Graphic Design</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Technical Content Writing</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Social Media Marketing</label>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Operations</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Mobile App Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Digital Marketing</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input id="question1" name="question" type="radio" value="sel" />
                                            <label>Human Resources (HR)</label>
                                        </div>
    
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="jobType" className="border-top">
                                        <h3>Type of Job</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  name="question" type="radio" onclick="show1();" value="sel" checked />
                                            <label>Regular (In-office/On-field)</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  name="question" type="radio" value="sel" onclick="show2();"/>
                                            <label>Work from home</label>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div id="startDate" className="border-top">
                                        <h3>Internship Start Date*</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  name="date" type="radio" value="sel" checked />
                                            <label>Immediately (within next 30 days)</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  name="date" type="radio" value="sel" />
                                            <label>Later</label>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div id="responsibilities" className="border-top">
                                        <h3>Responsibilities</h3>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Write a detailed yet crisp description of intern's responsibilities (<span>example 1</span>) and convey the excitement of the role (<span>example 2</span>)*</h5>
                                        <textarea name="" cols="" rows=""  placeholder="Select intern's day-to-day responsibilities"></textarea>
                                        <p>Max characters 1000</p>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div >
                                        <h3>Salary Range <span>( INR )</span></h3>
                                        {/* <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" style="padding:0px;"> */}
                                        <h5>From</h5>
                                        <input type="text" className="textbox280" />
                                        {/* </div> */}
                                        
                                        {/* <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" style="padding:0px;"> */}
                                        <h5>To</h5>				
                                        <input type="text" className="textbox280" />
                                        {/* </div> */}
                                    </div>

                                    <div className="clearfix"></div>
                                    
                                    <div className="border-top">
                                        <button 
                                            className="post-button"
                                            style={{'marginTop':'10px','position':'relative'}}
                                            onClick={Previous}>PREVIOUS</button>
                                    </div> 
                                    <div className="clearfix"></div>
                                    
                                    <div className="border-top">
                                        <button 
                                            onclick={Continue}
                                            style={{'float':'right', 'position':'relative'}} 
                                            className="post-button">POST JOB DESCRIPTION</button>
                                    </div> 
                                    
                </div>
                </form>
                </div>
                </div>
                </div>
                </div>
        </div>
    )
}

export default JobDetails;