package repo

import (
	"context"
	"goauth/internal/entity"
)

func (r *Repo) GetBasket(userID int) (entity.Basket, error) {
	basket := entity.Basket{
		Items: make([]entity.BasketItem, 0),
	}

	sql := " select user_id, dish_id from basket where user_id = $1"
	rows, err := r.db.Query(context.Background(), sql, userID)

	if err != nil {
		return basket, err
	}

	for rows.Next() {
		item := entity.BasketItem{}
		err := rows.Scan(&item.UserID, &item.DishID)
		if err != nil {
			return basket, err
		}
	}
	return basket, nil
}

func (r *Repo) CreateBasket(userID, dishID int) error {
	sql := "select exists(select 1 from basket where dish_id = $1 and user_id = $2)"

	var exists bool
	err := r.db.QueryRow(context.Background(), sql, dishID, userID).Scan(&exists)
	if err != nil {
		return err
	}

	if exists {
		return nil
	}

	sql = "insert into basket(user_id, dish_id) values ($1, $2);"

	_, err = r.db.Exec(context.Background(), sql, userID, dishID)
	if err != nil {
		return err
	}

	return nil
}

func (r *Repo) DeleteBasket(userID, dishID int) error {
	sql := " delete from basket where user_id = $1 and dish_id = $2"

	_, err := r.db.Exec(context.Background(), sql, userID, dishID)
	if err != nil {
		return err
	}

	return nil
}
