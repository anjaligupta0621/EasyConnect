# EasyConnect
## Description

We are devising a web application designated as 'EasyConnect' which has two parts: Recruiter and Job seeker. This will act as a bridge between recruiters and job seekers. The podium will permit recruiters to post diverse jobs which will be visibe to the all the Users who came to out platofrm and shortlist contenders based on diverse skills.On the other hand, the job seekers will be able to build their Rich profile containing details about their past Experience and expertise about the work.Job seeker can look different jobs based on their search, apply to the jobs they find appropriate, and they will also be able to learn new skills.Once the Job seeker applied for the Job, the recruiter can look at the applicant profile and shortlist it for further follow ups. This reduce the time for selecting successful candidates.

### Table of Contents

* Features
* Technology Stack
* Setup Environment
* Testing
* License and authors

## Features
* Recruiter View : 
  * -[x] Recruiter can login/SignUp 
  * -[x] Post the Job
  * -[x] Search qualified Candidates
  * -[x] Shortlist the Candidates for Interview
* Candidate View :  
  * -[x] Candidate can login/SignUp
  * -[x] Create the Resume Based Profile
  * -[x] Search for Jobs
  * -[x] Apply for Jobs


# Complete video demo of the project progress:
https://user-images.githubusercontent.com/61660321/164351503-350cb1e6-8146-4084-9e51-71b1cb5ebe1d.mp4

# Link to the Project Board
https://github.com/anjaligupta0621/EasyConnect/projects

# Cypress Frontend Video
https://user-images.githubusercontent.com/61660321/164353065-4f9de39a-9409-4089-a406-ab7fa06fbb14.mp4

# Detail Documentation of Complete Project:
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
* Fourth Schema named "Candidates_Jobs" was created automatically in the database due to many-to-many relationships between Candidate and Job.
```yaml
type Candidates_Jobs struct {
        UserID           uint   
        JobID            uint  
}
```
* Fifth Schema named "Candidate_profiles" was created in the database for Candidate profile.
```yaml
type Candidateprofile struct {
        Firstname string 
        Lastname  string 
        Email     string 
        Phone     string 
        Github    string 
        Linkedin  string 
        Facebook  string 
        Instagram string 
        Education []College
        Project []Project
        Professionalexperience []ProfessionalExperience
        Skills    pq.StringArray 
        Interests pq.StringArray 
}


## Three structs named "College","Project", and "ProfessionalExperience" were created to handle Candidate profile mappings.


type College struct {
        College       string
        Fromyear      string
        Toyear        string
        Qualification string
        Description   string
}
type Project struct {
        Title              string
        Link               string
        ProjectDescription string
}
type ProfessionalExperience struct {
       Company               string
       Position              string
       Duration              string
       ExperienceDescription string
}

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
* /getCandidatesByRecruiterId
* /getCandidatesByJobId
* /getCandidatesByRole
* /getCurrentRecruiter
* /updateCandidateProfile
* /getAppliedJobs
* /getCandidateProfile

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
#### POST /getCandidatesByRecruiterId
* Send a request to fetch list of Candidates who have applied job posted by a given recruiter.
* Requested URL is http://localhost:8081/getCandidatesByRecruiterId 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getCandidatesByRecruiterId
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Candidates By Recruiter Id Json sample Parameter Demo:
{
    "Recruiter_ID":2
}
```
* Returns the recruiter Details and a token in a response which is stored locally to handle the session at the browser side.
```yaml
{
   "UserID":1,
   "Name":"Shanky Singh",
   "Email":"shanky11@ufl.edu",
   "Password":"$2a$14$sSo2rTV6yur4K4mTrUat3ehaOU.vgDgMhwwSzHLB5JetAXOPQfx3W",
   "Username":"shanky11",
   "Contact":"2223334443",
   "Jobs":null,
   "JobsApplied":8
}
```
#### POST /getCandidatesByJobId
* Send a request to fetch Candidates who have applied for a specific Job. If the user present in the Database then returns.
* Requested URL is http://localhost:8081/getCandidatesByJobId 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getCandidatesByJobId
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Candidates By Job ID Json sample Parameter Demo:
{
   "Job_ID":2
}
```
* Returns the Candidate Details matching the requested Job ID.
```yaml
[{
   "UserID":1,
   "Name":"Shanky Singh",
   "Email":"shanky11@ufl.edu",
   "Password":"$2a$14$sSo2rTV6yur4K4mTrUat3ehaOU.vgDgMhwwSzHLB5JetAXOPQfx3W",
   "Username":"shanky11",
   "Contact":"2223334443",
   "Jobs":null,
   "JobsApplied":8
}]
```
#### POST /getCandidatesByRole
* Send a request to fetch Candidates who have applied for the job for a given role.
* Requested URL is http://localhost:8081/getCandidatesByRole 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getCandidatesByRole
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Candidates by Role Json sample Parameter Demo:
{
      "Role":"Software Development"
}
```
* Returns an array of Candidates whose role matches the requested role.
```yaml
[
  {
    "UserID": 1,
    "Name": "Shanky Singh",
    "Email": "shanky11@ufl.edu",
    "Password": "$2a$14$sSo2rTV6yur4K4mTrUat3ehaOU.vgDgMhwwSzHLB5JetAXOPQfx3W",
    "Username": "shanky11",
    "Contact": "2223334443",
    "Jobs": null,
    "JobsApplied": 8
  }
]
```
#### POST /getCurrentRecruiter
* Send a request to fetch current logged-in recruiter. If the user is present in the Database then returns the Recruiter Details.
* Requested URL is http://localhost:8081/getCurrentRecruiter 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getCurrentRecruiter
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Recruiter Details Json sample Parameter Demo:
{  
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkZIRXVQY1FrOTBOWHBlQkBlYXN5LWNvbm5lY3QuY29tIiwiZXhwIjoxNjUwMzU0NTYwfQ.Q10kXPdU8WONbom6eKOcu5E2ojRBs-Rih0lbeJnV7kM",
"username":"rec1gupta@ufl.edu"
 }
