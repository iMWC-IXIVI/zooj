package handler

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetBasket(c echo.Context) error {
	uid := c.QueryParam("user_id")
	userID, err := strconv.Atoi(uid)
	if err != nil {
		return err
	}

	basket, err := h.repo.GetBasket(userID)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, basket)
}

func (h *Handler) CreateBasket(c echo.Context) error {
	did := c.QueryParam("dish_id")
	dishID, err := strconv.Atoi(did)
	if err != nil {
		return err
	}
	err = h.repo.CreateBasket(1, dishID)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}

func (h *Handler) DeleteBasket(c echo.Context) error {
	did := c.QueryParam("dish_id")
	dishID, err := strconv.Atoi(did)
	if err != nil {
		return err
	}
	err = h.repo.DeleteBasket(1, dishID)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}
