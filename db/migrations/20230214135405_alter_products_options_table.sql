-- migrate:up
ALTER TABLE products_options DROP FOREIGN KEY `products_options_gender_id_fk`;
ALTER TABLE products_options DROP COLUMN gender_id;
