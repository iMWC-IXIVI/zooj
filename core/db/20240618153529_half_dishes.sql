-- +goose Up
-- +goose StatementBegin

create table half_dishes(
    id serial primary key,
    dish_id integer,
    title varchar(1000),
    weight integer,
    kcal integer,
    proteins integer,
    fats integer,
    carbos integer,
    image varchar,
    price numeric,
    position bool
);


insert into half_dishes(id, dish_id, title, weight, kcal, proteins, fats, carbos, image, price, position) 
values
(1,2,  'Фарш с луком, фасолью и орехами', 200, 481, 34, 28, 24, 'dishes/2_1.png', 250, true),
(2,2,  'Овощной салат', 200, 119, 2, 7, 12, 'dishes/2_2.png', 200, false),

(3,7,  'Куриная грудка с яйцами и рисом', 240, 308, 39, 9, 26, 'dishes/7_1.png', 250, true),
(4,7,  'Ростки сои и красная капуста', 160, 102, 4, 2, 17, 'dishes/7_2.png', 200, false),

(5,6,  'Печень с гречкой', 120, 414, 37, 16, 29, 'dishes/6_1.png', 250, true),
(6,6,  'Помидоры с кинзой', 280, 65, 3, 1, 11, 'dishes/6_2.png', 200, false),
(7,10,  'Куриная грудка с печёным картофелем', 255, 271, 23, 11, 20, 'dishes/10_1.png', 250, true),
(8,10,  'Салат', 145, 99, 3, 7, 6, 'dishes/10_2.png', 200, false);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
