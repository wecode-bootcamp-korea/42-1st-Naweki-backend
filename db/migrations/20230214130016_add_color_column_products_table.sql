-- migrate:up
ALTER TABLE products ADD COLUMN color varchar(15) AFTER style_code;

