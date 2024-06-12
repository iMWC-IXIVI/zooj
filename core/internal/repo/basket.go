package repo

import (
	"context"
	"goauth/internal/entity"
	"strconv"
)

func (r *Repo) GetBasket(userID int) (entity.Basket, error) {
	basket := entity.Basket{
		Items: make([]entity.BasketItem, 0),
	}

	sql := `
		select 
		basket.user_id, basket.dish_id,
		dishes.title, dishes.kcal, dishes.proteins, dishes.fats, dishes.carbos,
		dishes.image, coalesce(dishes.weight, 400),
		dishes.provider, dishes.link, dishes.link_image, dishes.price
		from basket 
		inner join dishes on dishes.id = basket.dish_id
		where basket.user_id = $1
		order by dishes.provider
	`
	rows, err := r.db.Query(context.Background(), sql, userID)

	if err != nil {
		return basket, err
	}

	for rows.Next() {
		item := entity.BasketItem{}
		err := rows.Scan(
			&item.UserID, &item.DishID, &item.Title, &item.Kcal, &item.Proteins, &item.Fats, &item.Carbos,
			&item.Image, &item.Weight, &item.Provider, &item.Link, &item.LinkImage, &item.Price)
		if err != nil {
			return basket, err
		}
		item.Image = "/api/v1/images/" + strconv.Itoa(int(item.DishID))
		basket.Items = append(basket.Items, item)

		basket.Kcal.Actual += float32(item.Kcal)
		basket.Fats.Actual += float32(item.Fats)
		basket.Proteins.Actual += float32(item.Proteins)
		basket.Carbos.Actual += float32(item.Carbos)
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
	sql := "delete from basket where user_id = $1 and dish_id = $2"

	_, err := r.db.Exec(context.Background(), sql, userID, dishID)
	if err != nil {
		return err
	}

	return nil
}
