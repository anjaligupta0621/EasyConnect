package initDB

import (
	"fmt"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func createDB() {
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		fmt.Println(err.Error())
		panic("failed to connect database")
	}
	defer db.Close()

	// Migrate the schema
	db.AutoMigrate(&models.Recruiter{})
	db.AutoMigrate(&models.Job{})
}
