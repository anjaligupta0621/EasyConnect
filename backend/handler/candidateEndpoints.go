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
		w.Write([]byte("Wrong Credentials"))
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	var candidate_ models.Candidate
	db.Table("candidates").Where("email = ?", login.Email).Find(&candidate_)

	if candidate_.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	err3 := utils.CheckPasswordHash(login.Password, candidate_.Password)

	if !err3 {
		w.Write([]byte(`{message:"Wrong Password!"}`))
		w.WriteHeader(http.StatusUnauthorized)
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
	result := db.Create(&models.Candidate{Name: candidate.Name, Email: candidate.Email, Password: userPwd, Username: username, Contact: candidate.Contact, JobsApplied: 0})
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
	//json.NewEncoder(w).Encode("New Candidate Successfully Added: " + candidate_.Name)
}

// Candidate Profile Update APi Handler
func CandidateProfileUpdate(w http.ResponseWriter, r *http.Request) {
	//Setting up cors
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	// Opening DB
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	// // Getting Token From Request
	// reqToken := r.Header.Get("Authorization")
	// splitToken := strings.Split(reqToken, "Bearer ")
	// reqToken = splitToken[1]
	// fmt.Println(reqToken)
	// // Decoding Body
	decoder := json.NewDecoder(r.Body)

	var profile models.CandidatepRequest
	err2 := decoder.Decode(&profile)
	fmt.Println("Input Array", profile)

	if err2 != nil {
		panic(err2)
	}
	var candidate models.Candidate
	db.Table("candidates").Where("email = ?", profile.Email).Find(&candidate)

	if candidate.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// fmt.Print(username)
	result := db.Create(&models.Candidateprofile{Firstname: profile.Firstname, Lastname: profile.Lastname,
		Email: profile.Email, Phone: profile.Phone, Github: profile.Github,
		Linkedin: profile.Linkedin, Facebook: profile.Facebook, Instagram: profile.Instagram,
		Skills: profile.Skills, Interests: profile.Interests})

	// // Checking for error
	// fmt.Println("Error:--->", result.Error)
	if result.Error != nil {
		// fmt.Println(result)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	for _, e := range profile.Education {
		result := db.Create(&models.Education{Email: profile.Email, College: e.College, Fromyear: e.Fromyear, Toyear: e.Toyear, Qualification: e.Qualification, Description: e.Description})
		fmt.Println("Education:--->", result)
	}

	for _, p := range profile.Project {
		result := db.Create(&models.Project{Email: profile.Email, Title: p.Title, Link: p.Link, ProjectDescription: p.ProjectDescription})
		fmt.Println("Project:--->", result)
	}

	for _, s := range profile.Professionalexperience {
		result := db.Create(&models.ProfessionalExperience{Email: profile.Email, Company: s.Company, Position: s.Position, ExperienceDescription: s.ExperienceDescription})
		fmt.Println("Experience:--->", result)
	}

	db.Table("candidateprofiles").Where("email = ?", profile.Email).Find(&profile)

	json.NewEncoder(w).Encode(profile)
	//json.NewEncoder(w).Encode("New Candidate Successfully Added: " + candidate_.Name)
}

// Candidate Profile Update APi Handler
func GetCandidateProfile(w http.ResponseWriter, r *http.Request) {
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

	var profile models.TokenManager

	err2 := decoder.Decode(&profile)

	if err2 != nil {
		panic(err2)
	}

	var candidate models.Candidate

	db.Table("candidates").Where("email = ?", profile.UserName).Find(&candidate)

	if candidate.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	utils.JWTTokenCheck(profile.Token, w)

	if !utils.IsAuthorized(profile, w, r) {
		w.Write([]byte(`{message:"Session Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var candidateProfile models.Candidateprofile
	// fmt.Print(username)
	db.Table("candidateprofiles").Where("email = ?", candidate.Email).Find(&candidateProfile)

	// Checking for error
	if candidateProfile.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	var education []models.Education
	db.Table("educations").Where("email=?", profile.UserName).Find(&education)
	var project []models.Project
	db.Table("projects").Where("email=?", profile.UserName).Find(&project)
	var proExp []models.ProfessionalExperience
	db.Table("professional_experiences").Where("email=?", profile.UserName).Find(&proExp)

	var candidateResponse models.CandidatepRequest
	candidateResponse.Firstname = candidateProfile.Firstname
	candidateResponse.Lastname = candidateProfile.Lastname
	candidateResponse.Email = candidateProfile.Email
	candidateResponse.Phone = candidateProfile.Phone
	candidateResponse.Github = candidateProfile.Github
	candidateResponse.Linkedin = candidateProfile.Linkedin
	candidateResponse.Facebook = candidateProfile.Facebook
	candidateResponse.Instagram = candidateProfile.Instagram
	candidateResponse.Education = education
	candidateResponse.Project = project
	candidateResponse.Professionalexperience = proExp
	candidateResponse.Skills = candidateProfile.Skills
	candidateResponse.Interests = candidateProfile.Interests
	// Creating JWT Token
	json.NewEncoder(w).Encode(candidateResponse)
	//json.NewEncoder(w).Encode("New Candidate Successfully Added: " + candidate_.Name)
}
