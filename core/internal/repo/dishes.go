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

	dish := entity.Dish{
		HalfDishes: make([]entity.HalfDish, 0),
	}
	err := row.Scan(&dish.ID, &dish.Title, &dish.Kcal, &dish.Proteins, &dish.Fats, &dish.Carbos, &dish.Image, &dish.Kind)
	if err != nil {
		return dish, err
	}

	sql = "select id, dish_id, title, weight, kcal, proteins, fats, carbos, image, price, position from half_dishes where dish_id = $1"
	rows, err := r.db.Query(context.Background(), sql, dish.ID)
	if err != nil {
		log.Printf("failed to load half dishes with %v\n", err)
		return dish, err
	}

	for rows.Next() {
		hd := entity.HalfDish{}
		var position bool
		err := rows.Scan(&hd.ID, &hd.DishID, &hd.Title, &hd.Weight, &hd.Kcal, &hd.Proteins, &hd.Fats, &hd.Carbos, &hd.Image, &hd.Price, &position)
		if err != nil {
			log.Printf("failed to scan half dishes")
		}

		if position {
			hd.Left = true
			hd.Right = false
		} else {
			hd.Left = false
			hd.Right = true
		}

		dish.HalfDishes = append(dish.HalfDishes, hd)
	}

	return dish, nil
}

func (r *Repo) GetDishes(page int, pageSize int, categoryIDs, tagIDs []int, ids []int, halfDishes bool) ([]entity.Dish, error) {
	dishes := make([]entity.Dish, 0)

	offset := (page - 1) * pageSize

	sql := `select id, title, kcal, proteins, fats, carbos, image, coalesce(kind, 0), coalesce(weight, 400), 
			provider, link, link_image, price from dishes`
	args := []any{pageSize, offset}

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

	if len(ids) > 0 {
		key := len(args) + 1
		wheres = append(wheres, " id = any($"+strconv.Itoa(key)+")")
		args = append(args, ids)
	}

	if halfDishes {
		wheres = append(wheres, " exists (select 1 from half_dishes where dish_id = dishes.id)")
	}

	if len(wheres) > 0 {
		sql += " where "
	}

	sql += strings.Join(wheres, " and ")
	sql += " order by id LIMIT $1 OFFSET $2"

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
			HalfDishes:  make([]entity.HalfDish, 0),
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

	sql = "select id, dish_id, title, weight, kcal, proteins, fats, carbos, image, price, position from half_dishes where dish_id = any($1)"
	rows, err = r.db.Query(context.Background(), sql, dishIDs)
	if err != nil {
		log.Printf("failed to load half dishes with %v\n", err)
		return make([]entity.Dish, 0), err
	}

	for rows.Next() {
		hd := entity.HalfDish{}
		var position bool
		err := rows.Scan(&hd.ID, &hd.DishID, &hd.Title, &hd.Weight, &hd.Kcal, &hd.Proteins, &hd.Fats, &hd.Carbos, &hd.Image, &hd.Price, &position)
		if err != nil {
			log.Printf("failed to scan half dishes")
		}

		if position {
			hd.Left = true
			hd.Right = false
		} else {
			hd.Left = false
			hd.Right = true
		}

		for index, dish := range dishes {
			if dish.ID == hd.DishID {
				dishes[index].HalfDishes = append(dishes[index].HalfDishes, hd)
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
