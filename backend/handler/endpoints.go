package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
)

var jwtKey = []byte("my_secret_key")

type Claims struct {
	Email string `json:"username"`
	jwt.StandardClaims
}

func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var login models.Login
	err2 := decoder.Decode(&login)
	if err2 != nil {
		panic(err2)
	}

	var recruiter_ models.Recruiter
	db.Table("recruiters").Where("Email = ? AND Password = ?", login.Email, login.Password).Find(&recruiter_)
	expectedPassword := login.Password

	//else {
	// 	json.NewEncoder(w).Encode("Unsuccessful Login Attempt!")
	// }
	expirationTime := time.Now().Add(5 * time.Minute)

	claims := &Claims{
		Email: recruiter_.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if recruiter_.Email == "" || expectedPassword != recruiter_.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	} else {
		http.SetCookie(w, &http.Cookie{
			Name:    "token",
			Value:   tokenString,
			Expires: expirationTime,
		})
		json.NewEncoder(w).Encode(recruiter_)
	}

	//HomeHandler(w, r)
}
func HomeHandler(w http.ResponseWriter, r *http.Request) {
	//Code to verify redirection at different comps
	//Yet to implement for dashboard and listings
	setupCorsResponse(&w, r)
	cookie, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenStr := cookie.Value

	claims := &Claims{}

	tkn, err := jwt.ParseWithClaims(tokenStr, claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

}
func PutUserData(w http.ResponseWriter, r *http.Request) {
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	decoder := json.NewDecoder(r.Body)
	var recruiter models.Recruiter
	err2 := decoder.Decode(&recruiter)
	if err2 != nil {
		panic(err2)
	}

	result := db.Create(&models.Recruiter{Name: recruiter.Name, Email: recruiter.Email, Password: recruiter.Password, Organization: recruiter.Organization, Website: recruiter.Website, Contact: recruiter.Contact})
	if result.Error != nil {
		fmt.Println(result.Error)
		json.NewEncoder(w).Encode("Recruiter already exists")
	} else {
		json.NewEncoder(w).Encode("New Recruiter Successfully Added: " + recruiter.Name)
	}
}
