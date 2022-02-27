import { React, useState } from "react";
import {Grid,Button, Divider, Container, TextField } from "@material-ui/core";
import '../css/login-modal-wizard.css';
import '../css/main.css';
import '../css/styles.css';
import '../css/menu.css';
import '../css/select-drop.css';

const JobDetails = ({ prevStep, handleChange, values }) => {

    const [showLocation, setShowLocation] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        const { organization, orgWebsite, orgDescription, roleName, roleType, jobType, 
            location, startDate, responsibilities, salaryFrom, salaryTo } = values;
        console.log({organization, orgWebsite, orgDescription, roleName, roleType, jobType,
            location, startDate, responsibilities, salaryFrom, salaryTo});
    }
    
    const Previous = e => {
        e.preventDefault();
        prevStep();
    }

    const onRegular = e => {
        setShowLocation(true);
    }

    const onWFH = e => {
        setShowLocation(false);
    }

    return (
        <div className="body-outer">
            <div className="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{'overflow':'scroll'}}>
			    <div className="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12" > 
				    <h1>Post New Job</h1>
				    <div id="postjob">
                        <div className="container-fluid"  >
                            <ul className="nav nav-pills">
                                <li><a data-toggle="pill" onClick={Previous}>Organization Details</a></li>
                                <li className="active"><a data-toggle="pill" href="#description">Job Description</a></li>
                            </ul>
                            <div className="tab-content">

                                <form>
                                    
                                <div id="description" className="tab-pane fade in active">
                                    <div id="rolename">
                                        <h3>Role Name</h3>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <input 
                                            name="role name" 
                                            onChange={handleChange('roleName')}
                                            type="text" 
                                            placeholder="Junior Business Development Manager" />
                                        </div>
                                    </div>
                
                                    <div className="clearfix"></div>
                                    <div id="roleType" className="border-top">
                                        <h3>Role Type</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" type="radio" value="Software Development" 
                                                checked = {values.roleType === "Software Development"} />
                                            <label style={{'marginLeft':'5px'}}>Software Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Web Development"
                                                checked = {values.roleType === "Web Development"} />
                                            <label style={{'marginLeft':'5px'}}>Web Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Graphic Design"
                                                checked = {values.roleType === "Graphic Design"} />
                                            <label style={{'marginLeft':'5px'}}>Graphic Design</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Technical Content Writing"
                                                checked = {values.roleType === "Technical Content Writing"} />
                                            <label style={{'marginLeft':'5px'}}>Technical Content Writing</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Social Media Marketing"
                                                checked = {values.roleType === "Social Media Marketing"} />
                                            <label style={{'marginLeft':'5px'}}>Social Media Marketing</label>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Operations"
                                                checked = {values.roleType === "Operations"} />
                                            <label style={{'marginLeft':'5px'}}>Operations</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Mobile App Development"
                                                checked = {values.roleType === "Mobile App Development"} />
                                            <label style={{'marginLeft':'5px'}}>Mobile App Development</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Digital Marketing"
                                                checked = {values.roleType === "Digital Marketing"} />
                                            <label style={{'marginLeft':'5px'}}>Digital Marketing</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                id="question1" 
                                                onChange={handleChange('roleType')} 
                                                name="question" 
                                                type="radio" 
                                                value="Human Resources (HR)"
                                                checked = {values.roleType === "Human Resources (HR)"} />
                                            <label style={{'marginLeft':'5px'}}>Human Resources (HR)</label>
                                        </div>
    
                                    </div>
                                    <div className="clearfix"></div>
                                    <div id="jobType" className="border-top">
                                        <h3>Type of Job</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  
                                                name="jobtype" 
                                                onChange={handleChange('jobType')} 
                                                onClick={onRegular}
                                                type="radio" 
                                                value="Regular (In-office/On-field)" 
                                                checked = {values.jobType === "Regular (In-office/On-field)"} />
                                            <label style={{'marginLeft':'5px'}}>Regular (In-office/On-field)</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  
                                                name="jobtype" 
                                                onChange={handleChange('jobType')} 
                                                type="radio" 
                                                value="Work from home"
                                                checked = {values.jobType === "Work from home"} 
                                                onClick={onWFH} />
                                            <label style={{'marginLeft':'5px'}}>Work from home</label>
                                        </div>
                                        {showLocation && 
                                            (<div id="div1" className="show-regularjob">
                                                <h4>Internship Location(s)*</h4>
                                                <input 
                                                    name="locality" 
                                                    type="text" 
                                                    placeholder="Start typing locality"
                                                    onChange={handleChange('location')} />
                                                <div className="clearfix"></div>
                                                 <input 
                                                    name="checkbox" 
                                                    type= "checkbox" 
                                                    value="" /> <p>Allow applications only from the above or neighboring cities</p>
                                                
                                                 <div className="clearfix"></div>
                                                <div className="col-lg-3">					
                                                    <h5>Is Part Time Allowed?*</h5>
                                                </div>
                                                <div className=" col-lg-9 toggle_bt2">
                                                    <div className="onoffswitch2">
                                                        <input type="checkbox" defaultChecked className="onoffswitch-checkbox2" id="onoffswitch2" />
                                                        <label htmlFor="onoffswitch2" className="onoffswitch-label2"><span className="onoffswitch-inner2"></span><span className="onoffswitch-switch2"></span></label>
                                                    </div>
                                                </div> 
                                            </div>)}
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div id="startDate" className="border-top">
                                        <h3>Internship Start Date*</h3>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input 
                                                onChange={handleChange('startDate')}  
                                                name="date"  
                                                type="radio" 
                                                value="Immediately" 
                                                checked={values.startDate === 'Immediately'} />
                                            <label style={{'marginLeft':'5px'}}>Immediately (within next 30 days)</label>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
                                            <input  
                                                name="date" 
                                                onChange={handleChange('startDate')} 
                                                type="radio" 
                                                value="Later"
                                                checked={values.startDate === 'Later'} />
                                            <label style={{'marginLeft':'5px'}}>Later</label>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div id="responsibilities" className="border-top">
                                        <h3>Responsibilities</h3>
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <h5>Write a detailed yet crisp description of intern's responsibilities (<span>example 1</span>) and convey the excitement of the role (<span>example 2</span>)*</h5>
                                        <textarea name="" cols="" rows="" onChange={handleChange('responsibilities')}  placeholder="Select intern's day-to-day responsibilities"></textarea>
                                        <p>Max characters 1000</p>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    
                                    <div >
                                        <h3>Salary Range <span>( $ )</span></h3>
                                        {/* <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" style="padding:0px;"> */}
                                        <h5>From</h5>
                                        <input type="text" onChange={handleChange('salaryFrom')} className="textbox280" />
                                        {/* </div> */}
                                        
                                        {/* <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6" style="padding:0px;"> */}
                                        <h5>To</h5>				
                                        <input type="text" onChange={handleChange('salaryTo')} className="textbox280" />
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
                                            onClick={onSubmit}
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
        </div>
    )
}

export default JobDetails;