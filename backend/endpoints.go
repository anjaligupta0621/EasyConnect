package main

import (
	"encoding/json"
	"net/http"

	"github.com/jinzhu/gorm"
)

// Our User Struct
type Recruiter struct {
	ID           uint   `gorm:"primary_key; AUTO_ Increment "`
	Name         string `gorm:"Not null "`
	Email        string `gorm:"unique; Not null "`
	Password     string `gorm:"unique; Not null "`
	Organization string
	Website      string
	Contact      string `gorm:"unique; Not null "`
}

type Login struct {
	Email    string
	Password string
}

func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

func getUsers(w http.ResponseWriter, r *http.Request) {
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

func putUserData(w http.ResponseWriter, r *http.Request) {
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
