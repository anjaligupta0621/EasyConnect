package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/anjaligupta0621/EasyConnect/backend/handler"
	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	"github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/login", handler.GetUsers).Methods("POST")
	router.HandleFunc("/signup", handler.PutUserData).Methods("POST")
	router.HandleFunc("/logout", handler.LogOut).Methods("POST")
	router.HandleFunc("/getCurrentRecruiter", handler.GetCurrentUser).Methods("POST")
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

func TestLogOut(t *testing.T) {
	tokenm := &models.TokenManager{
		Token:    "GeneratedRandomly",
		UserName: "test2",
	}
	jsonPayload, _ := json.Marshal(tokenm)
	request, _ := http.NewRequest("POST", "/logout", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 401, response.Code, "OK response is not expected")

	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	var token models.TokenManager
	var ut models.Usertoken
	db.Table("usertokens").Where("Email = ?", tokenm.UserName).Find(&ut)
	token.Token = ut.Token
	token.UserName = ut.Email
	fmt.Println(token.Token)
	fmt.Println()
	fmt.Println(token.UserName)
	jsonPayload, _ = json.Marshal(token)
	request, _ = http.NewRequest("POST", "/logout", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}

func TestGetCurrentUser(t *testing.T) {

	type User struct {
		User  string
		Token string
	}
	var tokenm User
	tokenm.User = "test2"
	tokenm.Token = "RandomlyGenerated"
	jsonPayload, _ := json.Marshal(tokenm)
	request, _ := http.NewRequest("POST", "/getCurrentRecruiter", bytes.NewBuffer(jsonPayload))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 400, response.Code, "OK response is not expected")

	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	var token User
	var ut models.Usertoken
	db.Table("usertokens").Where("Email = ?", tokenm.User).Find(&ut)
	token.Token = ut.Token
	token.User = ut.Email
	fmt.Println(token.Token)
	fmt.Println()
	fmt.Println(token.User)
	jsonPayload, _ = json.Marshal(token)
	request, _ = http.NewRequest("POST", "/getCurrentRecruiter", bytes.NewBuffer(jsonPayload))
	response = httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
