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
	rtr.HandleFunc("/login", getUsers).Methods("POST")
	rtr.HandleFunc("/signup", putUserData).Methods("POST")
	rtr.HandleFunc("/getJobById", getJobs).Methods("POST")
	rtr.HandleFunc("/postJob", addJob).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", rtr))
}
