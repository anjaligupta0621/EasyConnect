package handler

import (
	"encoding/json"
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

	db.Create(&models.Job{JobID: job.JobID, Role_Name: job.Role_Name, Role_Type: job.Role_Type, Type: job.Type, Location: job.Location, Start_Date: job.Start_Date, Posted_Date: job.Posted_Date, Responsibilities: job.Responsibilities, Salary_Start: job.Salary_Start, Salary_End: job.Salary_End, Active: job.Active, RecruiterID: job.RecruiterID, CandidateCount: 0})
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

	db.Table("candidates").Where("User_ID = ?", details.UserID).Find(&candidates)
	db.Table("jobs").Where("Job_ID = ?", details.JobID).Find(&jobs)

	db.Model(&models.Candidate{}).Association("Jobs").Append(jobs)
	db.Model(&models.Job{}).Association("Candidates").Append(candidates)

	db.Model(&models.Candidate{}).Where("User_ID = ?", details.UserID).Update("Jobs_Applied", candidates.JobsApplied+1)
	db.Model(&models.Job{}).Where("Job_ID = ?", details.JobID).Update("Candidate_Count", jobs.CandidateCount+1)

	json.NewEncoder(w).Encode("Applied to job")
	//TBD
}
