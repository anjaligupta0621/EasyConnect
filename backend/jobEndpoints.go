package main

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/jinzhu/gorm"
)

// Our User Struct
type Job struct {
	JobID            uint   `gorm:"primary_key; AUTO_ Increment "`
	Role_Name        string `gorm:"Not null "`
	Role_Type        string `gorm:"Not null "`
	Type             string
	Location         string
	Start_Date       time.Time
	Posted_Date      time.Time
	Responsibilities string `gorm:"Not null"`
	Salary_Start     uint16
	Salary_End       uint16
	Active           bool `gorm:"Not null"`
}

func getJobs(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiter_id uint

	err2 := decoder.Decode(&recruiter_id)
	if err2 != nil {
		panic(err2)
	}

	var jobs []Job
	var recruiter uint
	db.Table("jobs").Where("RecruiterID = ", recruiter).Find(&jobs)

	if jobs != nil {
		json.NewEncoder(w).Encode(jobs)
	} else {
		json.NewEncoder(w).Encode("No Jobs found!")
	}
}

func addJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	//TBD
}

func deleteJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	//TBD
}

func updateJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	//TBD
}
