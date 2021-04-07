// TO do : Make an errorHandle func to write a JSON clientResp can avoid things like password = "" this way
// Beautify the code
// getting application/json proper in resp
// Move JWT / Auth related code to auth folder
// Do something / package related for the SQL DB

package main

import (
	"Go_Backend/auth"
	"Go_Backend/entity"
	"bytes"
	"crypto/md5"
	"math/rand"

	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strconv"
	"github.com/gorilla/mux"

	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/dgrijalva/jwt-go"
	_ "github.com/go-sql-driver/mysql"
)

var (
	db              *sql.DB
	regStmt         *sql.Stmt
	findStmt        *sql.Stmt
	findbyEmailStmt *sql.Stmt
	getallusersStmt *sql.Stmt
	finduserStmt        *sql.Stmt
	addquesStmt     *sql.Stmt
	findqidStmt     *sql.Stmt
	findUidbyunameStmt *sql.Stmt
	findUserByUIDStmt      *sql.Stmt
	selectAllQuestionsStmt *sql.Stmt
	addansStmt     *sql.Stmt
	findaidStmt     *sql.Stmt
	checkifqidexistStmt *sql.Stmt
	checkifQiduidansexistStmt *sql.Stmt
	checkifaidexistStmt *sql.Stmt
	deleteQuesStmt *sql.Stmt
	deleteAnsStmt *sql.Stmt
	getAllAnswersToQuestionStmt *sql.Stmt

	regQuery         string = "INSERT INTO users (username, user_fname, user_lname, user_email, user_password, user_work_area, user_knows_about, gravatar_url) VALUES (?,?,?,?,?,?,?,?)"
	findQuery        string = "SELECT UID from users where username = ? OR user_email = ? LIMIT 1"
	findbyemailQuery string = "SELECT * from users WHERE user_email = ?"
	getalluserQuery  string = "SELECT * from users"
	finduserQuery    string = "SELECT * from users where username = ? OR user_email = ? LIMIT 1"
	findUserByUID      string = "SELECT * from users where UID = ?"
	findUidbyunameQuery string = "SELECT UID from users where username = ?"
	addquesQuery     string = "INSERT INTO question (ques_body, is_anon, ques_date_creation, UID) VALUES (?,?,?,?)"
	findqidQuery     string = "SELECT ques_id from question where ques_date_creation = ? AND UID = ?"
	selectAllQuestions string = "CALL GetQuestions()"
	findaidQuery string = "SELECT ans_id from answer where ans_date_creation = ? AND ques_id = ? AND UID = ?"
	addansQuery string = "INSERT INTO answer (ques_id, ans_body, is_anon, ans_date_creation, UID) VALUES (?,?,?,?,?)"
	checkifqidexistQuery string = "SELECT ques_id from question where ques_id = ?"
	checkifQiduidansexistQuery string = "SELECT ans_id from answer where ques_id = ? AND UID = ?"
	checkifaidexistQuery string = "SELECT ans_id from answer where ans_id = ?"
	deleteQuesQuery string = "DELETE from question where ques_id = ?"
	deleteAnsQuery string = "DELETE from answer where ans_id = ?"
	getAllAnswersToQuestion    string = "SELECT ans_id, ques_id, ans_body, `rank`, ans_date_creation, UID from answer where ques_id = ?"

	// Use different secret in production
	jwtSecret []byte = []byte(`Z"/:E!B%JR*Cz]($6ZV@_FX#yK:;^E9cchjS&qw:SpyR%tvLUgre>t^yN4S6-67C4j(3Ah"Q@N+H6kX9kr(nR!>3qS/%XyH(n9Q2c^PNj"+npM"wta"+E&YXFNT~DM4Z`)
)

func main() {
	startDB()
	fmt.Println("Server running on port 8080")
	mux := mux.NewRouter()
	mux.HandleFunc("/user/register", reg).Methods("POST")
	mux.HandleFunc("/user/login", login).Methods("POST")
	mux.Handle("/users", auth.NewJwt().Handler(http.HandlerFunc(getUsers))).Methods("GET")
	mux.HandleFunc("/user/{username}", getUserX).Methods("GET")
	mux.Handle("/question/add", auth.NewJwt().Handler(http.HandlerFunc(addQues))).Methods("POST")
	mux.HandleFunc("/feed", getAllQuestions).Methods("GET")
	mux.Handle("/{Qid}/answer", auth.NewJwt().Handler(http.HandlerFunc(addAns))).Methods("POST")
	mux.Handle("/answer/{Aid}/delete", auth.NewJwt().Handler(http.HandlerFunc(delAns))).Methods("POST")
	mux.Handle("/question/{Qid}/delete", auth.NewJwt().Handler(http.HandlerFunc(delQues))).Methods("POST")
	mux.HandleFunc("/{username}/questions", userQuestions).Methods("GET")

	srv := &http.Server{
		Addr: "0.0.0.0:8080",
		// Good practice to set timeouts to avoid Slowloris attacks.
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      mux,
	}
	log.Fatalln(srv.ListenAndServe())
}

