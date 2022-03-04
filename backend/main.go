package main

import (
	"fmt"

	"github.com/anjaligupta0621/EasyConnect/backend/initDB"
	"github.com/anjaligupta0621/EasyConnect/backend/server"
)

func main() {
	fmt.Println("Launching backend")
	initDB.CreateDB()
	server.HandleRequests()
}
