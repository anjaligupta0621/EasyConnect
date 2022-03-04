package server

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func handleRequests() {
	rtr := mux.NewRouter().StrictSlash(true)
	rtr.HandleFunc("/login", handler.getUsers).Methods("POST")
	rtr.HandleFunc("/signup", handler.putUserData).Methods("POST")
	rtr.HandleFunc("/getJobById", handler.getJobs).Methods("POST")
	rtr.HandleFunc("/postJob", handler.addJob).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", rtr))
}
