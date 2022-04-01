package utils

import (
	"crypto/sha1"
	"encoding/base64"
	"net/http"
	"strings"
	"time"

	"github.com/anjaligupta0621/EasyConnect/backend/models"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

//Setting up cors for utils methods
func setupCorsResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Authorization")
}

// JWT Secret key to be signed by sha1 later on for use
var jwtKey = []byte("P)mY==c-8tnW;7$rS3[2")

// JWT token claim with email
type Claims struct {
	Email string `json:"Email"`
	jwt.StandardClaims
}

func GetUsernameFromEmail(email string) string {
	i := strings.Split(email, "@")

	// if i > -1 {
	// 	return email[:i-1]
	// }
	return i[0]
}

// Util method for sha hashing
func Hasher(bv []byte) string {
	hasher := sha1.New()
	hasher.Write(bv)
	sha := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return sha
}

// bcrypt password hashing with salt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// bcrypt password comparison
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// Creating JWT Token
func GetJWTToken(email string, w http.ResponseWriter) string {
	expirationTime := time.Now().Add(10 * time.Hour)

	// Creating claims with email
	claims := &Claims{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}
	// Creating token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Signing token with secret key(hashed with sha1)
	tokenString, err4 := token.SignedString([]byte(Hasher(jwtKey)))

	if err4 != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return ""
	}
	// Setting http server cookies
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
	return tokenString
}

// Checking JWT Token validity
func JWTTokenCheck(tokenStr string, w http.ResponseWriter) {
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tokenStr, claims,
		func(t *jwt.Token) (interface{}, error) {
			return []byte(Hasher(jwtKey)), nil
		})
	// fmt.Println(err)
	// Checking with claims and return error
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	// check token validity with time
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
}

// Updating JWT Token
func JWTTokenUpdate(tokenStr string, w http.ResponseWriter) {
	claims := &Claims{}
	JWTTokenCheck(tokenStr, w)
	tkn, err := jwt.ParseWithClaims(tokenStr, claims,
		func(t *jwt.Token) (interface{}, error) {
			return []byte(Hasher(jwtKey)), nil
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
	expirationTime := time.Now().Add(10 * time.Hour)

	claims.ExpiresAt = expirationTime.Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(Hasher(jwtKey)))

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w,
		&http.Cookie{
			Name:    "refresh_token",
			Value:   tokenString,
			Expires: expirationTime,
		})
	if time.Unix(claims.ExpiresAt, 0).Sub(time.Now()) > 30*time.Second {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}

// API Authorization with JWT Token and username
func IsAuthorized(user models.TokenManager, w http.ResponseWriter, r *http.Request) bool {

	w.Header().Set("Content-Type", "application/json")
	setupCorsResponse(&w, r)
	// Opening DB
	db, err := gorm.Open("sqlite3", "RecruiterDetails.db")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()

	var authUser models.Usertoken
	// Checking in db if token exists
	db.Table("usertokens").Where("Email = ?", user.UserName).Find(&authUser)

	// Checking if user exists
	if authUser.Email == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{message:"Session Does Not Exists!"}`))
		return false
	}
	//Matching db token from frontend token
	if authUser.Token == user.Token {
		return true
	}
	return false

}
