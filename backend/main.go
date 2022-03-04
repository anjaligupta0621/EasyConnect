package main

import (
	"fmt"
)

func main() {
	fmt.Println("Launching backend")
	initDB.createDB()
	server.handleRequests()
}
