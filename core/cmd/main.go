package main

import (
	"context"
	"goauth/internal/handler"
	"goauth/internal/mdwr"
	"goauth/internal/repo"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	DB_URL := os.Getenv("DATABASE_URL")
	db, err := pgxpool.New(context.Background(), DB_URL)
	if err != nil {
		log.Fatalf("Не смогли подключится к бд:%v/n", err)
	}
	defer db.Close()

	r := repo.NewRepo(db)
	handler := handler.NewHandler(r)

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(mdwr.UserInfo)
	e.GET("/api/v1/catalog", handler.GetDishes)
	e.GET("/api/v1/images/:dish_id", handler.GetDishImage)

	e.GET("/api/v1/basket", handler.GetBasket)
	e.POST("/api/v1/basket", handler.CreateBasket)
	e.DELETE("/api/v1/basket", handler.DeleteBasket)

	e.Logger.Fatal(e.Start(":8080"))
}
