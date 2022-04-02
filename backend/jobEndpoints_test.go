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
	router.HandleFunc("/postJob", handler.AddJob).Methods("POST")
	router.HandleFunc("/getJobById", handler.GetJobs).Methods("POST")
	router.HandleFunc("/applyForJob", handler.ApplyForJob).Methods("POST")
	return router
}

var job = &models.Job{
	Role_Name:        "test1",
	Role_Type:        "test1",
	Type:             "test1",
	Location:         "test1",
	Start_Date:       "test1",
	Posted_Date:      "test1",
	Responsibilities: "test1",
	Salary_Start:     "test1",
	Salary_End:       "test1",
	Active:           "test1",
	RecruiterID:      1,
	CandidateCount:   0,
}

func TestAddJob(t *testing.T) {
	jsonPayload, _ := json.Marshal(job)
	request, _ := http.NewRequest("POST", "/postJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetJobs(t *testing.T) {
	recID := &models.Person{RecruiterID: 1}
	jsonPayload, _ := json.Marshal(recID)
	request, _ := http.NewRequest("POST", "/getJobById", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestApplyForJob(t *testing.T) {
	details := &models.ApplyJob{UserID: 1, JobID: 1}
	jsonPayload, _ := json.Marshal(details)
	request, _ := http.NewRequest("POST", "/applyForJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router2().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
