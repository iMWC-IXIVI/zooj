-- +goose Up
-- +goose StatementBegin

create table dishes(
    id serial,
    title varchar(1000),
    kcal integer,
    proteins integer,
    fats integer,
    carbos integer,
    image varchar
);

create table ingredients(
    id serial,
    dish_id integer,
    number integer,
    title varchar(1000),
    weight integer
);
create index ingredients_dish_id on ingredients(dish_id);

create table steps(
    id serial,
    dish_id integer,
    number integer,
    description varchar(1000)
);

create table categories(
    id serial,
    title varchar(200)
);

create table dishes_categories(
    dish_id integer,
    category_id integer
);

create index dish_category_idx_dish on dishes_categories(dish_id);
create index dish_category_idx_cat on dishes_categories(category_id);

create table tags(
    id serial,
    title varchar(200)
);

create table dishes_tags(
    dish_id integer,
    tag_id integer
);

create index dishes_tags_dish on dishes_categories(dish_id);
create index dish_category_idx_tag on dishes_tags(tag_id);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table dishes;
drop table ingredients;
drop table steps;
drop table categories;
drop table dishes_categories;
drop table dishes_tags;
drop table tags;
-- +goose StatementEnd
