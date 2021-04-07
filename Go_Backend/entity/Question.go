package entity

// A Question represents struct that will store questions asked
type Question struct {
	User         User
	Qbody        string
	CreationDate string // use time.Now().UTC() to get curtime and then store curtime.String() value
	Qid          int
	IsAnon       bool
	Answers      []Answer
	ClientResp   string
}
