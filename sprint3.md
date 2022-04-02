
# Complete video demo of the project progress:
https://drive.google.com/file/d/1Lj-myuztrokd5iDBIAp3AZVHnssUh-Oa/view?usp=sharing

# Backend Documentation

## Database Schema
* A database named "RecruiterDetails" was created using SqlLite.
* A schema named "Recruiter" was created in this database.
```yaml
type Recruiter struct {
        ID              uint   
        Name            string
        Email           string 
        Password        string 
        Organization    string
        Website         string
        Contact         string 
        Jobs            []Job
}
```
* Second Schema named "Jobs" was created in the database.
```yaml
type Job struct {
        JobID            uint   
        Role_Name        string 
        Role_Type        string 
        Type             string
         Location        string
        Start_Date       string
        Posted_Date      string
        Responsibilities string 
        Salary_Start     string
        Salary_End       string
        Active           string 
        RecruiterID      uint
        Candidates      []Candidate
        CandidateCount   uint
}
```
* Third Schema named "Candidate" was created in the database.
```yaml
type Candidate struct {
        UserID          uint
        Email           string   
        Password        string 
        Contact         string 
        Name            string
        Jobs           []Job
        JobsApplied     uint
}
```
* Fourth Schema named "Candidates_Jobs" was created automatically in the database due to many to many relationship between Candidate and Job.
```yaml
type Candidates_Jobs struct {
        UserID           uint   
        JobID            uint  
}
```
## Data Transfer Objects
### Token Manager
* A struct named "TokenManager" was created to handle JWT authentication and provide response tokens for session management.
```yaml
type TokenManager struct {
        Token    string
        UserName string
}
```
### Communication Handlers
* A struct named "RecruiterResponse" was created to handle session for Recruiter.
```yaml
type RecruiterResponse struct {
        Recruiter Recruiter
        Token     string
}
```
* A struct named "CandidateResponse" was created to handle session for Candidate.
```yaml
type CandidateResponse struct {
        Candidate Candidate
        Token     string
}
```

## Api Documentation
### Api Authentication
In order to successfully authenticate the request you must provide the token to validate the API. We are using the JWT authrntication to authenticate our API.

