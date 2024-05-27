package repo

import (
	"context"
	"goauth/internal/entity"
	"log"

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

func (r *Repo) GetDish(id int) (entity.Dish, error) {
	sql := "select id, title, kcal, proteins, fats, carbos, image from dishes where id = $1"
	row := r.db.QueryRow(context.Background(), sql, id)

	dish := entity.Dish{}
	err := row.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats, &dish.Carbos, &dish.Image)
	if err != nil {
		return dish, err
	}

	return dish, nil
}

func (r *Repo) GetDishes(page int, pageSize int) ([]entity.Dish, error) {
	dishes := make([]entity.Dish, 0)

	offset := (page - 1) * pageSize

	sql := "select id, title, kcal, proteins, fats, carbos, image from dishes order by id LIMIT $1 OFFSET $2"

	rows, err := r.db.Query(context.Background(), sql, pageSize, offset)
	if err != nil {
		log.Printf("failed select dishes with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	dishIDs := make([]int, 0)
	for rows.Next() {
		dish := entity.Dish{
			Ingredients: make([]entity.Ingredient, 0),
			Steps:       make([]entity.Step, 0),
		}
		err := rows.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats, &dish.Carbos, &dish.Image)
		if err != nil {
			log.Printf("failed to scan dishes with %v\n", err)
			return make([]entity.Dish, 0), err
		}

		dishes = append(dishes, dish)
		dishIDs = append(dishIDs, dish.ID)
	}

	sql = "select id, dish_id, number, title, weight from ingredients where dish_id = any ($1);"

	rows, err = r.db.Query(context.Background(), sql, dishIDs)
	if err != nil {
		log.Printf("failed to select ingredients with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	ingredients := make([]entity.Ingredient, 0)
	for rows.Next() {
		ing := entity.Ingredient{}
		err := rows.Scan(&ing.ID, &ing.DishID, &ing.Number, &ing.Title, &ing.Weight)
		if err != nil {
			log.Printf("failed to scan ingredients with %v\n", err)
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

	sql = "select id, dish_id, number, description from steps where dish_id = any($1)"
	rows, err = r.db.Query(context.Background(), sql, dishIDs)
	if err != nil {
		log.Printf("failed to select steps with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	steps := make([]entity.Step, 0)
	for rows.Next() {
		st := entity.Step{}
		err := rows.Scan(&st.ID, &st.DishID, &st.Number, &st.Description)
		if err != nil {
			log.Printf("failed to scan steps with %v\n", err)
			return make([]entity.Dish, 0), err
		}

		steps = append(steps, st)
	}

	for index, dish := range dishes {
		for _, step := range steps {
			if step.DishID == dish.ID {
				dishes[index].Steps = append(dishes[index].Steps, step)
			}
		}
	}
	return dishes, nil
}
