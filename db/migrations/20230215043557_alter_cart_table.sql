-- migrate:up
ALTER TABLE cart ADD CONSTRAINT `cart_user_product_uq` UNIQUE (user_id, product_id);