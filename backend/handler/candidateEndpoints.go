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
	w.Header().Set("Content-Type", "application/json")
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
	if login.Email == "" || login.Password == "" || err2 != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Wrong Credentials"))
		return
	}
	var candidate_ models.Candidate
	db.Table("candidates").Where("email = ?", login.Email).Find(&candidate_)

	if candidate_.Email == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		return
	}
	err3 := utils.CheckPasswordHash(login.Password, candidate_.Password)

	if !err3 {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{message:"Wrong Password!"}`))
		return
	} else {
		// Creating JWT Token and setting it up as cookies
		jwtToken := utils.GetJWTToken(candidate_.Email, w)
		// Adding JWt token in db
		errToken := db.Create(&models.Usertoken{Email: candidate_.Email, Token: jwtToken})

		if errToken.Error != nil {
			fmt.Println(errToken)
			w.WriteHeader(http.StatusBadRequest)
		}
		// Creating custom Response
		response := models.CandidateResponse{
			Candidate: candidate_,
			Token:     jwtToken,
		}
		json.NewEncoder(w).Encode(response)
	}
}

// Candidate Registration APi Handler
func PutCandidateData(w http.ResponseWriter, r *http.Request) {
	//Setting up cors
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	// Opening DB
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
	// Hashing user password with salt
	userPwd, _ := utils.HashPassword(candidate.Password)

	username := utils.GetUsernameFromEmail(candidate.Email)

	// fmt.Print(username)
	result := db.Create(&models.Candidate{Name: candidate.Name, Email: candidate.Email, Password: userPwd, Username: username, Contact: candidate.Contact})
	// Checking for error
	if result.Error != nil {
		// fmt.Println(result)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Creating JWT Token
	jwtToken := utils.GetJWTToken(candidate.Email, w)
	// Adding JWT Token in db
	errToken := db.Create(&models.Usertoken{Email: candidate.Email, Token: jwtToken})

	if errToken.Error != nil {
		fmt.Println(errToken)
		w.WriteHeader(http.StatusBadRequest)
	}
	var candidate_ models.Candidate
	db.Table("candidates").Where("email = ?", candidate.Email).Find(&candidate_)
	if candidate.Email == "" {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	// Creating custome response
	response := models.CandidateResponse{
		Candidate: candidate_,
		Token:     jwtToken,
	}

	json.NewEncoder(w).Encode(response)
	json.NewEncoder(w).Encode("New Candidate Successfully Added: " + candidate_.Name)
}
