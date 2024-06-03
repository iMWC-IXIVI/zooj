package handler

import (
	"errors"
	"fmt"
	"goauth/internal/entity"
	"goauth/internal/repo"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	repo *repo.Repo
}

func NewHandler(r *repo.Repo) Handler {
	return Handler{
		repo: r,
	}
}

type GetDishesResponse struct {
	Dishes []entity.Dish
}

func (h *Handler) GetDishes(c echo.Context) error {
	page, pageSize, err := parsePaginationParams(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	categoryIDs := parseCategoryIDs(c)

	dishes, err := h.repo.GetDishes(page, pageSize, categoryIDs)
	if err != nil {
		return err
	}
	for index, dish := range dishes {
		dishes[index].Image = "/api/v1/images/" + strconv.Itoa(dish.ID)
	}

	return c.JSON(http.StatusOK, GetDishesResponse{Dishes: dishes})
}

func parseCategoryIDs(c echo.Context) []int {
	categoryIDs := c.QueryParam("categories[]")
	catIDs := strings.Split(categoryIDs, ",")
	ids := make([]int, 0)
	for _, strID := range catIDs {
		if strID != "" {
			id, err := strconv.Atoi(strID)
			if err != nil {
				return make([]int, 0)
			}

			ids = append(ids, id)
		}
	}

	return ids
}

func (h *Handler) GetDishImage(c echo.Context) error {
	strDishID := c.Param("dish_id")
	dishID, err := strconv.Atoi(strDishID)
	if err != nil {
		return err
	}

	dish, err := h.repo.GetDish(dishID)
	if err != nil {
		return err
	}

	path := "./images/" + dish.Image
	fmt.Printf("dish is %#v+\n", dish)

	fmt.Printf("path is %v\n", path)
	return c.File(path)
}

func parsePaginationParams(c echo.Context) (page int, pageSize int, err error) {
	pageStr := c.QueryParam("page")
	pageSizeStr := c.QueryParam("pageSize")

	if pageStr == "" {
		pageStr = "1"
	}

	if pageSizeStr == "" {
		pageSizeStr = "100"
	}

	page, err = strconv.Atoi(pageStr)
	if err != nil {
		log.Printf("Invaild page parameters")
		return 0, 0, errors.New("invalid page parameters")
	}

	pageSize, err = strconv.Atoi(pageSizeStr)
	if err != nil {
		log.Printf("Invaild pageSize parameters")
		return 0, 0, errors.New("invalid pageSize parameters")
	}

	return page, pageSize, nil
}
