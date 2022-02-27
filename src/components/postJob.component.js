import React from 'react'
import { Link } from 'react-router-dom';
import '../css/login-modal-wizard.css';
import '../css/main.css';
import '../css/styles.css';
import '../css/menu.css';
import '../css/select-drop.css';
import Header from "./header.component";
import OrganizationDetails from './organizationDetails.component';
import JobDetails from './jobDetails.component';
import axios from 'axios';


class PostJob extends React.Component {

    state = {
        step: 1,
        organization: '',
        orgWebsite: '',
        orgDescription: '',
        roleName: '',
        roleType: '',
        jobType: '',
        location: '',
        isPartAllowed: false,
        startDate: '',
        responsibilities: '',
        salaryRange: ''
    }

    prevStep = () => {
        console.log('Previous step');
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    nextStep = () => {
        console.log("Next step");
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    }

    render(){

        const { step } = this.state;
        const { organization, orgWebsite, orgDescription, roleName, roleType, jobType, location, startDate, responsibilities, salaryRange } = this.state;
        const values = { organization, orgWebsite, orgDescription, roleName, roleType, jobType, location, startDate, responsibilities, salaryRange  }

        switch (step) {
            case 1: 
              return (
                <div className='body-outer'>
                    <Header />
                    <OrganizationDetails 
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = { values } />
                </div>
                
              )
            case 2: 
              return (
                <div className='body-outer'>
                    <Header />
                    <JobDetails 
                        prevStep = {this.prevStep}
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = { values } />
                </div>              
                )
            case 3: 
              return (
                <div className='body-outer'>
                    <Header />
                    {/* <Confirmation 
                        prevStep = {this.prevStep}
                        nextStep = {this.nextStep}
                        values = {values} /> */}
                </div>
              )
            case 4:
              return (
                <div className='body-outer'>
                    <Header />
                    {/* <Success /> */}
                </div>
              )
            default: 
               // do nothing
          }

    };
}

export default PostJob;