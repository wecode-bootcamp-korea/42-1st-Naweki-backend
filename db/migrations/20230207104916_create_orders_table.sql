-- migrate:up
CREATE TABLE orders (
  id int PRIMARY KEY,
  uuid varchar(255),
  user_id int,
  payment_method varchar(255),
  payment_amount decimal(10),
  order_status_code int,
  date_order_placed datetime,
  CONSTRAINT orders_uuid_uk UNIQUE (uuid),
  CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_order_status_code_fk FOREIGN KEY (order_status_code) REFERENCES orders_status_codes (id)
);

-- migrate:down
DROP TABLE orders;
