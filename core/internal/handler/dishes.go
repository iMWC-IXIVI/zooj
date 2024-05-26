package handler

import (
	"errors"
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

	dishes, err := h.repo.GetDishes(page, pageSize)
	if err != nil {
		return err
	}
	log.Printf("dishes: %#v\n", dishes)

	return c.JSON(http.StatusOK, GetDishesResponse{Dishes: dishes})
}

func parsePaginationParams(c echo.Context) (page int, pageSize int, err error) {

	pageStr := c.QueryParam("page")
	pageSizeStr := c.QueryParam("pageSize")

	if pageStr == "" {
		pageStr = "1"
	}

	if pageSizeStr == "" {
		pageSizeStr = "10"
	}

	if strings.Contains(pageStr, "-") || strings.Contains(pageStr, "-") {
		log.Printf("Invaild page parameters")
		return 0, 0, errors.New("invalid page parameters")
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
