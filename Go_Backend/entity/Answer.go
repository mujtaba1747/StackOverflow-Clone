package entity

// An Answer represents struct that will store answers written
type Answer struct {
	User         User
	Aid          int
	Qid          int
	CreationDate string // use time.Now().UTC() to get curtime and then store curtime.String() value
	Rank         int
	IsAnon       bool
	Abody        string
	ClientResp   string
}
