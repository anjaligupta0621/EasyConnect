package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/jinzhu/gorm"
)

// Our User Struct
type Recruiter struct {
	gorm.Model
	Name         string
	Email        string
	Password     string
	Organization string
	Website      string
	Contact      string
}

type Login struct {
	gorm.Model
	Email    string
	Password string
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintf(w, "Get Data API User Endpoint Hit ---> ")

	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var login Login
	err2 := decoder.Decode(&login)
	if err2 != nil {
		panic(err2)
	}

	var users []Recruiter
	db.Find(&users)
	//var singleUser Recruiter
	result := false
	var returnUser Recruiter
	for i, singleUser := range users {
		fmt.Println(i, singleUser.Email, singleUser.Password)
		if singleUser.Email == login.Email {
			if singleUser.Password == login.Password {
				result = true
				returnUser = singleUser
				break
			}
		}
	}

	if result {
		json.NewEncoder(w).Encode(returnUser)
	} else {
		fmt.Fprintf(w, "Login Failed")
	}
}

func putUserData(w http.ResponseWriter, r *http.Request) {
	//fmt.Fprintf(w, "Put Data API User Endpoint Hit ----> ")

	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiter Recruiter
	err2 := decoder.Decode(&recruiter)
	if err2 != nil {
		panic(err2)
	}
	fmt.Println(recruiter.Name)

	//vars := mux.Vars(r)
	//name := vars["name"]
	//email := vars["email"]

	db.Create(&Recruiter{Name: recruiter.Name, Email: recruiter.Email, Password: recruiter.Password, Organization: recruiter.Organization, Website: recruiter.Website, Contact: recruiter.Contact})
	fmt.Fprintf(w, "New User Successfully Created")
}
