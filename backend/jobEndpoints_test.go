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
	"github.com/stretchr/testify/assert"
)

func Router2() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/postJob", handler.GetUsers).Methods("POST")
	router.HandleFunc("/getJobById", handler.PutUserData).Methods("POST")
	router.HandleFunc("/getCandidatesByRecruiterId", handler.GetCandidatesFromRecruiterID).Methods("POST")
	router.HandleFunc("/getCandidatesByJobId", handler.GetCandidatesFromJobID).Methods("POST")
	router.HandleFunc("/getCandidatesByRole", handler.GetCandidatesFromRoleType).Methods("POST")
	router.HandleFunc("/applyForJob", handler.ApplyForJob).Methods("POST")
	router.HandleFunc("/getAppliedJobs", handler.GetAppliedJobs).Methods("POST")
	return router
}

var job = &models.Job{
	Role_Name:        "test",
	Role_Type:        "test",
	Type:             "test",
	Location:         "test",
	Start_Date:       "test",
	Posted_Date:      "test",
	Responsibilities: "test",
	Salary_Start:     "test",
	Salary_End:       "test",
	Active:           "test",
	RecruiterID:      4,
}

func TestAddJob(t *testing.T) {
	jsonPayload, _ := json.Marshal(job)
	request, _ := http.NewRequest("POST", "/postJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetJobs(t *testing.T) {
	recID := &models.Person{RecruiterID: 2}
	jsonPayload, _ := json.Marshal(recID)
	request, _ := http.NewRequest("POST", "/getJobById", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetCandidatesFromRecruiterID(t *testing.T) {
	recID := &models.Rec{Recruiter_ID: 2}
	jsonPayload, _ := json.Marshal(recID)
	request, _ := http.NewRequest("POST", "/getCandidatesByRecruiterId", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetCandidatesFromJobID(t *testing.T) {
	jobID := &models.JobID{Job_ID: 2}
	jsonPayload, _ := json.Marshal(jobID)
	request, _ := http.NewRequest("POST", "/getCandidatesByJobId", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetCandidatesFromRoleType(t *testing.T) {
	roletype := &models.Roletype{Role_Type: "SDE"}
	jsonPayload, _ := json.Marshal(roletype)
	request, _ := http.NewRequest("POST", "/getCandidatesByRole", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestApplyForJob(t *testing.T) {
	details := models.ApplyJob{JobJobID: 1, CandidateUserID: 1}
	jsonPayload, _ := json.Marshal(details)
	request, _ := http.NewRequest("POST", "/applyForJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
func TestGetAppliedJobs(t *testing.T) {
	ut := &models.Usertoken{Token: "Token", Email: "test2"}
	jsonPayload, _ := json.Marshal(ut)
	request, _ := http.NewRequest("POST", "/getAppliedJobs", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
