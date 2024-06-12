package entity

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Phone    string `json:"phone"`
}

type Anketa struct {
	User          int     `json:"user"`
	Gender        string  `json:"gender"`
	Age           int     `json:"age"`
	Weight        float64 `json:"weight"`
	DesWeight     float64 `json:"des_weight"`
	Height        float64 `json:"height"`
	Activity      float64 `json:"activity"`
	Calorie       float64 `json:"calorie"`
	Protein       float64 `json:"protein"`
	Fats          float64 `json:"fats"`
	Carbohydrates float64 `json:"carbohydrates"`
}
