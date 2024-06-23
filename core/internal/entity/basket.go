package entity

type BasketItem struct {
	UserID    int64   `json:"user_id"`
	DishID    int64   `json:"dish_id"`
	Title     string  `json:"title"`
	Kcal      int     `json:"kcal"`
	Proteins  float32 `json:"proteins"`
	Fats      float32 `json:"fats"`
	Carbos    float32 `json:"carbos"`
	Image     string  `json:"image"`
	Weight    int     `json:"weight"`
	Provider  string  `json:"provider"`
	Link      string  `json:"link"`
	LinkImage string  `json:"link_image"`
	Price     float64 `json:"price"`
}

type ExpectedActual struct {
	Expected float32 `json:"expected"`
	Actual   float32 `json:"actual"`
}

type Basket struct {
	Items    []BasketItem   `json:"items"`
	Kcal     ExpectedActual `json:"kcal"`
	Proteins ExpectedActual `json:"proteins"`
	Fats     ExpectedActual `json:"fats"`
	Carbos   ExpectedActual `json:"carbos"`
}
