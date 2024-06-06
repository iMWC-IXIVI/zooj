-- +goose Up
-- +goose StatementBegin
alter table dishes add weight numeric;

insert into dishes(id, title, weight, kcal, proteins, fats, carbos, image) 
values
(11, 'Борщ "Вегетарианский"', 390, 344, 6.2, 13.3, 49.9, 'dishes/11.png'),
(12, 'Суп "Рассольник с курицей"', 390, 174.3, 13.2, 9, 10.1, 'dishes/12.png'), 
(13, 'Суп "Рассольник" вегетарианский с грибами и сельдереем', 270, 96.4, 12.7, 1.4, 18.4, 'dishes/13.png'),
(14, 'Суп "Том ям" вегетарианский', 270, 200.6, 3.8, 11.6, 20.2, 'dishes/14.png'),
(15, 'Салат винегрет с маринованной капустой', 180, 198.4, 3.8, 10.4, 22.3, 'dishes/15.png'),
(16, 'Салат "Коул Слоу" из овощей', 140, 158, 1.7, 12.9, 8.8, 'dishes/16.png'),
(17, 'Смузи "Банан, киви, шпинат"', 300, 132, 0, 0, 33, 'dishes/17.png'),
(18, 'Смузи "Манго, апельсин, маракуйя"', 300, 132, 0, 0, 33, 'dishes/18.png'),
(19, 'Смузи "Банан, клубника"', 300, 135, 0, 0, 33, 'dishes/19.png'),
(20, 'Смузи "Томат, сельдерей, кинза"', 300, 72, 0, 0, 18, 'dishes/20.png');

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
