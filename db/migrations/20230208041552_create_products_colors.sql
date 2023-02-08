-- migrate:up
CREATE TABLE `products_colors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` varchar(20),
  `product_id` int
);

-- migrate:down
DROP TABLE products_colors;
