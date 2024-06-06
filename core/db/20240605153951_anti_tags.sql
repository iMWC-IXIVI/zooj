-- +goose Up
-- +goose StatementBegin

insert into dishes_tags(dish_id, tag_id)
values 
(1,5),(8,5),(9,5);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
