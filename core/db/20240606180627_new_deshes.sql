-- +goose Up
-- +goose StatementBegin
insert into dishes(id, title, weight, kcal, proteins, fats, carbos, image) 
values
(21, 'Оладьи со сгущенным молоком', 150, 346.5, 8.55, 11.55, 52, 'dishes/21.png');

alter table dishes 
add column kind integer;

update dishes set kind = 1 where id = 21;
update dishes set kind = 2 where id = 11;
update dishes set kind = 2 where id = 13;
update dishes set kind = 2 where id = 14;
update dishes set kind = 2 where id = 12;
update dishes set kind = 2 where id = 20;
update dishes set kind = 2 where id = 19;
update dishes set kind = 3 where id = 7;
update dishes set kind = 3 where id = 2;
update dishes set kind = 3 where id = 6;
update dishes set kind = 3 where id = 5;
update dishes set kind = 3 where id = 4;
update dishes set kind = 3 where id = 3;
update dishes set kind = 3 where id = 1;
update dishes set kind = 3 where id = 10;
update dishes set kind = 3 where id = 15;
update dishes set kind = 3 where id = 16;
update dishes set kind = 3 where id = 18;
update dishes set kind = 3 where id = 17;

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
