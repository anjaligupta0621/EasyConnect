import { React } from "react";
import {Button, Divider, Container, TextField } from "@material-ui/core";
import '../css/login-modal-wizard.css';
import '../css/main.css';
import '../css/styles.css';
import '../css/menu.css';
import '../css/select-drop.css';

const OrganizationDetails = ({ nextStep, handleChange, values }) => {
    const Continue = e => {
        e.preventDefault();
        nextStep();
      }

    return (
        <div className="body-outer">
            <div className="main-wrapper col-lg-12 col-md-12 col-sm-12 col-xs-12">
			    <div className="body-area col-lg-12 col-md-12 col-sm-12 col-xs-12"> 
				    <h1>Post New Job</h1>
				    <div id="postjob"></div>
            <div className="container-fluid" >
            <ul className="nav nav-pills">
                <li className="active"><a data-toggle="pill" >Organization Details</a></li>
                <li><a data-toggle="pill" onClick={Continue}>Job Description</a></li>
		    </ul>
                <div className="tab-content">

                <form>
                    
                    <div id="organization" className="tab-pane">
                        <div id="organization-details">
                            <h3>Name of the Organization</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <input 
                                    name="organization name" 
                                    onChange={handleChange('organization')}
                                    type="text" 
                                    disabvalue="University of Florida" />
                            </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                        <div id="website-name" className="margin-top-60">
                            <h3>Name of the Website</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input 
                                name="organization website" 
                                type="text" 
                                onChange={handleChange('orgWebsite')}
                                 />
                            </div>
                        </div>
                    <div className="clearfix"></div>

                    <div id="organization-description" className="margin-top-60">
                        <h3>Description of the Organization</h3>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <textarea onChange={handleChange('orgDescription')} name="" cols="" rows=""  placeholder="Write a short description about your organization"></textarea>
                            <p>Max characters 1000</p>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                                    
                    <button 
                        className="submit-button"
                        onClick={ Continue } >Next</button>
                   
                </form>
                </div>
                </div>
                </div>
                </div>
        </div>
    )
}

export default OrganizationDetails;