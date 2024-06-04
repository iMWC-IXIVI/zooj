-- +goose Up
-- +goose StatementBegin

insert into categories(title) 
values ('Блюда по методу'),('Супы'),('Салаты'),('Напитки'),('Снеки'),('Десерты');

insert into dishes_categories(dish_id, category_id)
values
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 2), (12, 2), (13, 2), (14, 2),
(15, 3), (16, 3),
(17, 4), (18, 4), (19, 4), (20, 4),
(17, 6), (18, 6), (19, 6), (20, 6);

insert into tags(title)
values ('Сахар'),('Лактоза'),('Глютен'),('Орехи'),('Чеснок'),('Мясо');

insert into dishes_tags(dish_id, tag_id)
values 
(2,4),(10,4),
(5,5),
(1,6),(2,6),(3,6),(4,6),(5,6),(6,6),(7,6),(8,6),(9,6),(10,6),(12,6);


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
