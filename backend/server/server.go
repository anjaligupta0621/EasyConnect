package server

import (
	"log"
	"net/http"

	"github.com/anjaligupta0621/EasyConnect/backend/handler"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	rtr := mux.NewRouter().StrictSlash(true)
	rtr.HandleFunc("/login", handler.GetUsers).Methods("POST")
	rtr.HandleFunc("/signup", handler.PutUserData).Methods("POST")
	rtr.HandleFunc("/getJobById", handler.GetJobs).Methods("POST")
	rtr.HandleFunc("/postJob", handler.AddJob).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", rtr))
}
