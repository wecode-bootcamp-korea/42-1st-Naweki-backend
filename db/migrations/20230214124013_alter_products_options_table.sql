-- migrate:up
ALTER TABLE products_options DROP FOREIGN KEY `products_options_color_id_fk`;
ALTER TABLE products_options DROP COLUMN color_id;
