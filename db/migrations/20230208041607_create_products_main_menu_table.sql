-- migrate:up
CREATE TABLE `products_main_menu` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20)
);

-- migrate:down
DROP TABLE products_main_menu;
