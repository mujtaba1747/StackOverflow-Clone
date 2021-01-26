package entity

// An User represents struct that will store user information while user signs up
type User struct {
	UID          int
	Username     string
	Fname        string
	Lname        string
	Email        string
	Password     string
	WorkArea     []string
	KnowsAbout   []string
	CreationDate string // use time.Now().UTC() to get curtime and then store curtime.String() value
	GravatarURL  string
	Token        string
	ClientResp   string
}
