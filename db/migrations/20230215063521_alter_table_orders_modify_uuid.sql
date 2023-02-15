-- migrate:up
ALTER TABLE orders MODIFY COLUMN order_number varchar(300);