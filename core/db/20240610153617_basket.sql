-- +goose Up
-- +goose StatementBegin
create table basket(
    user_id integer,
    dish_id integer
);

alter table dishes add column link  varchar(100);
alter table dishes add column link_image varchar(100);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
