package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// Our User Struct
type User struct {
	gorm.Model
	Name  string
	Email string
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get Data API User Endpoint Hit")

	db, err := gorm.Open("sqlite3", "loginDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	var users []User
	db.Find(&users)
	fmt.Println("{}", users)

	json.NewEncoder(w).Encode(users)
}

func putUserData(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Put Data API User Endpoint Hit")

	db, err := gorm.Open("sqlite3", "loginDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	vars := mux.Vars(r)
	name := vars["name"]
	email := vars["email"]

	db.Create(&User{Name: name, Email: email})
	fmt.Fprintf(w, "New User Successfully Created")
}
