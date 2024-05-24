package handler

import (
	"goauth/internal/entity"
	"goauth/internal/repo"
	"log"
	"net/http"

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
	dishes, err := h.repo.GetDishes()
	if err != nil {
		return err
	}
	log.Printf("dishes: %#v\n", dishes)

	return c.JSON(http.StatusOK, GetDishesResponse{Dishes: dishes})
}
