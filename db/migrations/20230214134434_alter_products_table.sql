-- migrate:up
ALTER TABLE products ADD COLUMN gender varchar(20) AFTER color;
