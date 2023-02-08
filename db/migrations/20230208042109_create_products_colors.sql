-- migrate:up
CREATE TABLE `products_colors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` varchar(20),
  `product_id` int NOT NULL,

  CONSTRAINT products_colors_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE products_colors;
