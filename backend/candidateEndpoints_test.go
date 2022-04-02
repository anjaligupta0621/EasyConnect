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

func Router3() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/candidateLogin", handler.GetCandidate).Methods("POST")
	router.HandleFunc("/candidateSignup", handler.PutCandidateData).Methods("POST")
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
