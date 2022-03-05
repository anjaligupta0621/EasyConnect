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

### Testing /signup

### Testing /postJob

### Testing /getJobById



## API Testing