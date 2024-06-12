package handler

import (
	"errors"
	"goauth/internal/entity"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

var ErrNoUser = errors.New("no user")

func (h *Handler) GetBasket(c echo.Context) error {
	user := c.Get("User")
	userInfo, ok := user.(entity.User)
	if !ok {
		return ErrNoUser
	}

	log.Printf("User id from token is: %v\n", userInfo)

	basket, err := h.repo.GetBasket(userInfo.ID)
	if err != nil {
		return err
	}

	ank := c.Get("Anketa")
	anketa, ok := ank.(entity.Anketa)
	if ok {
		basket.Kcal.Expected = float32(anketa.Calorie)
		basket.Fats.Expected = float32(anketa.Fats)
		basket.Proteins.Expected = float32(anketa.Protein)
		basket.Carbos.Expected = float32(anketa.Carbohydrates)
	}

	return c.JSON(http.StatusOK, basket)
}

func (h *Handler) CreateBasket(c echo.Context) error {
	did := c.QueryParam("dish_id")
	dishID, err := strconv.Atoi(did)
	if err != nil {
		return err
	}

	user := c.Get("User")
	userInfo, ok := user.(entity.User)
	if !ok {
		return ErrNoUser
	}

	err = h.repo.CreateBasket(userInfo.ID, dishID)
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

	user := c.Get("User")
	userInfo, ok := user.(entity.User)
	if !ok {
		return ErrNoUser
	}

	err = h.repo.DeleteBasket(userInfo.ID, dishID)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}
