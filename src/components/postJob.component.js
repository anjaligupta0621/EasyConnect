import React from 'react'
import { Link } from 'react-router-dom';
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
        isPartAllowed: true,
        startDate: '',
        responsibilities: '',
        salaryFrom: '',
        salaryTo: ''
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
        const { organization, orgWebsite, orgDescription, roleName, roleType, jobType, location, isPartAllowed, startDate, responsibilities, salaryFrom, salaryTo } = this.state;
        const values = { organization, orgWebsite, orgDescription, roleName, roleType, jobType, location, isPartAllowed, startDate, responsibilities, salaryFrom, salaryTo  }

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
                        handleChange = {this.handleChange}
                        values = { values } />
                </div>              
                )
            default: 
               // do nothing
          }

    };
}

export default PostJob;