```
* Returns the current Logged-In recruiter Details.
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
    }
}
```
#### POST /updateCandidateProfile
* Send a request to update current Candidate's Profile. After Successful update in the Database, returns the Candidate Profile.
* Requested URL is http://localhost:8081/updateCandidateProfile
* Example with JSON Parameters which we need to pass in the body: 
```yaml
Request URL: http://localhost:8081/updateCandidateProfile
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Update Candidate Profile Json sample Parameter Demo:
{
   "Firstname":"Gaurav",
   "Lastname":"Pathak",
   "Email":"shanky11@ufl.edu",
   "Phone":"2223334446",
   "Github":"github.com",
   "Linkedin":"linkedin.com",
   "Facebook":"facebook.com",
   "Instagram":"instagram.com",
   "Education":[
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      },
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      }
   ],
   "Project":[
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      },
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      }
   ],
   "Professionalexperience":[
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      },
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      }
   ],
   "Skills":[
      "Golang"
   ],
   "Interests":[
      "Travel"
   ]
}
```
* Returns the updated Candidate Profile Details.
```yaml
{
   "Firstname":"Gaurav",
   "Lastname":"Pathak",
   "Email":"shanky11@ufl.edu",
   "Phone":"2223334446",
   "Github":"github.com",
   "Linkedin":"linkedin.com",
   "Facebook":"facebook.com",
   "Instagram":"instagram.com",
   "Education":[
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      },
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      }
   ],
   "Project":[
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      },
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      }
   ],
   "Professionalexperience":[
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      },
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      }
   ],
   "Skills":[
      "Golang"
   ],
   "Interests":[
      "Travel"
   ]
}
```
#### POST /getAppliedJobs
* Send a request to fetch Jobs Applied by Current Candidate, and then returns the an array of Job.
* Requested URL is http://localhost:8081/getAppliedJobs 
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getAppliedJobs
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Applied Jobs Details Json sample Parameter Demo:
{
 “Email”:”FHEuPcQk90NXpeB@easy-connect.com”
“Token”:”eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IkZIRXVQY1FrOTBOWHBlQkBlYXN5LWNvbm5lY3QuY29tIiwiZXhwIjoxNjUwMzU0NTYwfQ.Q10kXPdU8WONbom6eKOcu5E2ojRBs-Rih0lbeJnV7kM”

}
```
* Returns the current Candidate's Applied Jobs.
```yaml
[
   {
      "JobID":9,
      "Organization":"",
      "Role_Name":"SDE II",
      "Role_Type":"Software Development",
      "Type":"Work from home",
      "Location":"",
      "Start_Date":"Later",
      "Posted_Date":"4-17-2022",
      "Responsibilities":"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..",
      "Salary_Start":"30000",
      "Salary_End":"70000",
      "Active":"true",
      "RecruiterID":1,
      "Candidates":null,
      "CandidateCount":2
   },
   {
      "JobID":8,
      "Organization":"",
      "Role_Name":"SDE II",
      "Role_Type":"Software Development",
      "Type":"Work from home",
      "Location":"",
      "Start_Date":"Later",
      "Posted_Date":"4-17-2022",
      "Responsibilities":"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..",
      "Salary_Start":"30000",
      "Salary_End":"70000",
      "Active":"true",
      "RecruiterID":1,
      "Candidates":null,
      "CandidateCount":2
   },
   {
      "JobID":6,
      "Organization":"",
      "Role_Name":"SDE II",
      "Role_Type":"Software Development",
      "Type":"Work from home",
      "Location":"",
      "Start_Date":"Later",
      "Posted_Date":"4-17-2022",
      "Responsibilities":"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..",
      "Salary_Start":"30000",
      "Salary_End":"70000",
      "Active":"true",
      "RecruiterID":0,
      "Candidates":null,
      "CandidateCount":2
   }
]
```
#### POST /getCandidateProfile
* Send a request to fetch current logged-in Candidate's Profile. If the Candidate is present in the Database then returns the Candidate Profile.
* Requested URL is http://localhost:8081/getCandidateProfile
* Example with JSON Parameters which we need to pass in body: 
```yaml
Request URL: http://localhost:8081/getCandidateProfile
Request Method: POST
Status Code: 200 OK
Remote Address: [::1]:8081
Referrer Policy: strict-origin-when-cross-origin
Candidate Profile Request Json sample Parameter Demo:
{  
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImdhdXJhdkBtYWlsLmNvbSIsImV4cCI6MTY1MDM1Njk1NH0.I5MsKRjdICVCbJno1RvVbTCaQpFma8SS4-HN2krYAew",
"username":"shanky11@ufl.edu"
 }
