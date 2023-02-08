-- migrate:up
CREATE TABLE `products_stock` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `qunatity` int,
  `color_id` int NOT NULL,
  `size_id` int NOT NULL,

  CONSTRAINT products_stock_color_id_fk FOREIGN KEY (color_id) REFERENCES products_colors (id),
  CONSTRAINT products_stock_size_id_fk FOREIGN KEY (size_id) REFERENCES products_size (id)
)

-- migrate:down
DROP TABLE products_stock;
