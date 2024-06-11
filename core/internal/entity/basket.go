package entity

type BasketItem struct {
	UserID int64 `json:"user_id"`
	DishID int64 `json:"dish_id"`
}

type Basket struct {
	Items []BasketItem `json:"items"`
}
