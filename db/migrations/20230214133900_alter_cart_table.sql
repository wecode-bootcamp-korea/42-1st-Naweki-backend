-- migrate:up
ALTER TABLE cart ADD COLUMN product_id int NOT NULL AFTER user_id;
ALTER TABLE cart ADD CONSTRAINT `cart_product_id_fk` FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE cart ADD COLUMN size varchar(20) NOT NULL AFTER product_id;
ALTER TABLE cart DROP FOREIGN KEY `cart_product_options_id`;
ALTER TABLE cart DROP COLUMN product_options_id;

