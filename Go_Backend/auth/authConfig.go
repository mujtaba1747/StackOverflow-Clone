package auth

import (
	jwtmiddleware "Go_Backend/Jwtmiddleware"
	"encoding/json"
	"net/http"

	"github.com/dgrijalva/jwt-go"
)

var jwtSecret []byte = []byte(`Z"/:E!B%JR*Cz]($6ZV@_FX#yK:;^E9cchjS&qw:SpyR%tvLUgre>t^yN4S6-67C4j(3Ah"Q@N+H6kX9kr(nR!>3qS/%XyH(n9Q2c^PNj"+npM"wta"+E&YXFNT~DM4Z`)

// Middleware Usage : app := auth.NewJwt().Handler(yourHandler)
func NewJwt() *jwtmiddleware.JWTMiddleware {
	return jwtmiddleware.New(jwtmiddleware.Options{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		},
		SigningMethod: jwt.SigningMethodHS256,
		Extractor:     myExtractor,
		ErrorHandler:  myErrorHandler,
	})
}

// My Custom type TokenExtractor func(r *http.Request) (string, error)
// For extracting from User.Token
// Todo : Later, check auth header as well
var myExtractor jwtmiddleware.TokenExtractor = func(r *http.Request) (string, error) {
	token := r.Header.Get("Authorization")
	return token, nil
}
var myErrorHandler jwtmiddleware.Errorhandler = func(w http.ResponseWriter, r *http.Request, err string) {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(&map[string]interface{}{
		"ClientResp": "Token Expired/Invalid, Login Again",
	}) // A one-liner I am proud of, it's my baby
}