### Api End Points
Queries begin with the same root Url for all the request. Currently using the http client for the request.
The exposed endpoints are -
* /check
* /login
* /signup
* /logout
* /refreshAccessToken
* /getJobById
* /postJob
* /candidateSignUp
* /candidateLogin
* /getAllJobs
* /applyForJob

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
    "Email" : "rec1gupta@ufl.edu",
    "Password" : "password"
}
```
* Returns the recruiter Details and a token in a response which is stored locally to handle the session at the browser side.
```yaml
{
    "Recruiter": {
        "ID": 1,
        "Name": "Rec1 Gupta",
        "Email": "rec1gupta@ufl.edu",
        "Password": "$2a$14$T9CdeDqP6LdP0rUx8Yvh8.ryoEaZ6LaI0dHc3QjQ6yr8TG9SG0oTm",
        "Organization": "UF",
        "Website": "",
        "Contact": "9999999991",
        "Jobs": [
            {
                "JobID": 1,
                "Role_Name": "Senior Engineer",
                "Role_Type": "SDE",
                "Type": "Remote",
                "Location": "USA",
                "Start_Date": "31/08/21",
                "Posted_Date": "01/08/21",
                "Responsibilities": "Testing job number 4",
                "Salary_Start": "90000",
                "Salary_End": "150000",
                "Active": "False",
                "RecruiterID": 1,
                "Candidates": null,
                "CandidateCount": 1
            }
        ]
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InJlYzFndXB0YUB1ZmwuZWR1IiwiZXhwIjoxNjQ4ODkxNzk3fQ.E3UNUVoYXGfuTLzUOh0KNXmgiCVfe0nJhzj6OQ_e5fA"
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
   "Name": "Rec1 Gupta",
   "Email" : "rec1gupta@ufl.edu",
   "Password" : "password",
   "Organization" : "UF",
   "Website" : "",
   "Contact" : "9999999991"
 }
```
* Returns the recruiter Details and a token in a response which is stored locally to handle the session at the browser side.
```yaml
{
    "Recruiter": {
        "ID": 1,
        "Name": "Rec1 Gupta",
        "Email": "rec1gupta@ufl.edu",
        "Password": "$2a$14$T9CdeDqP6LdP0rUx8Yvh8.ryoEaZ6LaI0dHc3QjQ6yr8TG9SG0oTm",
        "Organization": "UF",
        "Website": "",
        "Contact": "9999999991",
        "Jobs": null
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InJlYzFndXB0YUB1ZmwuZWR1IiwiZXhwIjoxNjQ4ODkxNDQ1fQ.6SjkP2lLo29QuzS-9Qy3MS9qX3wL5j26unxxI8elXOU"
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
[{"JobID":1,"Role_Name":"Senior Engineer","Role_Type":"SDE","Type":"Remote","Location":"USA","Start_Date":"31/08/21","Posted_Date":"01/08/21","Responsibilities":"Testing job number 4","Salary_Start":"90000","Salary_End":"150000","Active":"False","RecruiterID":1,"Candidates":null,"CandidateCount":0}]
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
    "Type" : "Remote",
    "Location" : "USA",
    "Start_Date" : "31/08/21",
    "Posted_Date" : "01/08/21",
    "Responsibilities" : "Testing job number 4",
    "Salary_Start" : "90000",
    "Salary_End" : "150000",
    "Active" : "False",
    "RecruiterID" : 1,
    "CandidateCount" : 0
 }
```
* Return A String shown below:
```yaml
    "New Job Successfully Added"
```

#### **POST /candidateLogin**
* Send a request to authenticate the JobSeeker. If the jobSeeker present in the Database then it login successful.
* Requested URL is http://localhost:8081/candidateLogin
* Example here with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/login
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Json Parameter
{
    "Email" : "candgupta@ufl.edu",
    "Password" : "password"
}
```
* Returns the JobSeeker Details In response along with the token which we use to authenticate the user and session handling.
```yaml
{
    "Candidate": {
        "UserID": 1,
        "Name": "Cand Gupta",
        "Email": "candgupta@ufl.edu",
        "Password": "$2a$14$hhoKlCtAUrMsmW0b6J7di.ydFNymLk0R4OgitJSOV9wh0uYEk3mju",
        "Username": "candgupta",
        "Contact": "3528889007",
        "Jobs": null,
        "JobsApplied": 1
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNhbmRndXB0YUB1ZmwuZWR1IiwiZXhwIjoxNjQ4ODkxNTExfQ.RXRxhAvfmnt-XGbsl9jhBiw0CxUcxuhAzzPH68e0Vzc"
}
```

#### POST /CandidateSignUp
* Send a request to Add the JobSeeker. If the JobSeeker present in the Database then returns otherwise add the JobSeeker in Database.
* Requested URL is http://localhost:8081/candidateSignUp 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/signUp
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Sign Up Json sample Parameter Demo:
{
   "Name": "Cand Gupta",
   "Email" : "candgupta@ufl.edu",
   "Password" : "password",
   "Contact" : "3528889007",
   "JobsApplied" : 0
}
```
* Returns the JobSeeker Details and a token in response to handle JWT and session on browsing side.
* Also returns a string ""New Candidate Successfully Added: <Candidate Name>" on successful addtion.
```yaml
{
    "Candidate": {
        "UserID": 1,
        "Name": "Cand Gupta",
        "Email": "candgupta@ufl.edu",
        "Password": "$2a$14$hhoKlCtAUrMsmW0b6J7di.ydFNymLk0R4OgitJSOV9wh0uYEk3mju",
        "Username": "candgupta",
        "Contact": "3528889007",
        "Jobs": null,
        "JobsApplied": 0
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNhbmRndXB0YUB1ZmwuZWR1IiwiZXhwIjoxNjQ4ODkxNDg0fQ.38c27f3rqN7sUtUhx_M0tiDGEQyHSN4cFq2IKxoSRuM"
}
"New Candidate Successfully Added: Cand Gupta"
```
#### POST /Logout
* Send a request to logout the recruiter/candidate.
* Requested URL is http://localhost:8081/logout 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/logout
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
getAllJobs Json sample Parameter Demo:
postJob:
{
    "Token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImNhbmRndXB0YUB1ZmwuZWR1IiwiZXhwIjoxNjQ4ODkxNTExfQ.RXRxhAvfmnt-XGbsl9jhBiw0CxUcxuhAzzPH68e0Vzc",
    "User_Name" : "candgupta",
 }
```
* Return A String shown below:
```yaml
    "message: Successfully Logged out!"
```
#### POST /getAllJobs
* Send a request to get the list of jobs posted by all recruiters (useful for candidate to see all available jobs).
* Requested URL is http://localhost:8081/getAllJobs 
* Example (no JSON Parameters  need to be passed in body): 
```yaml
Request URL: http://localhost:8081/getAllJobs
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
getAllJobs Json sample Parameter Demo:
getJobs:
```
* Returns all Jobs.
* Return List of Jobs as shown below:
```yaml
[{"JobID":1,"Role_Name":"Senior Engineer","Role_Type":"SDE","Type":"Remote","Location":"USA","Start_Date":"31/08/21","Posted_Date":"01/08/21","Responsibilities":"Testing job number 4","Salary_Start":"90000","Salary_End":"150000","Active":"False","RecruiterID":1,"Candidates":null,"CandidateCount":0}]
```

#### POST /applyForJob
* Maps a candidate to a job which they are trying to apply to.
* Requested URL is http://localhost:8081/applyForJob 
* Example with JSON Parameters need to be passed in body: 
```yaml
Request URL: http://localhost:8081/applyForJob
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
getAllJobs Json sample Parameter Demo:
getJobs:
{
    "UserID" : 3,
    "JobID" : 1
}
```
* Returns string "Applied to job".
```yaml
"Applied to job"
```

## API Development
* We developed all the Rest APi's for login, signUp, postJob, getJobs using the golang.
* Display the jobs on postJob dashboard was done on the basis of the jobs posted by recruiter.
* The server was hosted using mux router and the APIs were configured on this.
* All the Api's were tested using the PostMan tool and Interface were tested using the Gounit test cases.

## API Testing
### Testing /login

<img width="1439" alt="Screen Shot 2022-04-01 at 9 48 17 PM" src="https://user-images.githubusercontent.com/94247770/161361309-fa9bd861-844a-479f-8fcb-cb950eab3bfc.png">


### Testing /signup

<img width="1440" alt="Screen Shot 2022-04-01 at 9 47 26 PM" src="https://user-images.githubusercontent.com/94247770/161361321-e90b95e6-ea3d-4069-81ab-13271cc09a93.png">


### Testing /postJob

<img width="1440" alt="Screen Shot 2022-04-01 at 9 48 40 PM" src="https://user-images.githubusercontent.com/94247770/161361339-46699a69-e444-4256-8269-01a5a8bb455a.png">


### Testing /getJobById


<img width="1440" alt="Screen Shot 2022-04-01 at 9 49 17 PM" src="https://user-images.githubusercontent.com/94247770/161361348-611e4015-5113-4e2c-ae02-56e0c27f8054.png">

### Testing /getAllJobs

<img width="1440" alt="Screen Shot 2022-04-01 at 9 49 38 PM" src="https://user-images.githubusercontent.com/94247770/161361382-c489540e-5b62-4326-bc0b-3466837b083f.png">


### Testing /candidateSignup


<img width="1440" alt="Screen Shot 2022-04-01 at 9 51 19 PM" src="https://user-images.githubusercontent.com/94247770/161361390-6171fae0-bcbe-4565-8b1b-b79233cbe85a.png">

### Testing /candidateLogin

<img width="1440" alt="Screen Shot 2022-04-01 at 9 51 42 PM" src="https://user-images.githubusercontent.com/94247770/161361395-e6b9f9b4-0bb6-4c92-bd9b-7c69172eb41f.png">


### Testing /applyForJob

<img width="1440" alt="Screen Shot 2022-04-01 at 9 51 58 PM" src="https://user-images.githubusercontent.com/94247770/161361402-1357bf41-853d-45f5-93f2-24e3fecf8227.png">

### Testing /logout

<img width="1440" alt="Screen Shot 2022-04-01 at 10 17 51 PM" src="https://user-images.githubusercontent.com/94247770/161361901-b9a9b32c-0e24-467e-a0db-4079829b5c9b.png">



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

 ### /getAllJobs Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetAllJobs" which check two scenarios:
 * Validity of http request.
 * Successful Fetching of all jobs.
 
 ### /candidateLogin Unit test cases
 Created a file named "candidateEndpoints_test.go" where we have a Unit test cases named "TestCandidateLogin" which check three scenarios:
 * Validity of http request.
 * Unsuccessful Login attempt with incorrect emailId or password.
 * Succcessful login attempt with correct emailId and Password.
 
### /candidateSignup Unit test cases
 Created a file named "candidateEndpoints_test.go" where we have a Unit test cases named "TestCandidateSignup" which check three scenarios:
 * Validity of http request.
 * Successful addtion of new candidate.
 * Unsuccessful addition of duplicate candidate. 

 ### /applyForJob Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestApplyForJob" which check two scenarios:
 * Validity of http request.
 * Successful Applying to jobs.

# FrontEnd Documentation
## Technologies: ReactJS, CSS, HTML, Bootstrap
## SignUp Recruiter
* A Modal will popUp when the recruiter as a user will click on signIn button on Home Page. If the recruiter is not already registered than he can click on signUp button in that Modal. Recruiter can fill their details and submit.User will be registered.
## Login Recruiter
* A Interface is created where Recruiter will add their credentials for Login and he can logOut after completing their work.
## Job Dashboard
* A recruiter can click on the postJob Description where he need to login first and then he redirect to dashboard.
* A recruiter Job Posting dashboard where all the jobs posted by the recruiter will display. He can make changes to the job Posting.
## Post Job
* A layout is created where the recruiter post their jobs.
* Recruiter need to add the organization and job description details in the layout.
* Recruiter add the jobs and jobs displayed on recruiter dashboard.
## ShortList Candidate
* A Page is created where the recruiter can take a look of all the candidates who applied for the job posted by him. He can select the candidates according to their skills. 
## SignUp JobSeeker
* A Modal will popUp when the JobSeeker as a user will click on signIn button on Home Page. If the JobSeeker is not already registered than he can click on signUp button in that Modal. JobSeeker can fill their details and submit.JobSeeker will be registered.
## Login JobSeeker
* A Interface is created where JobSeeker will add their credentials for Login and he can logOut after completing their work.
## Switch View between JobSeeker and Recruiter
* A Dropdown is created at both the recruiter and jobseeker homepage where they can switch their view.
## ApplyJobs Dashboard
* A Dashboard Interface is created where all the jobs posted by recruiter will display and jobseeker can apply to jobs after registration to the platform.

## Mobile view
All User Interface pages are scree size responsive. Attaching the various screenshots to validate this.
* Home Page Screenshot
* <img width="400" alt="Screen Shot 2022-03-04 at 9 40 22 PM" src="https://user-images.githubusercontent.com/16004962/156864862-82259b64-1b01-4e2d-829e-617c8192a3ef.png">

* Post Job Screenshot
* <img width="394" alt="Screen Shot 2022-03-04 at 9 38 33 PM" src="https://user-images.githubusercontent.com/16004962/156864876-3582ba64-e1bf-458a-831f-6ac584d584d5.png">

* Posted Job Screenshot
<img width="1440" alt="Screen Shot 2022-04-01 at 10 48 25 PM" src="https://user-images.githubusercontent.com/61660321/161363628-4a43d78c-8f4b-4afd-a51b-02c9c92e2497.png">
        

* JobSeeker View Screenshot
        
<img width="1440" alt="Screen Shot 2022-04-01 at 11 02 52 PM" src="https://user-images.githubusercontent.com/61660321/161363654-85e1df21-37a4-407a-a969-b1e283c0b7d5.png">
        
 <img width="1440" alt="Screen Shot 2022-04-01 at 11 03 04 PM" src="https://user-images.githubusercontent.com/61660321/161363666-e2ad5a01-3528-4b38-a14f-a886d2e8f953.png">

 

## Cypress Testing
To check the workflow of project and end to end Integration, we used the automated testing framework Cypress to validate our work.Created the cypress tests cases where we are checking recruiter and Job-seeker components . All Test cases passing correctly.Attached below the screenshot of these components:

### Testing Recruiter Login
<img width="1436" alt="Screen Shot 2022-03-04 at 9 52 32 PM" src="https://user-images.githubusercontent.com/16004962/156865125-893fb795-f792-4f38-8df5-7d1306d93c56.png">

### Testing Recruiter Logout
<img width="1436" alt="Screen Shot 2022-03-04 at 9 52 32 PM" src="https://user-images.githubusercontent.com/16004962/156865125-893fb795-f792-4f38-8df5-7d1306d93c56.png">


### Testing Recruiter SignUp
<img width="1417" alt="Screen Shot 2022-03-04 at 9 55 04 PM" src="https://user-images.githubusercontent.com/16004962/156865136-ac91e42f-a79a-4eb8-8ba9-d5e7b3f373cc.png">


### Testing PostJob
![WhatsApp Image 2022-04-01 at 8 35 36 PM](https://user-images.githubusercontent.com/16004962/161360021-f01713be-ddf2-4667-b9be-1f69b35f9cdc.jpeg)

### Testing Candidate SignUp and Login
<img width="1290" alt="Screen Shot 2022-04-01 at 9 34 31 PM" src="https://user-images.githubusercontent.com/16004962/161360490-8675d5c6-e66b-4bd8-9f89-9b64b470d165.png">

### Testing Switch between Recruiter Mode and Candidate Mode

<img width="1282" alt="Screen Shot 2022-04-01 at 9 43 47 PM" src="https://user-images.githubusercontent.com/16004962/161360752-d2c3b6a1-5eb6-42b8-b9e1-ced8f9465f0e.png">


### Testing Apply Jobs Module

<img width="1285" alt="Screen Shot 2022-04-01 at 10 24 43 PM" src="https://user-images.githubusercontent.com/16004962/161362126-ea0c4f29-a450-40fe-8642-766635ba0a8c.png">

## Setup and Install
  * FrontEnd: Install NodeJS, React Router DOM 
  * Backend: Install Golang, SQlite 3
  * Testing: FrontEnd-Testing: Cypress, Backend-Testing: Unit Testing

## Authors
  * Shashank Kumar Frontend/Backend
  * Richa Gupta   Backend 
  * Anjali Gupta  Frontend
  * Gaurav Pathak Backend/Frontend
