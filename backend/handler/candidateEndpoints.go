package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/anjaligupta0621/EasyConnect/backend/utils"
	"github.com/jinzhu/gorm"
)

// Candidate Login API Handler
func GetCandidate(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var login models.Login
	err2 := decoder.Decode(&login)
	if err2 != nil {
		panic(err2)
	}

	var candidate_ models.Candidate
	db.Table("candidates").Where("Email = ? AND Password = ?", login.Email, login.Password).Find(&candidate_)

	if candidate_.Email != "" {
		// utils.GetJWTToken(candidate_.Email, w)
		json.NewEncoder(w).Encode(candidate_)
	} else {
		json.NewEncoder(w).Encode("Unsuccessful Login Attempt!")
	}
}

// Candidate Registration APi Handler
func PutCandidateData(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var candidate models.Candidate
	err2 := decoder.Decode(&candidate)
	if err2 != nil {
		panic(err2)
	}

	username := utils.GetUsernameFromEmail(candidate.Email)
	result := db.Create(&models.Candidate{Name: candidate.Name, Email: candidate.Email, Password: candidate.Password, Username: username, Contact: candidate.Contact})
	if result.Error != nil {
		fmt.Println(result.Error)
		// json.NewEncoder(w).Encode("Candidate already exists")
	} else {
		utils.GetJWTToken(candidate.Email, w)
		json.NewEncoder(w).Encode("New Candidate Successfully Added: " + candidate.Name)
	}
}
