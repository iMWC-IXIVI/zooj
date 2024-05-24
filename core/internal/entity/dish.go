package entity

type Ingredient struct {
	ID     int    `json:"id"`
	DishID int    `json:"dish_id"`
	Number int    `json:"number"`
	Title  string `json:"title"`
	Weight int    `json:"weight"`
}

type Category struct {
	ID    int
	Title string
}

type Tag struct {
	ID    int
	Title string
}

type Step struct {
	ID          int
	DishID      int
	Number      int
	Description string
}

type Dish struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Kcal        int          `json:"kcal"`
	Proteins    int          `json:"properties"`
	Fats        int          `json:"fats"`
	Carbos      int          `json:"carbos"`
	Ingredients []Ingredient `json:"ingredients"`
	Steps       []Step       `json:"steps"`
	Categories  []Category   `json:"categories"`
	Tags        []Tag        `json:"tags"`
	Image       string       `json:"image"`
}
