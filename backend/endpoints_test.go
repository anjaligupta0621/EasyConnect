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
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.Equal(t, "\"Unsuccessful Login Attempt!\"\n", response.Body.String(), "Login was supposed to fail")

	login = &models.Login{
		Email:    "richagupta@ufl.edu",
		Password: "12345678",
	}

	jsonPayload, _ = json.Marshal(login)
	request, _ = http.NewRequest("POST", "/login", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.Equal(t, "{\"ID\":1,\"Name\":\"Richa Gupta\",\"Email\":\"richagupta@ufl.edu\",\"Password\":\"12345678\",\"Organization\":\"UF\",\"Website\":\"www.richaufl.com\",\"Contact\":\"3528889007\",\"Jobs\":null}\n", response.Body.String(), "Login was supposed to pass")

}

// Recruting Registration API Test case
func TestPutUserData(t *testing.T) {
	recruiter := &models.Recruiter{
		Name:         "test",
		Email:        "test",
		Password:     "test",
		Organization: "test",
		Website:      "test",
		Contact:      "test",
	}
	jsonPayload, _ := json.Marshal(recruiter)
	request, _ := http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
	assert.Equal(t, "\"New Recruiter Successfully Added: test\"\n", response.Body.String(), "Signup was supposed to pass")

	request, _ = http.NewRequest("POST", "/signup", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, "\"New Recruiter Successfully Added: test\"\n", response.Body.String(), "Signup was supposed to fail")
}
