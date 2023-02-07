-- migrate:up
CREATE TABLE cart (
  id int PRIMARY KEY,
  user_id int,
  product_id int,
  size int,
  quantity int,

  CONSTRAINT cart_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE cart;
