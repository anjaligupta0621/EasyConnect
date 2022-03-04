package models

type Recruiter struct {
	ID           uint   `gorm:"primary_key; AUTO_ Increment "`
	Name         string `gorm:"Not null "`
	Email        string `gorm:"unique; Not null "`
	Password     string `gorm:"unique; Not null "`
	Organization string
	Website      string
	Contact      string `gorm:"unique; Not null "`
	Jobs         []Job  `gorm:"foreignKey:JobID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
}

type Login struct {
	Email    string
	Password string
}

type Person struct {
	RecruiterID uint
}
type Job struct {
	JobID            uint   `gorm:"primary_key; AUTO_ Increment"`
	Role_Name        string `gorm:"Not null"`
	Role_Type        string `gorm:"Not null"`
	Type             string
	Location         string
	Start_Date       string
	Posted_Date      string
	Responsibilities string `gorm:"Not null"`
	Salary_Start     string
	Salary_End       string
	Active           string `gorm:"Not null"`
	RecruiterID      uint
}
