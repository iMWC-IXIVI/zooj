-- +goose Up
-- +goose StatementBegin

update dishes set image = 'dishes/1.png' where id = 1;
update dishes set image = 'dishes/2.png' where id = 2;
update dishes set image = 'dishes/3.png' where id = 3;
update dishes set image = 'dishes/4.png' where id = 4;
update dishes set image = 'dishes/5.png' where id = 5;
update dishes set image = 'dishes/6.png' where id = 6;
update dishes set image = 'dishes/7.png' where id = 7;
update dishes set image = 'dishes/8.png' where id = 8;
update dishes set image = 'dishes/9.png' where id = 9;
update dishes set image = 'dishes/10.png' where id = 10;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
