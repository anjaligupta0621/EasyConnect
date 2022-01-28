package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func getALL(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get Data API User Endpoint Hit")
}

func putData(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Put Data API User Endpoint Hit")
}

func main() {
	fmt.Println("Launching GORM")
	handleRequests()
}

func handleRequests() {
	rtr := mux.NewRouter().StrictSlash(true)
	rtr.HandleFunc("/", getALL).Methods("GET")
	//rtr.HandleFunc("/user/", putData).Methods("POST")
	log.Fatal(http.ListenAndServe(":8081", rtr))
}
