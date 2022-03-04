package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	// router.HandleFunc("/create", handleRequests).Methods("POST")
	return router
}

var job = &Job{
	JobID:            11,
	Role_Name:        "password",
	Role_Type:        "password",
	Type:             "password",
	Location:         "password",
	Start_Date:       "password",
	Posted_Date:      "password",
	Responsibilities: "password",
	Salary_Start:     "password",
	Salary_End:       "password",
	Active:           "password",
	RecruiterID:      2,
}

func testLoginAPI(t *testing.T) {
	login := &Login{
		Email:    "dummy@dummy.com",
		Password: "password",
	}
	jsonPayload, _ := json.Marshal(login)
	request, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func testSignUpAPI(t *testing.T) {
	recruiter := &Recruiter{
		ID:           1,
		Name:         "password",
		Email:        "password",
		Password:     "password",
		Organization: "password",
		Website:      "password",
		Contact:      "password",
		// Jobs:         {job, job},
	}
	jsonPayload, _ := json.Marshal(recruiter)
	request, _ := http.NewRequest("POST", "/addUser", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func testPostJobAPI(t *testing.T) {

	jsonPayload, _ := json.Marshal(job)
	request, _ := http.NewRequest("POST", "/postJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func testGetJobAPI(t *testing.T) {
	recID := &Person{RecruiterID: 2}

	jsonPayload, _ := json.Marshal(recID)
	request, _ := http.NewRequest("POST", "/getJob", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
