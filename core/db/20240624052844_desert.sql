-- +goose Up
-- +goose StatementBegin

insert into dishes_categories(dish_id, category_id)
values
(21,6),(22,6),(23,6),(24,6),(25,6),(26,6);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