var pass string = "password"
var dbname string = "qaforum"

func startDB() { // Opens connection to a SQL Database
	var err error
	db, err = sql.Open("mysql", "root:"+pass+"@tcp(127.0.0.1:3306)/"+dbname+"?charset=utf8&parseTime=true")
	if err != nil {
		log.Fatalln(err)
	}
	if err := db.Ping(); err != nil {
		log.Fatalln("Connection to db failed ", err)
	}
	if regStmt, err = db.Prepare(regQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findStmt, err = db.Prepare(findQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findbyEmailStmt, err = db.Prepare(findbyemailQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if getallusersStmt, err = db.Prepare(getalluserQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if finduserStmt, err = db.Prepare(finduserQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if selectAllQuestionsStmt, err = db.Prepare(selectAllQuestions); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findUserByUIDStmt, err = db.Prepare(findUserByUID); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if addquesStmt, err = db.Prepare(addquesQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findqidStmt, err = db.Prepare(findqidQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findUidbyunameStmt, err = db.Prepare(findUidbyunameQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if findaidStmt, err = db.Prepare(findaidQuery); err != nil {
		log.Fatalln("Stmt Prep Error ", err)
	}
	if addansStmt, err = db.Prepare(addansQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if checkifqidexistStmt, err = db.Prepare(checkifqidexistQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if checkifaidexistStmt, err = db.Prepare(checkifaidexistQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if checkifQiduidansexistStmt, err = db.Prepare(checkifQiduidansexistQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if deleteQuesStmt, err = db.Prepare(deleteQuesQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if deleteAnsStmt, err = db.Prepare(deleteAnsQuery); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
	if getAllAnswersToQuestionStmt, err = db.Prepare(getAllAnswersToQuestion); err != nil {
		log.Fatalln("Stmt Prep Error", err)
	}
}
func findUIDByUsername(usrname string) (int, error) {
	var UID int
	if err := db.QueryRow("SELECT UID from users where username = ?", usrname).Scan(&UID); err != nil {
		return -1, err
	}
	return UID, nil

}
func userQuestions(w http.ResponseWriter, r *http.Request) {
	Q := []entity.Question{}
	t := time.Time{}
	var UID int
	var err error
	if UID, err = findUIDByUsername(mux.Vars(r)["username"]); err != nil {
		log.Println("Error during executing query UID by Username", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	rows, err := db.Query("SELECT * from question where UID = ? order by ques_date_creation desc", UID)
	defer rows.Close()
	if err != nil {
		log.Println("Error during executing query", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	for rows.Next() {
		q := entity.Question{}
		err := rows.Scan(&q.Qid, &q.Qbody, &q.IsAnon, &t, &q.User.UID)
		if err != nil {
			log.Println("Error during iterating result set !", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		q.CreationDate = t.Round(time.Second).UTC().String()
		var (
			WorkArea   string
			KnowsAbout string
		)
		if err := findUserByUIDStmt.QueryRow(q.User.UID).Scan(&q.User.UID, &q.User.Username, &q.User.Fname, &q.User.Lname, &q.User.Email,
			&sql.NullString{}, &WorkArea, &KnowsAbout, &t, &q.User.GravatarURL); err != nil {
			log.Println("Error during executing query", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		q.User.WorkArea = strings.Split(WorkArea, ";")
		q.User.KnowsAbout = strings.Split(KnowsAbout, ";")
		q.User.CreationDate = t.Round(time.Second).UTC().String()
		// 
		Rows, err := getAllAnswersToQuestionStmt.Query(q.Qid)
		for Rows.Next() {
			A := entity.Answer{}
			if err = Rows.Scan(&A.Aid, &A.Qid, &A.Abody, &A.Rank, &t, &A.User.UID); err != nil {
				log.Println("Error during executing query", err)
				w.Header().Add("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(&map[string]interface{}{
					"ClientResp": "Internal Server Error !",
				})
				return
			}
			A.CreationDate = t.Round(time.Second).UTC().String()
			if err = findUserByUIDStmt.QueryRow(A.User.UID).Scan(&A.User.UID, &A.User.Username, &A.User.Fname, &A.User.Lname, &A.User.Email,
				&sql.NullString{}, &WorkArea, &KnowsAbout, &t, &A.User.GravatarURL); err != nil {
				log.Println("Error during executing query", err)
				w.Header().Add("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(&map[string]interface{}{
					"ClientResp": "Internal Server Error !",
				})
				return
			}
			A.User.WorkArea = strings.Split(WorkArea, ";")
			A.User.KnowsAbout = strings.Split(KnowsAbout, ";")
			A.User.CreationDate = t.Round(time.Second).UTC().String()
			q.Answers = append(q.Answers, A)
		}
		Q = append(Q, q)
	}
	err = rows.Err()
	if err != nil {
		log.Println("Error during result set iteration", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	safeEncoder := json.NewEncoder(w)
	safeEncoder.SetEscapeHTML(false)
	w.Header().Add("Content-Type", "application/json")
	if err := safeEncoder.Encode(Q); err != nil {
		log.Println("Error during Questions Marshalling", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
}
func getAllQuestions(w http.ResponseWriter, r *http.Request) {
	Q := []entity.Question{}
	t := time.Time{}
	rows, err := selectAllQuestionsStmt.Query()
	defer rows.Close()
	if err != nil {
		log.Println("Error during executing query", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	for rows.Next() {
		q := entity.Question{}
		err := rows.Scan(&q.Qid, &q.Qbody, &q.IsAnon, &t, &q.User.UID)
		if err != nil {
			log.Println("Error during iterating result set !", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		q.CreationDate = t.Round(time.Second).UTC().String()
		var (
			WorkArea   string
			KnowsAbout string
		)
		if err := findUserByUIDStmt.QueryRow(q.User.UID).Scan(&q.User.UID, &q.User.Username, &q.User.Fname, &q.User.Lname, &q.User.Email,
			&sql.NullString{}, &WorkArea, &KnowsAbout, &t, &q.User.GravatarURL); err != nil {
			log.Println("Error during executing query", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		q.User.WorkArea = strings.Split(WorkArea, ";")
		q.User.KnowsAbout = strings.Split(KnowsAbout, ";")
		q.User.CreationDate = t.Round(time.Second).UTC().String()
		//
		Rows, err := getAllAnswersToQuestionStmt.Query(q.Qid)
		for Rows.Next() {
			A := entity.Answer{}
			if err = Rows.Scan(&A.Aid, &A.Qid, &A.Abody, &A.Rank, &t, &A.User.UID); err != nil {
				log.Println("Error during executing query", err)
				w.Header().Add("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(&map[string]interface{}{
					"ClientResp": "Internal Server Error !",
				})
				return
			}
			A.CreationDate = t.Round(time.Second).UTC().String()
			if err = findUserByUIDStmt.QueryRow(A.User.UID).Scan(&A.User.UID, &A.User.Username, &A.User.Fname, &A.User.Lname, &A.User.Email,
				&sql.NullString{}, &WorkArea, &KnowsAbout, &t, &A.User.GravatarURL); err != nil {
				log.Println("Error during executing query", err)
				w.Header().Add("Content-Type", "application/json")
				w.WriteHeader(http.StatusInternalServerError)
				json.NewEncoder(w).Encode(&map[string]interface{}{
					"ClientResp": "Internal Server Error !",
				})
				return
			}
			A.User.WorkArea = strings.Split(WorkArea, ";")
			A.User.KnowsAbout = strings.Split(KnowsAbout, ";")
			A.User.CreationDate = t.Round(time.Second).UTC().String()
			q.Answers = append(q.Answers, A)
		}
		Q = append(Q, q)
	}
	err = rows.Err()
	if err != nil {
		log.Println("Error during result set iteration", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	safeEncoder := json.NewEncoder(w)
	safeEncoder.SetEscapeHTML(false)
	w.Header().Add("Content-Type", "application/json")
	if err := safeEncoder.Encode(Q); err != nil {
		log.Println("Error during Questions Marshalling", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}

}
func reg(w http.ResponseWriter, req *http.Request) {
	user := &entity.User{}
	if err := json.NewDecoder(req.Body).Decode(user); err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Bad Request",
		})
		return
	}

	if !checkInfo(user) {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Bad Input",
		})
		return
	}
	if alreadyExists(user) {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : User Already exists, login instead",
		})
		return
	}
	user.GravatarURL = Avatar(user.Email, 100)
	if _, err := regStmt.Exec(user.Username, user.Fname, user.Lname, user.Email, HashPassword(user.Password), strings.Join(user.WorkArea, ";"),
		strings.Join(user.KnowsAbout, ";"), user.GravatarURL); err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	addToken(user)
	w.Header().Add("Authorization", user.Token)
	user.Password = ""
	w.Header().Add("Content-Type", "application/json")
	// if err := json.NewEncoder(w).Encode(user); err != nil { // kyuki karna padta hai
	jsonresp, err := JSONMarshal(user)
	if err != nil {
		w.Header().Del("Authorization")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Internal Error",
		})
		return
	}
	w.Write(jsonresp)
	log.Println("Inserting :", user)
}

// login api
func login(w http.ResponseWriter, req *http.Request) {
	var user entity.User
	if err := json.NewDecoder(req.Body).Decode(&user); err != nil {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Malformed input",
		})
		return
	}
	password_recieved := user.Password
	row := findbyEmailStmt.QueryRow(user.Email)
	var workarea string
	var knowsabout string
	if err := row.Scan(&user.UID, &user.Username, &user.Fname, &user.Lname, &user.Email, &user.Password,
		&workarea, &knowsabout, &user.CreationDate, &user.GravatarURL); err == sql.ErrNoRows {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Incorrect login credentials / Account doesn't exist",
		})
		return
	} else if err != nil {
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		log.Println("error while reading from db in login", err)
		return
	}
	if CheckPasswordHash(password_recieved, user.Password) {
		user.WorkArea = strings.Split(workarea, ";")
		user.KnowsAbout = strings.Split(knowsabout, ";")
		addToken(&user)
		w.Header().Add("Authorization", user.Token)
		w.Header().Add("Content-Type", "application/json")
		user.Password = ""
		user.UID = 0
		// jsonResponse, err := json.Marshal(user); err != nil
		safeEncoder := json.NewEncoder(w)
		safeEncoder.SetEscapeHTML(false)
		if err := safeEncoder.Encode(user); err != nil {
			w.Header().Del("Authorization")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal server error !",
			})
			log.Println("json response error in login", err)
			return
		}
		return
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	json.NewEncoder(w).Encode(&map[string]interface{}{
		"ClientResp": "Incorrect login credentials / Account doesn't exist",
	})
}

// get all users
func getUsers(w http.ResponseWriter, req *http.Request) {
	var users []entity.User
	var user entity.User
	var workarea string
	var knowsabout string
	rows, err := getallusersStmt.Query()
	if err != nil {
		log.Println("Error during query", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	defer rows.Close()
	for rows.Next() {
		err := rows.Scan(&user.UID, &user.Username, &user.Fname, &user.Lname, &user.Email, &user.Password, &workarea, &knowsabout, &user.CreationDate, &user.GravatarURL)
		if err != nil {
			log.Println(err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		user.WorkArea = strings.Split(workarea, ";")
		user.KnowsAbout = strings.Split(knowsabout, ";")
		user.Password = ""
		user.UID = 0
		users = append(users, user)
	}
	err = rows.Err()
	if err != nil {
		log.Println("Error during result set iteration", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return

	}
	w.Header().Add("Content-Type", "application/json")
	safeEncoder := json.NewEncoder(w)
	safeEncoder.SetEscapeHTML(false)
	if err := safeEncoder.Encode(users); err != nil {
		log.Println("Error during json marshalling", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
}

// get a user by username
func getUserX(w http.ResponseWriter, req *http.Request) {
	var user entity.User
	vars := mux.Vars(req)
	user.Username = vars["username"]
	var workarea string
	var knowsabout string
	row := finduserStmt.QueryRow(user.Username, user.Email)
	err := row.Scan(&user.UID, &user.Username, &user.Fname, &user.Lname, &user.Email, &user.Password, &workarea, &knowsabout, &user.CreationDate, &user.GravatarURL)
	if err == sql.ErrNoRows {
		log.Println("User not found", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "User Does not Exist !",
		})
		return
	} else if err != nil {
		log.Println("Error during db read", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	user.Password = ""
	user.UID = 0
	safeEncoder := json.NewEncoder(w)
	safeEncoder.SetEscapeHTML(false)
	// jsonResponse, err := json.Marshal(user)
	w.Header().Add("Content-Type", "application/json")
	if err := safeEncoder.Encode(user); err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		log.Println("json response error in getuserX", err)
		return
	}
}

// add a question
func addQues(w http.ResponseWriter, req *http.Request) { //todo find if ques exists
	var ques entity.Question
	if err := json.NewDecoder(req.Body).Decode(&ques); err != nil || ques.Qbody == "" {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Malformed input",
		})
		return
	}
	username := req.Context().Value("user").(*jwt.Token).Claims.(jwt.MapClaims)["Username"]
	// log.Println("Biggie Cheese", usrname.Claims.(jwt.MapClaims)["Username"])
	row := findUidbyunameStmt.QueryRow(username)
	// row := db.QueryRow("SELECT UID from users where username = ?", usrname)
	// row := findStmt.QueryRow(ques.User.Username, ques.User.Email) // finding UID
	err := row.Scan(&ques.User.UID)
	if err != nil {
		log.Println("Error during db read in addques", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	t := time.Now().Round(time.Second).UTC() // mysql doesn't keep ns
	ques.CreationDate = t.String()
	_, err = addquesStmt.Exec(ques.Qbody, ques.IsAnon, t, ques.User.UID) // insert in db
	if err != nil {
		log.Println("Error during db insert in addques", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	row = findqidStmt.QueryRow(t, ques.User.UID) // find out qid
	err = row.Scan(&ques.Qid)
	if err != nil {
		log.Println("Error during db read in addques", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	//if err := json.NewEncoder(w).Encode(ques); err != nil {
	ques.User.UID = 0
	safeEncoder := json.NewEncoder(w)
	safeEncoder.SetEscapeHTML(false)
	w.Header().Add("Content-Type", "application/json")
	if err := safeEncoder.Encode(ques); err != nil {
		log.Println("Error during encoding in addques", err)
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Internal Error",
		})
		return
	}
	log.Println("Inserting ques : ", ques)
}

// delete a question
func delQues(w http.ResponseWriter, req *http.Request) {
	var ques entity.Question
	vars := mux.Vars(req)
	qid, err := strconv.Atoi(vars["Qid"])
	if err != nil {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	ques.Qid = qid
	row := checkifqidexistStmt.QueryRow(ques.Qid)
	err = row.Scan(&ques.Qid)
	if err == sql.ErrNoRows {
		log.Println("Ques to be deleted doesn't exist", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Question with specified ID doesn't exist !",
		})
		return
	} else if err != nil {
		log.Println("Error during db read", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	_, err = deleteQuesStmt.Exec(ques.Qid) // delete from db
	if err != nil {
		log.Println("Error during deletion from db in delques", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	log.Println("Ques having ID ", ques.Qid,"deleted")
}

// add an answer
func addAns(w http.ResponseWriter, req *http.Request) {
	var ans entity.Answer
	vars := mux.Vars(req)
	qid, err := strconv.Atoi(vars["Qid"])
	if err != nil {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	ans.Qid = qid
	if err = json.NewDecoder(req.Body).Decode(&ans); err != nil || ans.Abody == "" {
		log.Println("here  ",err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Error : Malformed input",
		})
		return
	}
	username := req.Context().Value("user").(*jwt.Token).Claims.(jwt.MapClaims)["Username"]
	row := findUidbyunameStmt.QueryRow(username) //find uid
	err = row.Scan(&ans.User.UID)
	if err != nil {
		log.Println("Error during db read in addans", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	row = checkifqidexistStmt.QueryRow(ans.Qid)
	err = row.Scan(&ans.Qid)
	if err == sql.ErrNoRows {
		log.Println("Ques to be answered doesn't exist", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Question with specified ID doesn't exist !",
		})
		return
	} else if err != nil {
		log.Println("Error during db read", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	row = checkifQiduidansexistStmt.QueryRow(ans.Qid, ans.User.UID) // {qid, uid} must be unique
	err = row.Scan(&ans.Aid)
	if err == sql.ErrNoRows {
		t := time.Now().Round(time.Second).UTC() // mysql doesn't keep ns
		ans.CreationDate = t.String()
		_, err = addansStmt.Exec(ans.Qid, ans.Abody, ans.IsAnon, t, ans.User.UID) // insert in db
		if err != nil {
			log.Println("Error during db insert in addans", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		row = findaidStmt.QueryRow(t, ans.Qid, ans.User.UID) // find out aid
		err = row.Scan(&ans.Aid)
		if err != nil {
			log.Println("Error during db read in addques", err)
			w.Header().Add("Content-Type", "application/json")
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Internal Server Error !",
			})
			return
		}
		//if err := json.NewEncoder(w).Encode(ans); err != nil {
		ans.User.UID = 0
		safeEncoder := json.NewEncoder(w)
		safeEncoder.SetEscapeHTML(false)
		w.Header().Add("Content-Type", "application/json")
		if err := safeEncoder.Encode(ans); err != nil {
			log.Println("Error during encoding in addans", err)
			w.WriteHeader(http.StatusInternalServerError)
			json.NewEncoder(w).Encode(&map[string]interface{}{
				"ClientResp": "Error : Internal Error",
			})
			return
		}
		log.Println("Inserting ans : ", ans)
	} else if err != sql.ErrNoRows {
		log.Println("User has answered already", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "You have already ansered this question !",
		})
		return
	} else {
		log.Println("Error during db read", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
}

// delete an answer
func delAns(w http.ResponseWriter, req *http.Request) {
	var ans entity.Answer
	vars := mux.Vars(req)
	aid, err := strconv.Atoi(vars["Aid"])
	if err != nil {
		log.Println(err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	ans.Aid = aid
	row := checkifaidexistStmt.QueryRow(ans.Aid)
	err = row.Scan(&ans.Aid)
	if err == sql.ErrNoRows {
		log.Println("Ans to be deleted doesn't exist", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Answer with specified ID doesn't exist !",
		})
		return
	} else if err != nil {
		log.Println("Error during db read", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	_, err = deleteAnsStmt.Exec(ans.Aid) // delete from db
	if err != nil {
		log.Println("Error during deletion from db in delans", err)
		w.Header().Add("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(&map[string]interface{}{
			"ClientResp": "Internal Server Error !",
		})
		return
	}
	log.Println("Ans having ID ", ans.Aid,"deleted")
}

func Randomstr(n int) string {
	charset := "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	b := make([]byte, n)
	for i := range b {
		b[i] = charset[rand.Intn(len(charset))]
	}
  	return string(b)
}

func Avatar(email string, size uint) string { // I thought we gonna get a random image every time > later
	hash := md5.Sum([]byte(strings.Trim(email, " ")))
	// defaulturl := "https://cf.quizizz.com/join/img/avatars/tablet_lg/monster24.png"
	defaulturl := "https://avatars.dicebear.com/api/bottts/" + Randomstr(rand.Intn(100) + 4) + ".svg" // using dicebear API
	fmt.Println(defaulturl)
	defaulturlencoded := url.QueryEscape(defaulturl)
	fmt.Println(defaulturlencoded)
	return fmt.Sprintf("https://www.gravatar.com/avatar/%x?s=%d&d=%s", hash, size, defaulturlencoded)
}

// todo: one liner huh
func JSONMarshal(t interface{}) ([]byte, error) { // generic func to marshal with <,>,? as it is i.e., SetEscapeHTML false
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	err := encoder.Encode(t)
	return buffer.Bytes(), err

}
func HashPassword(password string) string { // Todo : Error handling for this func
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		log.Println(err)
	}
	return string(bytes)
}

// CheckPasswordHash function to check if passed password string has the passed hash string as bcrypt hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
func checkInfo(user *entity.User) bool {
	if user.Email == "" || user.Username == "" || user.Password == "" {
		return false
	}
	return true
}
func alreadyExists(user *entity.User) bool {
	var cnt int
	err := findStmt.QueryRow(user.Username, user.Email).Scan(&cnt)
	if err == nil {
		return true // User already exists
	}
	return false // User doens't exist
}

type Claims struct {
	Username string
	jwt.StandardClaims
}

func addToken(user *entity.User) { // Todo : add error handling for this func
	user.Password = ""
	expirationTime := time.Now().Add(60 * time.Minute)
	claims := &Claims{
		Username: user.Username,
		StandardClaims: jwt.StandardClaims{
			// In JWT, the expiry time is expressed as unix milliseconds
			ExpiresAt: expirationTime.Unix(),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		log.Println("Check JWT !", err)
	}
	user.Token = tokenString
}
