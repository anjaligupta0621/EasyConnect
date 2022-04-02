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

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/login", handler.GetUsers).Methods("POST")
	router.HandleFunc("/signup", handler.PutUserData).Methods("POST")
	return router
}

// Recruting Login API Test case
func TestGetUsers(t *testing.T) {
	login := &models.Login{
		Email:    "dummy@dummy.com",
		Password: "password",
	}
	jsonPayload, _ := json.Marshal(login)
	request, _ := http.NewRequest("POST", "/login", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 401, response.Code, "OK response is not expected")

	login = &models.Login{
		Email:    "test2",
		Password: "test",
	}

	jsonPayload, _ = json.Marshal(login)
	request, _ = http.NewRequest("POST", "/login", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")

}

// Recruting Registration API Test case
func TestPutUserData(t *testing.T) {
	recruiter := &models.Recruiter{
		Name:         "test2",
		Email:        "test2",
		Password:     "test",
		Organization: "test",
		Website:      "test",
		Contact:      "test2",
	}
	jsonPayload, _ := json.Marshal(recruiter)
	request, _ := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")

	request, _ = http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 400, response.Code, "OK response is not expected")
}
