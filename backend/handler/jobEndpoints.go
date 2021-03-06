package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/jinzhu/gorm"
)

// Our User Struct

func GetJobs(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	type Recruiter_struct struct {
		Recruiter_ID uint
	}
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiter_id Recruiter_struct

	err2 := decoder.Decode(&recruiter_id)
	if err2 != nil {
		panic(err2)
	}
	var jobs []models.Job
	db.Table("jobs").Where("Recruiter_ID = ?", recruiter_id.Recruiter_ID).Find(&jobs)

	//jobsList := make([], 0)
	if jobs != nil {
		json.NewEncoder(w).Encode(jobs)
	} else {
		json.NewEncoder(w).Encode("No Jobs found!")
	}
}

func GetAllJobs(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	var jobs []models.Job
	db.Table("jobs").Find(&jobs)

	if jobs != nil {
		json.NewEncoder(w).Encode(jobs)
	} else {
		json.NewEncoder(w).Encode("No Jobs found!")
	}
}

func AddJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var job models.Job
	err2 := decoder.Decode(&job)
	if err2 != nil {
		panic(err2)
	}

	db.Create(&models.Job{JobID: job.JobID, Organization: job.Organization, Role_Name: job.Role_Name, Role_Type: job.Role_Type, Type: job.Type, Location: job.Location, Start_Date: job.Start_Date, Posted_Date: job.Posted_Date, Responsibilities: job.Responsibilities, Salary_Start: job.Salary_Start, Salary_End: job.Salary_End, Active: job.Active, RecruiterID: job.RecruiterID, CandidateCount: 0})
	json.NewEncoder(w).Encode("New job Successfully Added")
	//TBD
}

func DeleteJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	//TBD
}

func UpdateJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	//TBD
}

func ApplyForJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var details models.ApplyJob
	err2 := decoder.Decode(&details)
	if err2 != nil {
		panic(err2)
	}

	var candidates models.Candidate
	var jobs models.Job

	db.Table("candidates").Where("User_ID = ?", details.CandidateUserID).Find(&candidates)
	db.Table("jobs").Where("Job_ID = ?", details.JobJobID).Find(&jobs)

	sqlStatement := `
	INSERT INTO candidates_jobs (job_job_id, candidate_user_id)
	VALUES ($1, $2);`
	db = db.Exec(sqlStatement, details.JobJobID, details.CandidateUserID)
	defer db.Close()

	//db.Model(&models.Candidate{}).Association("Jobs").Append(jobs)
	//db.Model(&models.Job{}).Association("Candidates").Append(candidates)

	db.Model(&models.Candidate{}).Where("User_ID = ?", details.CandidateUserID).Update("Jobs_Applied", candidates.JobsApplied+1)
	db.Model(&models.Job{}).Where("Job_ID = ?", details.JobJobID).Update("Candidate_Count", jobs.CandidateCount+1)

	json.NewEncoder(w).Encode("Applied to job")
}

func GetCandidatesFromRecruiterID(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)

	type Recruiter_struct struct {
		Recruiter_ID uint
	}
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiterID Recruiter_struct
	err = decoder.Decode(&recruiterID)
	if err != nil {
		panic(err)
	}

	var candidates []models.Candidate
	var jobs []models.Job
	var temp []models.ApplyJob
	//var jobIDs []uint
	var candIDs []uint
	//m := make(map[uint][]uint)

	db.Table("jobs").Where("recruiter_id = ?", recruiterID.Recruiter_ID).Find(&jobs)

	for i, job := range jobs {
		fmt.Println(i)
		db.Table("candidates_jobs").Where("job_job_id = ?", job.JobID).Find(&temp)
		for j, t := range temp {
			fmt.Println(j)
			candIDs = append(candIDs, t.CandidateUserID)
		}
	}

	db.Table("candidates").Where("user_id IN (?)", candIDs).Find(&candidates)

	json.NewEncoder(w).Encode(candidates)
}

func GetCandidatesFromJobID(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)

	type Job_struct struct {
		Job_ID uint
	}
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var jobid Job_struct
	err = decoder.Decode(&jobid)
	if err != nil {
		panic(err)
	}

	var candidates []models.Candidate
	var temp []models.ApplyJob
	var candIDs []uint

	db.Table("candidates_jobs").Where("job_job_id = ?", jobid.Job_ID).Find(&temp)
	for j, t := range temp {
		fmt.Println(j)
		candIDs = append(candIDs, t.CandidateUserID)
	}

	db.Table("candidates").Where("user_id IN (?)", candIDs).Find(&candidates)

	json.NewEncoder(w).Encode(candidates)
}

func GetCandidatesFromRoleType(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)

	type Role_struct struct {
		Role string
	}
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var role Role_struct
	err = decoder.Decode(&role)
	if err != nil {
		panic(err)
	}

	var candidates []models.Candidate
	var jobs []models.Job
	var temp []models.ApplyJob
	//var jobIDs []uint
	var candIDs []uint
	//m := make(map[uint][]uint)

	db.Table("jobs").Where("role_type LIKE ?", role.Role+"%").Find(&jobs)

	for i, job := range jobs {
		fmt.Println(i)
		db.Table("candidates_jobs").Where("job_job_id = ?", job.JobID).Find(&temp)
		for j, t := range temp {
			fmt.Println(j)
			candIDs = append(candIDs, t.CandidateUserID)
		}
	}

	db.Table("candidates").Where("user_id IN (?)", candIDs).Find(&candidates)
	json.NewEncoder(w).Encode(candidates)
}
func GetAppliedJobs(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var user models.Usertoken
	err2 := decoder.Decode(&user)
	if err2 != nil {
		panic(err2)
	}

	type AppliedJobs struct {
		JobJobID        uint
		CandidateUserId uint
	}
	var candidates models.Candidate
	var jobs []AppliedJobs
	var appliedJobs []models.Job
	db.Table("candidates").Where("email = ?", user.Email).Find(&candidates)
	db.Table("candidates_jobs").Where("candidate_user_id = ?", candidates.UserID).Find(&jobs)

	for i := 1; i < len(jobs); i++ {
		var appliedJobs_ []models.Job
		db.Table("jobs").Where("job_id = ?", jobs[i].JobJobID).Find(&appliedJobs_)
		appliedJobs = append(appliedJobs, appliedJobs_...)
	}
	type Result struct {
		Candidate models.Candidate
		Jobs      []models.Job
	}
	var result Result
	result.Candidate = candidates
	result.Jobs = appliedJobs

	json.NewEncoder(w).Encode(appliedJobs)
}
