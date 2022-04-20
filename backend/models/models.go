package models

import (
	"github.com/lib/pq"
)

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

type JobID struct {
	Job_ID uint
}

type Roletype struct {
	Role_Type string
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
	Firstname string         `gorm:"Not null"`
	Lastname  string         `gorm:"Not null"`
	Email     string         `gorm:"primary_key; Not null"`
	Phone     string         `gorm:"unique; Not null"`
	Github    string         `gorm:""`
	Linkedin  string         `gorm:""`
	Facebook  string         `gorm:""`
	Instagram string         `gorm:""`
	Skills    pq.StringArray `gorm:"type:text[]"`
	Interests pq.StringArray `gorm:"type:text[]"`
}
type CandidatepRequest struct {
	Firstname              string
	Lastname               string
	Email                  string
	Phone                  string
	Github                 string
	Linkedin               string
	Facebook               string
	Instagram              string
	Education              []Education
	Project                []Project
	Professionalexperience []ProfessionalExperience
	Skills                 pq.StringArray
	Interests              pq.StringArray
}
type Education struct {
	Email         string `gorm:""`
	College       string `gorm:""`
	Fromyear      string `gorm:""`
	Toyear        string `gorm:""`
	Qualification string `gorm:""`
	Description   string `gorm:""`
}
type Project struct {
	Email              string `gorm:""`
	Title              string `gorm:""`
	Link               string `gorm:""`
	ProjectDescription string `gorm:""`
}
type ProfessionalExperience struct {
	Email                 string `gorm:""`
	Company               string `gorm:""`
	Position              string `gorm:""`
	Duration              string `gorm:""`
	ExperienceDescription string `gorm:""`
}
