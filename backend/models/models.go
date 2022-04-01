package models

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
	Candidates       []*Candidate `gorm:"many2many:candidates_jobs;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
	CandidateCount   uint
}

// Recruiter Model with gorm mapping
type Recruiter struct {
	ID           uint   `gorm:"primary_key; AUTO_ Increment "`
	Name         string `gorm:"Not null "`
	Email        string `gorm:"unique; Not null "`
	Password     string `gorm:"Not null "`
	Organization string
	Website      string
	Contact      string `gorm:" Not null "`
	Jobs         []Job  `gorm:"foreignKey:RecruiterID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
}

// User token model with gorm mapping
type Usertoken struct {
	Email string `gorm:"unique Not null "`
	Token string `gorm:"unique; Not null "`
}

//user Token manager model
type TokenManager struct {
	Token    string
	UserName string
}

// Custom response model for login signup of recruiter
type RecruiterResponse struct {
	Recruiter Recruiter
	Token     string
}

// Custom response model for login signup of candidate

type CandidateResponse struct {
	Candidate Candidate
	Token     string
}

// Used for login of rec/candi
type Login struct {
	Email    string
	Password string
}

type Person struct {
	RecruiterID uint
}

// Job model with gorm mapping
type Candidate struct {
	UserID      uint   `gorm:"primary_key; AUTO_ Increment "`
	Name        string `gorm:"Not null "`
	Email       string `gorm:"unique; Not null "`
	Password    string `gorm:"Not null "`
	Username    string `gorm:"unique; Not null "`
	Contact     string `gorm:"unique; Not null "`
	Jobs        []*Job `gorm:"many2many:candidates_jobs;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
	JobsApplied uint
}

type ApplyJob struct {
	UserID uint
	JobID  uint
}
