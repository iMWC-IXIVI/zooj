package repo

import (
	"context"
	"goauth/internal/entity"
	"strconv"
	"strings"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repo struct {
	db *pgxpool.Pool
}

func NewRepo(db *pgxpool.Pool) *Repo {
	return &Repo{
		db: db,
	}
}

func (r *Repo) GetDishes() ([]entity.Dish, error) {
	dishes := make([]entity.Dish, 0)

	sql := "select id, title, kcal, proteins, fats, carbos from dishes"
	rows, err := r.db.Query(context.Background(), sql)
	if err != nil {
		return make([]entity.Dish, 0), err
	}

	dishIDs := make([]string, 0)
	for rows.Next() {
		dish := entity.Dish{
			Ingredients: make([]entity.Ingredient, 0),
			Steps:       make([]entity.Step, 0),
		}
		err := rows.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats, &dish.Carbos)
		if err != nil {
			return make([]entity.Dish, 0), err
		}

		dishes = append(dishes, dish)
		dishIDs = append(dishIDs, strconv.Itoa(dish.ID))
	}

	sql = "select id, dish_id, number, title, weight from ingredients where dish_id in ($1)"
	rows, err = r.db.Query(context.Background(), sql, strings.Join(dishIDs, ","))
	if err != nil {
		return make([]entity.Dish, 0), err
	}

	ingredients := make([]entity.Ingredient, 0)
	for rows.Next() {
		ing := entity.Ingredient{}
		err := rows.Scan(&ing.ID, &ing.DishID, &ing.Number, &ing.Title, &ing.Weight)
		if err != nil {
			return make([]entity.Dish, 0), err
		}

		ingredients = append(ingredients, ing)
	}

	for index, dish := range dishes {
		for _, ingredient := range ingredients {
			if ingredient.DishID == dish.ID {
				dishes[index].Ingredients = append(dishes[index].Ingredients, ingredient)
			}
		}
	}

	return dishes, nil

}