```
* Returns the current Logged-In Candidate's Profile.
```yaml
{
   "Firstname":"Gaurav",
   "Lastname":"Pathak",
   "Email":"shanky11@ufl.edu",
   "Phone":"2223334446",
   "Github":"github.com",
   "Linkedin":"linkedin.com",
   "Facebook":"facebook.com",
   "Instagram":"instagram.com",
   "Education":[
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      },
      {
         "College":"IITK",
         "Fromyear":"1990",
         "Toyear":"1994",
         "Qualification":"Bachelors",
         "Description":"BS"
      }
   ],
   "Project":[
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      },
      {
         "Title":"OSW",
         "Link":"project.com/",
         "ProjectDescription":"Some Idea!"
      }
   ],
   "Professionalexperience":[
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      },
      {
         "Company":"TCS.com",
         "Position":"SDE-1",
         "Duration":"4 Years",
         "ExperienceDescription":"UI"
      }
   ],
   "Skills":[
      "Golang"
   ],
   "Interests":[
      "Travel"
   ]
}
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

### Testing /getCandidatesByRecruiterId

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/recbyid.png?raw=true">

### Testing /getCandidatesByJobId

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/candbyjobit.png?raw=true">

### Testing /getCandidatesByRole

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/candbyrole.png?raw=true">

### Testing /getCurrentRecruiter

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/currentrec.png?raw=true">

### Testing /updateCandidateProfile

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/update-candidate.png?raw=true">

### Testing /getAppliedJobs

<img width="1440" alt="SS" src="https://raw.githubusercontent.com/gau4x4/API-Test/main/Images/applied%20job.png">

### Testing /getCandidateProfile

<img width="1440" alt="SS" src="https://github.com/gau4x4/API-Test/blob/main/Images/getprof.png?raw=true">



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
### /getCandidatesByRecruiterId Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetCandidatesFromRecruiterID" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Candidates By Recruiter Id.
### /getCandidatesByJobId Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetCandidatesFromJobID" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Candidates By Job Id.
### /getCandidatesByRole Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetCandidatesFromRoleType" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Candidates By Role.
### /getCurrentRecruiter Unit test cases
 Created a file named "endpoints_test.go" where we have a Unit test cases named "TestGetCurrentUser" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Recruiter By Email/Id.
### /updateCandidateProfile Unit test cases
 Created a file named "CandidateEndpoints_test.go" where we have a Unit test cases named "TestCandidateProfileUpdate" which check two scenarios:
 * Validity of http request.
 * Successful Updation of Candidate Profile.
### /getAppliedJob Unit test cases
 Created a file named "JobEndpoints_test.go" where we have a Unit test cases named "TestGetAppliedJobs" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Applied Jobs for a Candidate.
### /getCandidateProfile Unit test cases
 Created a file named "CandidateEndpoints_test.go" where we have a Unit test cases named "TestGetCandidateProfile" which check two scenarios:
 * Validity of http request.
 * Successful Retrieval of Candidate Profiles.

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
* <<---Anjali Gupta
* JobSeeker View Screenshot
* <<---Anjali Gupta

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

## Technology Stack
  * Frontend - ReactJs, HTML, CSS, Bootstrap, AJAX
  * Backend - Golang, GORM, GIN
  * Databse - SQLite 3
 
## Setup and Install
  * FrontEnd: Install NodeJS, NPM, React, and React Router DOM 
  * Backend: Install and Setup Golang, SQlite 3[Mac comes with sqlite3 by default]

## Testing
  * Frontend and Backend Unit Testing.
 
## Link to Sprint 4 Deliverables
 https://github.com/anjaligupta0621/EasyConnect/projects/4#column-18385023

## Authors
  * Shashank Kumar- Frontend
  * Richa Gupta-Backend
  * Anjali Gupta-Frontend
  * Gaurav Pathak-Frontend/Backend
