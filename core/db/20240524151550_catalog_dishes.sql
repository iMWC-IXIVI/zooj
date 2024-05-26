-- +goose Up
-- +goose StatementBegin
insert into dishes(id, title, kcal, proteins, fats, carbos) values(
    1, 'Гуляш из говядины с отварным картофелем и витаминным салатом', 630, 38, 28, 56
);

insert into ingredients(dish_id, number, title, weight) values
(1, 1, 'Гуляш из говядины', 180),
(1, 2, 'Картофель отварной в мундире', 200),
(1, 3, 'Сметана для картофеля', 20),
(1, 4, 'Салат (капуста, морковь, укроп)', 260),
(1, 5, 'Масло для жарки и салата', 10);

insert into steps(dish_id, number, description) values
(1, 1, 'Обжарьте в кастрюле измельченный лук и чеснок. Добавьте говядину и обжарьте до румяной корочки. Добавьте паприку, томатную пасту и перемешайте. Влейте говяжий бульон и готовьте гуляш на слабом огне 1,5-2 часа.'),
(1, 2, 'Отварите картофель с кожурой. Слейте воду и добавьте немного сливочного масла, сметаны и укропа.'),
(1, 3, 'Нарежьте салат и подавайте.');

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
delete from dishes where id = 1;
delete from ingredients where dish_id = 1;
delete from steps where dish_id = 1;
-- +goose StatementEnd
