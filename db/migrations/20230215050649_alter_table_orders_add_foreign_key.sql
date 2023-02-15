-- migrate:up
ALTER TABLE orders RENAME COLUMN order_status_code_id TO order_status_id;
ALTER TABLE orders ADD CONSTRAINT orders_order_status_id_fk FOREIGN KEY (order_status_id) REFERENCES order_status (id);
