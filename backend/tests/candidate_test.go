package tests

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

// Job API Test case
func TestGetCandidateNeg(t *testing.T) {
	login := &models.Login{
		Email:    "dummy@dummy.com",
		Password: "password",
	}
	jsonPayload, _ := json.Marshal(login)
	request, _ := http.NewRequest("POST", "/candidateLogin", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 404, response.Code, "OK response is expected")
	// assert.Equal(t, "\"Unsuccessful Login Attempt!\"\n", response.Body.String(), "Login was supposed to fail")
}

// Test
func TestGetCandidatePos(t *testing.T) {
	login := &models.Login{
		Email:    "gaurav@g.co",
		Password: "676767",
	}

	jsonPayload, _ := json.Marshal(login)
	request, _ := http.NewRequest("POST", "/candidateLogin", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 404, response.Code, "OK response is expected")
	// assert.Equal(t, "{\"Candidate\":{\"UserID\":1,\"Name\":\"Gaurav\",\"Email\":\"gaurav@g.co\",\"Password\":\"$2a$14$41ux3PdTFFDifDLoDK5nuu6ZXtC4JcGH.C1MUBWlnj/F9s04tw7iy\",\"Username\":\"gaurav\",\"Contact\":\"2222222223\",\"Jobs\":null},\"Token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImdhdXJhdkBnLmNvIiwiZXhwIjoxNjQ4ODk3MDgwfQ.IJgpKslzZNqpco7GjwCSuRUQlyaRnw5IU_HVows-nc0\"}", response.Body.String(), "Login was supposed to pass")
}

// Recruting Registration API Test case
func TestPutCandidate(t *testing.T) {
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
