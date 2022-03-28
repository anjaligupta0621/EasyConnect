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
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var recruiter_ models.Recruiter
	hashedPwd := utils.Hasher([]byte(login.Password))

	db.Table("recruiters").Where("Email = ? AND Password = ?", login.Email, hashedPwd).Find(&recruiter_)

	err3 := hashedPwd == recruiter_.Password

	//exectedPassword := recruiter_.Password
	if recruiter_.Email == "" || !err3 {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	utils.GetJWTToken(recruiter_.Email, w)
	json.NewEncoder(w).Encode(recruiter_)

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

	utils.JWTTokenCheck(tokenStr, w)

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

	err1 := db.Create(&models.Recruiter{Name: recruiter.Name, Email: recruiter.Email, Password: utils.Hasher([]byte(recruiter.Password)), Organization: recruiter.Organization, Website: recruiter.Website, Contact: recruiter.Contact})

	if err1.Error != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusBadRequest)
	} else {
		utils.GetJWTToken(recruiter.Email, w)
		json.NewEncoder(w).Encode(recruiter)

	}

}
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
func LogOut(w http.ResponseWriter, r *http.Request) {
	// see https://golang.org/pkg/net/http/#Cookie
	// Setting MaxAge<0 means delete cookie now.
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

	webCookies := http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		Expires:  time.Unix(0, 0),
		HttpOnly: true,
	}

	http.SetCookie(w, &webCookies)

	w.Write([]byte("Old cookie deleted. Logged out!\n"))

}
