package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/anjaligupta0621/EasyConnect/backend/utils"
	"github.com/jinzhu/gorm"
)

// Setting up cors
func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

//API for Login
func GetUsers(w http.ResponseWriter, r *http.Request) {
	//Setting up response header
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	//Setting up db connection
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		panic("failed to connect database")
	}
	defer db.Close()

	//Decoding request body to get username and password
	decoder := json.NewDecoder(r.Body)

	var login models.Login

	err2 := decoder.Decode(&login)
	// Checking if request body has correct login struct
	// if err2 != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	return
	// }
	//Checking if request has empty login info
	if login.Email == "" || login.Password == "" || err2 != nil {
		w.Write([]byte("Wrong Credentials"))
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var recruiter_ models.Recruiter

	//hashedPwd, _ := utils.HashPassword(login.Password)
	//Querying from db
	db.Table("recruiters").Where("Email = ?", login.Email).Find(&recruiter_)

	// Checking if user exists
	if recruiter_.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	//Comparing password from salt
	err3 := utils.CheckPasswordHash(login.Password, recruiter_.Password)

	//Sending response based on password status
	if !err3 {
		w.Write([]byte(`{message:"Wrong Password!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	} else {
		// Creating JWT Token and setting it up as cookies
		jwtToken := utils.GetJWTToken(recruiter_.Email, w)
		// Adding JWt token in db
		errToken := db.Create(&models.Usertoken{Email: recruiter_.Email, Token: jwtToken})

		if errToken.Error != nil {
			fmt.Println(errToken)
			w.WriteHeader(http.StatusBadRequest)
		}

		var jobs []models.Job
		db.Table("jobs").Where("Recruiter_ID = ?", recruiter_.ID).Find(&jobs)
		recruiter_.Jobs = jobs
		// Creating custom Response
		response := models.RecruiterResponse{
			Recruiter: recruiter_,
			Token:     jwtToken,
		}
		json.NewEncoder(w).Encode(response)
	}

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

	utils.JWTTokenCheck(tokenStr, w)

}

//API for Recruiter Resistration
func PutUserData(w http.ResponseWriter, r *http.Request) {
	//Setting up cors
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	// Opening DB
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	// Decoding Request body
	decoder := json.NewDecoder(r.Body)
	var recruiter models.Recruiter
	err2 := decoder.Decode(&recruiter)
	// Checking errors in decoding
	if err2 != nil {
		panic(err2)
	}
	// Hashing user password with salt
	recPwd, _ := utils.HashPassword(recruiter.Password)

	// registering user
	err1 := db.Create(&models.Recruiter{Name: recruiter.Name, Email: recruiter.Email, Password: recPwd, Organization: recruiter.Organization, Website: recruiter.Website, Contact: recruiter.Contact})

	// Checking for error
	if err1.Error != nil {
		fmt.Println(err1)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// Creating JWT Token
	jwtToken := utils.GetJWTToken(recruiter.Email, w)
	// Adding JWT Token in db
	errToken := db.Create(&models.Usertoken{Email: recruiter.Email, Token: jwtToken})

	if errToken.Error != nil {
		fmt.Println(errToken)
		w.WriteHeader(http.StatusBadRequest)
	}
	// Creating custome response
	var recruiter_ models.Recruiter
	db.Table("recruiters").Where("email = ?", recruiter.Email).Find(&recruiter_)
	if recruiter.Email == "" {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	response := models.RecruiterResponse{
		Recruiter: recruiter_,
		Token:     jwtToken,
	}

	json.NewEncoder(w).Encode(response)
}

// API for refreshing JWT Token
func RefreshToken(w http.ResponseWriter, r *http.Request) {
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

	utils.JWTTokenUpdate(tokenStr, w)

}

// Logout API
func LogOut(w http.ResponseWriter, r *http.Request) {
	// see https://golang.org/pkg/net/http/#Cookie
	// Setting MaxAge<0 means delete cookie now.
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	// ok := utils.IsAuthorized(login);
	decoder := json.NewDecoder(r.Body)

	var user models.TokenManager

	err1 := decoder.Decode(&user)

	if err1 != nil {
		w.Write([]byte("Bad Auth Error\n"))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// API Authorization
	if !utils.IsAuthorized(user, w, r) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// Removing Auth Token
	db.Table("usertokens").Where("Email = ?", user.UserName).Delete(user.UserName)

	utils.JWTTokenCheck(user.Token, w)
	// Deleting Cookies from http Server
	webCookies := http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
	}

	http.SetCookie(w, &webCookies)
	// w.Write([]byte("Old cookie deleted. Logged out!\n"))
	json.NewEncoder(w).Encode(`message: Successfully Logged out!`)

}

//API for Login
func GetCurrentUser(w http.ResponseWriter, r *http.Request) {
	//Setting up response header
	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	//Setting up db connection
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		panic("failed to connect database")
	}
	defer db.Close()

	//Decoding request body to get username and password
	decoder := json.NewDecoder(r.Body)

	type User struct {
		User  string
		Token string
	}
	var user User

	err2 := decoder.Decode(&user)

	//Checking if request has empty login info
	if user.User == "" || err2 != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	utils.JWTTokenCheck(user.Token, w)

	var recruiter_ models.Recruiter

	//Querying from db
	db.Table("recruiters").Where("Email = ?", user.User).Find(&recruiter_)

	// Checking if user exists
	if recruiter_.Email == "" {
		w.Write([]byte(`{message:"User Does Not Exists!"}`))
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(recruiter_)

}
