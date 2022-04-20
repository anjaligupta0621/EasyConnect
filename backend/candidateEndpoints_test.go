package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/anjaligupta0621/EasyConnect/backend/handler"
	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/assert"
)

func Router3() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/candidateLogin", handler.GetCandidate).Methods("POST")
	router.HandleFunc("/candidateSignup", handler.PutCandidateData).Methods("POST")
	router.HandleFunc("/updateCandidateProfile", handler.CandidateProfileUpdate).Methods("POST")
	router.HandleFunc("/getCandidateProfile", handler.GetCandidateProfile).Methods("POST")
	return router
}

// Recruting Login API Test case
func TestCandidateLogin(t *testing.T) {

	login := &models.Login{
		Email:    "test1",
		Password: "test1",
	}

	jsonPayload, _ := json.Marshal(login)
	request, _ := http.NewRequest("POST", "/candidateLogin", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")

	login = &models.Login{
		Email:    "test1",
		Password: "test",
	}

	jsonPayload, _ = json.Marshal(login)
	request, _ = http.NewRequest("POST", "/candidateLogin", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 401, response.Code, "OK response is not expected")
}

// Recruting Registration API Test case
func TestCandidateSignup(t *testing.T) {
	recruiter := &models.Candidate{
		Name:        "test2",
		Email:       "test2",
		Password:    "test2",
		Contact:     "test2",
		JobsApplied: 0,
	}
	jsonPayload, _ := json.Marshal(recruiter)
	request, _ := http.NewRequest("POST", "/candidateSignup", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")

	request, _ = http.NewRequest("POST", "/candidateSignup", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 400, response.Code, "OK response is not expected")
	//assert.Equal(t, "\"User already exists\"\n", response.Body.String(), "Signup was supposed to fail")
}

func TestCandidateProfileUpdate(t *testing.T) {

	edu1 := &models.Education{
		College:       "IITK",
		Fromyear:      "1990",
		Toyear:        "1994",
		Qualification: "Bachelors",
		Description:   "BS",
	}

	pro1 := &models.Project{
		Title:              "OSW",
		Link:               "project.com/",
		ProjectDescription: "Some Idea!",
	}

	pro2 := &models.Project{
		Title:              "OSW",
		Link:               "project.com/",
		ProjectDescription: "Another Idea!",
	}

	pe1 := &models.ProfessionalExperience{
		Company:               "TCS.com",
		Position:              "SDE-1",
		Duration:              "4 Years",
		ExperienceDescription: "UI",
	}
	pe2 := &models.ProfessionalExperience{
		Company:               "TCS.com",
		Position:              "SDE-1",
		Duration:              "4 Years",
		ExperienceDescription: "UI",
	}

	var eduArray []models.Education
	var proArray []models.Project
	var peArray []models.ProfessionalExperience
	eduArray = append(eduArray, *edu1)
	proArray = append(proArray, *pro1)
	proArray = append(proArray, *pro2)
	peArray = append(peArray, *pe1)
	peArray = append(peArray, *pe2)

	var skillArray []string
	var intArray []string
	skillArray = append(skillArray, "Golang")
	intArray = append(intArray, "Coding")
	cand := &models.CandidatepRequest{
		Firstname:              "test2",
		Lastname:               "test2",
		Email:                  "test2",
		Phone:                  "test2",
		Github:                 "github.com",
		Linkedin:               "linkedin.com",
		Facebook:               "facebook.com",
		Instagram:              "instagram.com",
		Education:              eduArray,
		Project:                proArray,
		Professionalexperience: peArray,
		Skills:                 skillArray,
		Interests:              intArray,
	}
	jsonPayload, _ := json.Marshal(cand)
	request, _ := http.NewRequest("POST", "/updateCandidateProfile", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")

	cand.Email = "Nonexisting"
	jsonPayload, _ = json.Marshal(cand)
	request, _ = http.NewRequest("POST", "/updateCandidateProfile", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 401, response.Code, "OK response is not expected")
}

func TestGetCandidateProfile(t *testing.T) {

	token := &models.TokenManager{
		Token:    "Dummy",
		UserName: "test2",
	}
	jsonPayload, _ := json.Marshal(token)
	request, _ := http.NewRequest("POST", "/getCandidateProfile", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 400, response.Code, "OK response is not expected")

	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	var ut models.Usertoken
	db.Table("usertokens").Where("Email = ?", token.UserName).Find(&ut)
	token.Token = ut.Token
	request, _ = http.NewRequest("POST", "/getCandidateProfile", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router3().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is not expected")
}
