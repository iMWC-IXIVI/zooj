package repo

import (
	"context"
	"goauth/internal/entity"
	"log"
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

func (r *Repo) GetDish(id int) (entity.Dish, error) {
	sql := "select id, title, kcal, proteins, fats, carbos, image, kind from dishes where id = $1"
	row := r.db.QueryRow(context.Background(), sql, id)

	dish := entity.Dish{}
	err := row.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats, &dish.Carbos, &dish.Image, &dish.Kind)
	if err != nil {
		return dish, err
	}

	return dish, nil
}

func (r *Repo) GetDishes(page int, pageSize int, categoryIDs, tagIDs []int) ([]entity.Dish, error) {
	dishes := make([]entity.Dish, 0)

	offset := (page - 1) * pageSize

	sql := `select id, title, kcal, proteins, fats, carbos, image, coalesce(kind, 0), coalesce(weight, 400), 
			provider, link, link_image, price from dishes`
	args := []any{pageSize, offset}

	if len(categoryIDs) > 0 || len(tagIDs) > 0 {
		sql += " where "
	}

	wheres := []string{}

	if len(categoryIDs) > 0 {
		key := len(args) + 1
		wheres = append(wheres, " exists (select 1 from dishes_categories where dish_id = dishes.id and category_id = any($"+strconv.Itoa(key)+"))")
		args = append(args, categoryIDs)
	}

	if len(tagIDs) > 0 {
		key := len(args) + 1
		wheres = append(wheres, " not exists (select 1 from dishes_tags where dish_id = dishes.id and tag_id = any($"+strconv.Itoa(key)+"))")
		args = append(args, tagIDs)
	}

	sql += strings.Join(wheres, " and ")

	sql += " order by id LIMIT $1 OFFSET $2"

	log.Printf("SQL IS: %v\n", sql)

	rows, err := r.db.Query(context.Background(), sql, args...)
	if err != nil {
		log.Printf("failed select dishes with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	dishIDs := make([]int, 0)
	for rows.Next() {
		dish := entity.Dish{
			Ingredients: make([]entity.Ingredient, 0),
			Steps:       make([]entity.Step, 0),
			Categories:  make([]entity.Category, 0),
		}
		err := rows.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats,
			&dish.Carbos, &dish.Image, &dish.Kind, &dish.Weight, &dish.Provider, &dish.Link, &dish.LinkImage, &dish.Price)
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

	args = []any{dishIDs}

	sql = `select id, title, dish_id
		from categories join dishes_categories on dishes_categories.category_id = categories.id
		where dish_id  = any($1)
		`

	if len(categoryIDs) > 0 {
		sql += ` and id = any($2)`
		args = append(args, categoryIDs)
	}

	rows, err = r.db.Query(context.Background(), sql, args...)
	if err != nil {
		log.Printf("failed to select categories with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	for rows.Next() {
		category := entity.Category{}
		var dishID int
		err := rows.Scan(&category.ID, &category.Title, &dishID)
		if err != nil {
			log.Printf("failed to scan category with %v\n", err)
			return make([]entity.Dish, 0), err
		}

		for index, dish := range dishes {
			if dish.ID == dishID {
				dishes[index].Categories = append(dishes[index].Categories, category)
			}
		}
	}

	return dishes, nil
}
