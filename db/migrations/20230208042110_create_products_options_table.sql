-- migrate:up
CREATE TABLE `products_options` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `qunatity` int,
  `product_id` int NOT NULL,
  `color_id` int NULL,
  `size_id` int NULL,

  CONSTRAINT products_options_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT products_options_color_id_fk FOREIGN KEY (color_id) REFERENCES colors (id),
  CONSTRAINT products_options_size_id_fk FOREIGN KEY (size_id) REFERENCES sizes (id)
)

-- migrate:down
DROP TABLE products_options;
