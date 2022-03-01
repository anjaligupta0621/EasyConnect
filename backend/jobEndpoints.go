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
	db.Table("recruiters").Where("ID = ", recruiter_id).Find(&recruiter)
	if recruiter != 0 {
		db.Table("jobs").Where("RecruiterID = ", recruiter).Find(&jobs)
	}

	if jobs != nil {
		json.NewEncoder(w).Encode(jobs)
	} else {
		json.NewEncoder(w).Encode("No Jobs found!")
	}
}

func deleteJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiter Recruiter
	err2 := decoder.Decode(&recruiter)
	if err2 != nil {
		panic(err2)
	}

	db.Create(&Recruiter{Name: recruiter.Name, Email: recruiter.Email, Password: recruiter.Password, Organization: recruiter.Organization, Website: recruiter.Website, Contact: recruiter.Contact})
	json.NewEncoder(w).Encode("New Recruiter Successfully Added: " + recruiter.Name)
}

func updateJob(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var login Login
	err2 := decoder.Decode(&login)
	if err2 != nil {
		panic(err2)
	}

	var recruiter_ Recruiter
	db.Table("recruiters").Where("Email = ? AND Password = ?", login.Email, login.Password).Find(&recruiter_)

	if recruiter_.Email != "" {
		json.NewEncoder(w).Encode(recruiter_)
	} else {
		json.NewEncoder(w).Encode("Unsuccessful Login Attempt!")
	}
}
