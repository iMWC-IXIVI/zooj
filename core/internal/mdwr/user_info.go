package mdwr

import (
	"encoding/json"
	"errors"
	"goauth/internal/entity"
	"io"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type authResponse struct {
	User   entity.User   `json:"user"`
	Anketa entity.Anketa `json:"anketa"`
}

var errUserDataFailed = errors.New("failed to load user data")

func getUserData(token string) (authResponse, error) {
	client := &http.Client{}
	userData := authResponse{}

	url := "http://django-core:8000/api/get-user"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("failed to build get user request with %v\n", err)
		return userData, err
	}

	req.Header.Add("Authorization", token)
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("failed to do a request with err %v\n", err)
		return userData, err
	}

	if resp.StatusCode == 200 {
		defer resp.Body.Close()

		bytes, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("failed to parse auth response with %v\n", err)
			return userData, err
		}

		err = json.Unmarshal(bytes, &userData)
		if err != nil {
			log.Printf("failed to unmarshal auth response with %v\n", err)
			return userData, err
		}

		return userData, nil
	}

	return userData, errUserDataFailed
}

func UserInfo(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		tokens := c.Request().Header["Authorization"]
		if len(tokens) == 0 {
			return next(c)
		}

		token := tokens[0]

		if token != "" {
			userData, err := getUserData(token)

			if err != nil {
				return next(c)
			}

			c.Set("User", userData.User)
			c.Set("Anketa", userData.Anketa)

		}
		return next(c)
	}
}
