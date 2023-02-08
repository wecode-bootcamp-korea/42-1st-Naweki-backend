-- migrate:up
CREATE TABLE `products_sub_menu` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `main_menu_id` int,

  CONSTRAINT products_sub_menu_main_menu_id_fk FOREIGN KEY (main_menu_id) REFERENCES products_main_menu (id)
)

-- migrate:down
DROP TABLE products_sub_menu;
