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
	RecruiterID:      3,
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
