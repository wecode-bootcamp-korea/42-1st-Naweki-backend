-- migrate:up
CREATE TABLE products_options (
  id int PRIMARY KEY,
  stock int,
  product_id int,
  color_id int,
  size_id int,
  CONSTRAINT products_options_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT products_options_color_id_fk FOREIGN KEY (color_id) REFERENCES colors (id),
  CONSTRAINT products_options_size_id_fk FOREIGN KEY (size_id) REFERENCES size (id)
  );

-- migrate:down
DROP TABLE products_options;
