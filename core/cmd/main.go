package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	e.GET("/api/v1/catalog", func(c echo.Context) error {
		return c.JSON(http.StatusOK, echo.Map{"message": "hello"})
	})

	e.Logger.Fatal(e.Start(":8080"))
}
