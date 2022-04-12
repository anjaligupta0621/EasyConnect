import React from 'react';
import '../css/styles.css';
import './organizationDetails.component.css';

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
				    <div id="postjob">
            <div className="container-fluid" style={{padding:"0px"}}>
            <ul className="nav nav-pills">
                <li className="active"><a data-toggle="pill" >Organization Details</a></li>
                <li><a data-toggle="pill" onClick={Continue} >Job Description</a></li>
		    </ul>
                <div className="tab-content">

                <form>
                    
                    <div id="organization" className="tab-pane">
                        <div id="organization-details">
                            <h3>Name of the Organization</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <input 
                                    name="organization_name" 
                                    onChange={handleChange('organization')}
                                    type="text" 
                                    disabvalue="University of Florida" />
                            </div>
                        </div>

                    <div className="clearfix"></div>

                        <div id="website-name" className="margin-top-60">
                            <h3>Name of the Website</h3>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <input 
                                name="organization_website" 
                                type="text" 
                                onChange={handleChange('orgWebsite')}
                                 />
                            </div>
                        </div>

                    <div className="clearfix"></div>

                    <div id="organization-description" className="margin-top-60">
                        <h3>Description of the Organization</h3>
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <textarea onChange={handleChange('orgDescription')} name="orgDescription" cols="" rows=""  placeholder="Write a short description about your organization"></textarea>
                            <p>Max characters 1000</p>
                        </div>
                    </div>

                    <div className="clearfix"></div>
                                    
                    <button 
                        className="submit-button"
                        onClick={ Continue } >Next
                    </button>
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

export default OrganizationDetails;