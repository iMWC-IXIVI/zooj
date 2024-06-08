-- +goose Up
-- +goose StatementBegin
update dishes set weight=400 where weight is null;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
