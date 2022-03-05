# Complete video demo of the project progress:
https://drive.google.com/file/d/1_EVGk6AFDZtBuQJx9vvPnt3Dmdr0FPX8/view

# Backend Documentation

## Database Schema
* A database named "RecruiterDetails" was created using SqlLite.
* A schema named "Recruiters" was created in this database.
```yaml
type Recruiters struct {
        ID           uint   
        Name         string
        Email        string 
        Password     string 
        Organization string
        Website      string
        Contact      string 
        Jobs         []Job  
}
```
* Second Schema named "Jobs" was created in the database.
```yaml
type Jobs struct {
        JobID            uint   
        Role_Name        string 
        Role_Type        string 
        Type             string
         Location         string
        Start_Date       string
        Posted_Date      string
        Responsibilities string 
        Salary_Start     string
        Salary_End       string
        Active           string 
        RecruiterID      uint
}
```

## Api Documentation
### Api Authentication
In order to successfully authenticate the request you must provide the token to validate the API.We are using http request for operations.

### Api End Points
Queries begin with the same root Url for all the request. Currently using the http client for the request.
The exposed endpoints are -
* /check
* /login
* /signup
* /getJobById
* /postJob

#### /check
Send a request to check whether the server is running or not.

#### **POST /Login**
* Send a request to authenticate the User. If the user present in the Database then it login successful.
* Requested URL is http://localhost:8081/login 
* Example here with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/login
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Json Parameter
{
    "Email" : "123456@ufl.edu",
    "Password" : "12345678"
}
```
* Returns the recruiter Details In response.
```yaml
{
    "Email" : "123456@ufl.edu",
    "Password" : "12345678"
}
```

#### POST /SignUp
* Send a request to Add the User. If the user present in the Database then returns otherwise add the User in Database.
* Requested URL is http://localhost:8081/signup 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/signUp
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Sign Up Json sample Parameter Demo:
{
   "Name": "Richa Gupta",
   "Email" : "12344@ufl.edu",
   "Password" : "12345678",
   "Organization" : "UF",
   "Website" : "",
   "Contact" : ""
 }
```
* Returns the recruiter Details In response.
```yaml
{
"Response": "User Added Successfully"
}
```

#### POST /getJobById
* Send a request to get the list of jobs posted by a recruiter.
* Requested URL is http://localhost:8081/getJobById 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getJobById
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
getAllJobs Json sample Parameter Demo:
getJobs:
{
    "Recruiter_ID" : 1
}
```
* Returns all Jobs of a particular User.
* Return List of Jobs as shown below:
```yaml
{
   "JobID":2,
   "Role_Name":"Senior Engineer",
   "Role_Type":"SDE",
   "Type":"On-site",
   "Location":"USA",
   "Start_Date":"0001-01-01T00:00:00Z",
   "Posted_Date":"0001-01-01T00:00:00Z",
   "Responsibilities":"Testing job number 2",
   "Salary_Start":"120000",
   "Salary_End":"180000",
   "Active":"True",
   "RecruiterID":1
}
```
#### POST /postJob
* Send a request to add the Job Posted by recruiter.
* Requested URL is http://localhost:8081/postJob 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/postJob
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
getAllJobs Json sample Parameter Demo:
postJob:
{
    "Role_Name" : "Senior Engineer",
    "Role_Type" : "SDE",
    "Type" : "On-site",
    "Location" : "USA",
    "Start_Date" : "11/04/22",
    "Posted_Date" : "01/08/22",
    "Responsibilities" : "Testing job number 2",
    "Salary_Start" : "120000",
    "Salary_End" : "180000",
    "Active" : "True",
    "RecruiterID" : 1
 }
```
* Return A String shown below:
```yaml
    "New Job Successfully Added"
```
## API Development
* We developed all the Rest APi's for login, signUp, postJob, getJobs using the golang.
* Display the jobs on postJob dashboard was done on the basis of the jobs posted by recruiter.
* The server was hosted using mux router and the APIs were configured on this.
* All the Api's were tested using the PostMan tool and Interface were tested using the Gounit test cases.

## API Testing
### Testing /login

<img width="1440" alt="Screen Shot 2022-03-04 at 8 26 30 PM" src="https://user-images.githubusercontent.com/94247770/156861989-b2653fb2-8082-4121-ac67-14bccbe24bf0.png">

### Testing /signup
<img width="1440" alt="Screen Shot 2022-03-04 at 8 26 03 PM" src="https://user-images.githubusercontent.com/94247770/156861997-e818aa8e-291b-4ebc-b9f1-8111d684b2b0.png">

