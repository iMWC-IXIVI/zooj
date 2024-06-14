-- +goose Up
-- +goose StatementBegin

update dishes set image = 'dishes/1.svg' where id = 1;
update dishes set image = 'dishes/2.svg' where id = 2;
update dishes set image = 'dishes/3.svg' where id = 3;
update dishes set image = 'dishes/4.svg' where id = 4;
update dishes set image = 'dishes/5.svg' where id = 5;
update dishes set image = 'dishes/6.svg' where id = 6;
update dishes set image = 'dishes/7.svg' where id = 7;
update dishes set image = 'dishes/10.svg' where id = 10;
update dishes set image = 'dishes/11.svg' where id = 11;
update dishes set image = 'dishes/12.svg' where id = 12;
update dishes set image = 'dishes/13.svg' where id = 13;
update dishes set image = 'dishes/14.svg' where id = 14;
update dishes set image = 'dishes/15.svg' where id = 15;
update dishes set image = 'dishes/16.svg' where id = 16;
update dishes set image = 'dishes/17.svg' where id = 17;
update dishes set image = 'dishes/18.svg' where id = 18;
update dishes set image = 'dishes/19.svg' where id = 19;
update dishes set image = 'dishes/20.svg' where id = 20;
update dishes set image = 'dishes/21.svg' where id = 21;


-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
