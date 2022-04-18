package models

import "github.com/lib/pq"

type Job struct {
	JobID            uint   `gorm:"primary_key; AUTO_ Increment"`
	Organization     string `gorm:"Not null"`
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
	Name         string `gorm:"Not null"`
	Email        string `gorm:"unique; Not null"`
	Password     string `gorm:"Not null"`
	Organization string
	Website      string
	Contact      string `gorm:" Not null"`
	Jobs         []Job  `gorm:"foreignKey:RecruiterID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
}

// User token model with gorm mapping
type Usertoken struct {
	Email string `gorm:"unique Not null"`
	Token string `gorm:"unique; Not null"`
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

type Rec struct {
	Recruiter_ID uint
}

// Job model with gorm mapping
type Candidate struct {
	UserID      uint   `gorm:"primary_key; AUTO_ Increment "`
	Name        string `gorm:"Not null"`
	Email       string `gorm:"unique; Not null"`
	Password    string `gorm:"Not null"`
	Username    string `gorm:"unique; Not null"`
	Contact     string `gorm:"unique; Not null"`
	Jobs        []*Job `gorm:"many2many:candidates_jobs;constraint:OnUpdate:CASCADE,OnDelete:RESTRICT;"`
	JobsApplied uint
}

type ApplyJob struct {
	JobJobID        uint
	CandidateUserID uint
}

type AppliedCandidateResponse struct {
	Candidate Candidate
	JobID     uint
}
type Candidateprofile struct {
	Firstname string `gorm:"Not null"`
	Lastname  string `gorm:"Not null"`
	Email     string `gorm:"primary_key; Not null"`
	Phone     string `gorm:"unique; Not null"`
	Github    string `gorm:""`
	Linkedin  string `gorm:""`
	Facebook  string `gorm:""`
	Instagram string `gorm:""`
	// Education
	Education []College
	// Project
	Project []Project
	// Professional Experience
	Professionalexperience []ProfessionalExperience
	// Others
	Skills    pq.StringArray `gorm:"type:text[]"`
	Interests pq.StringArray `gorm:"type:text[]"`
}
type College struct {
	College       string
	Fromyear      string
	Toyear        string
	Qualification string
	Description   string
}
type Project struct {
	Title              string
	Link               string
	ProjectDescription string
}
type ProfessionalExperience struct {
	Company               string
	Position              string
	Duration              string
	ExperienceDescription string
}
