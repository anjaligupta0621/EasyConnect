package server

import (
	"log"
	"net/http"

	"github.com/anjaligupta0621/EasyConnect/backend/handler"
	"github.com/gorilla/mux"
)

func HandleRequests() {
	rtr := mux.NewRouter().StrictSlash(true)
	// Recruting Login API
	rtr.HandleFunc("/login", handler.GetUsers).Methods("POST")
	// Recruting Registration API
	rtr.HandleFunc("/signup", handler.PutUserData).Methods("POST")
	// Get Jobs API
	rtr.HandleFunc("/getJobById", handler.GetJobs).Methods("POST")
	// Posting Job API
	rtr.HandleFunc("/postJob", handler.AddJob).Methods("POST")
	// Home API
	rtr.HandleFunc("/home", handler.HomeHandler).Methods("GET")
	// Get All Jobs API
	rtr.HandleFunc("/getAllJobs", handler.GetAllJobs).Methods("POST")
	// Candidate Login API
	rtr.HandleFunc("/candidateLogin", handler.GetCandidate).Methods("POST")
	// Candidate Registration API
	rtr.HandleFunc("/candidateSignup", handler.PutCandidateData).Methods("POST")
	// Logout API
	rtr.HandleFunc("/logout", handler.LogOut).Methods("POST")
	// Refresh Token API
	rtr.HandleFunc("/refreshAccessToken", handler.RefreshToken).Methods("POST")

	rtr.HandleFunc("/applyForJob", handler.ApplyForJob).Methods("POST")

	log.Fatal(http.ListenAndServe(":8081", rtr))
}
