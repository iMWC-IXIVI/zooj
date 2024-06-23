package entity

type Ingredient struct {
	ID     int    `json:"-"`
	DishID int    `json:"-"`
	Number int    `json:"number"`
	Title  string `json:"title"`
	Weight int    `json:"weight"`
}

type Category struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Tag struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
}

type Step struct {
	ID          int    `json:"-"`
	DishID      int    `json:"-"`
	Number      int    `json:"number"`
	Description string `json:"description"`
}

type Dish struct {
	ID          int          `json:"id"`
	Title       string       `json:"title"`
	Kcal        int          `json:"kcal"`
	Proteins    float32      `json:"proteins"`
	Fats        float32      `json:"fats"`
	Carbos      float32      `json:"carbos"`
	Ingredients []Ingredient `json:"ingredients"`
	Steps       []Step       `json:"steps"`
	Categories  []Category   `json:"categories"`
	Tags        []Tag        `json:"tags"`
	Image       string       `json:"image"`
	Kind        int          `json:"kind"`
	Weight      int          `json:"weight"`
	Provider    string       `json:"provider"`
	Link        string       `json:"link"`
	LinkImage   string       `json:"link_image"`
	Price       float64      `json:"price"`
	HalfDishes  []HalfDish   `json:"half_dishes"`
}

type HalfDish struct {
	ID       int     `json:"id"`
	DishID   int     `json:"dish_id"`
	Title    string  `json:"title"`
	Weight   int     `json:"weight"`
	Kcal     int     `json:"kcal"`
	Proteins float32 `json:"proteins"`
	Fats     float32 `json:"fats"`
	Carbos   float32 `json:"carbos"`
	Image    string  `json:"image"`
	Price    float64 `json:"price"`
	Left     bool    `json:"left"`
	Right    bool    `json:"right"`
}
