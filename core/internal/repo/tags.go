package repo

import (
	"context"
	"goauth/internal/entity"
)

func (r *Repo) GetAntiTags() ([]entity.Tag, error) {
	tags := []entity.Tag{}

	sql := `select id, title from tags;`

	rows, err := r.db.Query(context.Background(), sql)
	if err != nil {
		return tags, err
	}

	for rows.Next() {
		tag := entity.Tag{}
		rows.Scan(&tag.ID, &tag.Title)

		tags = append(tags, tag)
	}

	return tags, nil
}
