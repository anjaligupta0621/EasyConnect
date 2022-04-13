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
	db2 := db.Exec(sqlStatement, details.JobJobID, details.CandidateUserID)
	defer db2.Close()

	db.Model(&models.Candidate{}).Association("Jobs").Append(jobs)
	db.Model(&models.Job{}).Association("Candidates").Append(candidates)

	db.Model(&models.Candidate{}).Where("User_ID = ?", details.CandidateUserID).Update("Jobs_Applied", candidates.JobsApplied+1)
	db.Model(&models.Job{}).Where("Job_ID = ?", details.JobJobID).Update("Candidate_Count", jobs.CandidateCount+1)

	json.NewEncoder(w).Encode("Applied to job")
}

func GetCandidatesFromRecruiterID(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiterID uint
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

	db.Table("jobs").Where("recruiter_id = ?", recruiterID).Find(&jobs)
	fmt.Println(jobs)

	for i, job := range jobs {
		fmt.Println(i, job.JobID)
		db.Table("candidates_jobs").Where("job_job_id = ?", job.JobID).Find(&temp)
		for j, t := range temp {
			fmt.Println(j, job.JobID, t.CandidateUserID)
			candIDs = append(candIDs, t.CandidateUserID)
		}
	}

	db.Table("candidates").Where("user_id IN (?)", candIDs).Find(&candidates)

	//fmt.Println(candIDs)

	// for i, id := range jobIDs {
	// 	//var candIDs []uint
	// 	db.Table("candidates_jobs").Select("candidate_user_id").Where("job_job_id = ?", jobIDs[i]).Scan(&candIDs)
	// 	fmt.Println(i, jobIDs[i], candIDs)
	// 	m[id] = candIDs
	// }

	// setOfCandidates := make(map[uint]string)

	// for jobid, candArray := range m {
	// 	fmt.Println("Key:", jobid, "=>", "Element:", candArray)
	// 	for candid := range candArray {
	// 		setOfCandidates[uint(candArray[candid])] = "exist" //to remove duplicate candidates that may come from different job IDs.
	// 	}
	// }

	// keys := make([]uint, 0, len(setOfCandidates))
	// for k := range setOfCandidates {
	// 	keys = append(keys, k)
	// }

	//db.Table("candidates").Where("User_ID IN ?", candIDs).Find(&candidates)

	json.NewEncoder(w).Encode(candidates)
}