### Testing /postJob
<img width="1437" alt="Screen Shot 2022-03-04 at 8 24 58 PM" src="https://user-images.githubusercontent.com/94247770/156862011-633680bb-5b5c-45d1-b381-a3a73579d511.png">

### Testing /getJobById
<img width="1438" alt="Screen Shot 2022-03-04 at 8 21 36 PM" src="https://user-images.githubusercontent.com/94247770/156862023-8571d5af-8df1-4a5c-b99f-e4daa491f2e4.png">

## Backend Unit Testing
Created the Unit test cases to check the robustness of our API.

### /Login Unit test cases
 Created a file named "endpoints_test.go" where we have a Unit test cases named "TestGetusers" which check three scenarios:
 * Validity of http request.
 * Unsuccessful Login attempt with incorrect emailId or password.
 * Succcessful login attempt with correct emailId and Password.
 
### /signup Unit test cases
 Created a file named "endpoints_test.go" where we have a Unit test cases named "TestPutSserData" which check three scenarios:
 * Validity of http request.
 * Successful addtion of new recruiter.
 * Unsuccessful addition of duplicate recruiter.
 * 
 ### /postJob Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestAddJob" which check two scenarios:
 * Validity of http request.
 * Successful addtion of new job.
 
 ### /getJobById Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetJobs" which check two scenarios:
 * Validity of http request.
 * Successful Fetching of jobs mapped to recruiter Id.

# FrontEnd Documentation
## Technologies: ReactJS, CSS, HTML, Bootstrap
## SignUp User
* A Modal will popUp when the recruiter as a user will click on signIn button on Home Page. If the recruiter is not already registered than he can click on signUp button in that Modal. Recruiter can fill their details and submit.User will be registered.
## Login User
* A Interface is created where Recruiter will add their credentials for Login and he can logOut after completing their work.
## Job Dashboard
* A recruiter can click on the postJob Description where he need to login first and then he redirect to dashboard.
* A recruiter Job Posting dashboard where all the jobs posted by the recruiter will display. He can make changes to the job Posting.
## Post Job
* A layout is created where the recruiter post their jobs.
* Recruiter need to add the organization and job description details in the layout.
* Recruiter add the jobs and jobs displayed on recruiter dashboard.
## Mobile view
All User Interface pages are scree size responsive. Attaching the various screenshots to validate this.
* Home Page Screenshot
* <img width="400" alt="Screen Shot 2022-03-04 at 9 40 22 PM" src="https://user-images.githubusercontent.com/16004962/156864862-82259b64-1b01-4e2d-829e-617c8192a3ef.png">

* Post Job Screenshot
* <img width="394" alt="Screen Shot 2022-03-04 at 9 38 33 PM" src="https://user-images.githubusercontent.com/16004962/156864876-3582ba64-e1bf-458a-831f-6ac584d584d5.png">


## Cypress Testing
To check the workflow of project and end to end Integration, we used the automated testing framework Cypress to validate our work.

### Testing Login
<img width="1436" alt="Screen Shot 2022-03-04 at 9 52 32 PM" src="https://user-images.githubusercontent.com/16004962/156865125-893fb795-f792-4f38-8df5-7d1306d93c56.png">

### Testing Logout
<img width="1436" alt="Screen Shot 2022-03-04 at 9 52 32 PM" src="https://user-images.githubusercontent.com/16004962/156865125-893fb795-f792-4f38-8df5-7d1306d93c56.png">


### Testing SignUp
<img width="1417" alt="Screen Shot 2022-03-04 at 9 55 04 PM" src="https://user-images.githubusercontent.com/16004962/156865136-ac91e42f-a79a-4eb8-8ba9-d5e7b3f373cc.png">


### Testing PostJob
<img width="1414" alt="Screen Shot 2022-03-04 at 9 53 13 PM" src="https://user-images.githubusercontent.com/16004962/156865145-1c6893ab-c0e4-4716-8c02-f8231d0920f8.png">

### Testing Using Cypress
Created the 4 cypress test cases where we are checking user Login, User Logout, Show Jobs and Add Jobs. All Test cases passing correctly. Attaching the screenshot below.

<img width="1290" alt="Screen Shot 2022-03-04 at 10 03 01 PM" src="https://user-images.githubusercontent.com/16004962/156865345-b1487ce9-3317-46d6-84bc-12b60b4cb0b9.png">


## Setup and Install
  * FrontEnd: Install NodeJS, React Router DOM 
  * Backend: Install Golang, SQlite 3

## Authors
  * Shashank Kumar
  * Richa Gupta
  * Anjali Gupta
  * Gaurav Pathak

