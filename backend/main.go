package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("Launching GORM")
	createDB()
	handleRequests()
}

func handleRequests() {
	rtr := mux.NewRouter().StrictSlash(true)
	rtr.HandleFunc("/users", getUsers).Methods("GET")
	rtr.HandleFunc("/user/{user}/{email}", putUserData).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", rtr))
}
