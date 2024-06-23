package handler

import (
	"encoding/json"
	"errors"
	"goauth/internal/entity"
	"goauth/internal/repo"
	"io"
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
	Dishes   []entity.Dish `json:"dishes"`
	AntiTags []entity.Tag  `json:"anti_tag"`
}

func (h *Handler) GetDishes(c echo.Context) error {
	page, pageSize, err := parsePaginationParams(c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	categoryIDs := parseCategoryIDs(c)
	antiTagIDs := parseAntiTags(c)
	onlyFavorites := parseFavorites(c)
	halfDishes := parseHalfDishes(c)

	var favIDs []int
	if onlyFavorites {
		favIDs = getFavorites(c)
	}

	dishes, err := h.repo.GetDishes(page, pageSize, categoryIDs, antiTagIDs, favIDs, halfDishes)
	if err != nil {
		return err
	}
	for index, dish := range dishes {
		dishes[index].Image = "/api/v1/images/" + strconv.Itoa(dish.ID)

		for idx, halfDish := range dish.HalfDishes {
			dish.HalfDishes[idx].Image = "/api/v1/images/" + strconv.Itoa(dish.ID) + "?half_dish_id=" + strconv.Itoa(halfDish.ID)
		}
	}

	antiTags, err := h.repo.GetAntiTags()
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, GetDishesResponse{Dishes: dishes, AntiTags: antiTags})
}

type favData struct {
	Favorite []int `json:"favorite"`
}

func getFavorites(c echo.Context) []int {
	token := c.Get("Token")
	if token == "" {
		return []int{}
	}

	client := &http.Client{}

	url := "http://django-core:8000/api/favorite/"

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("failed to build get user request with %v\n", err)
		return []int{}
	}

	req.Header.Add("Authorization", token.(string))
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("failed to do a request with err %v\n", err)
		return []int{}
	}

	if resp.StatusCode == 200 {
		bytes, err := io.ReadAll(resp.Body)

		log.Printf("response is %v\n", string(bytes))

		fData := favData{}
		err = json.Unmarshal(bytes, &fData)
		if err != nil {
			log.Printf("failed to unmarshal auth response with %v\n", err)
		}
		return fData.Favorite
	}

	return []int{}
}

func parseFavorites(c echo.Context) bool {
	onlyFavs := c.QueryParam("favorites")
	return onlyFavs == "true"
}

func parseHalfDishes(c echo.Context) bool {
	halfDishes := c.QueryParam("half_dishes")
	return halfDishes == "true"
}

func parseCategoryIDs(c echo.Context) []int {
	categoryIDs := c.QueryParam("categories")
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

func parseAntiTags(c echo.Context) []int {
	tagsIDs := c.QueryParam("anti_tags")
	tagIDs := strings.Split(tagsIDs, ",")
	ids := make([]int, 0)
	for _, strID := range tagIDs {
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

	strHalfDishID := c.QueryParam("half_dish_id")
	if strHalfDishID != "" {
		halfDishID, err := strconv.Atoi(strHalfDishID)
		if err != nil {
			return err
		}

		for _, hd := range dish.HalfDishes {
			if hd.ID == halfDishID {
				path := "./images/" + hd.Image
				return c.File(path)
			}
		}
	}

	path := "./images/" + dish.Image
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
