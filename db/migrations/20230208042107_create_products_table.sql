-- migrate:up
CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `description` text,
  `style_id` int NOT NULL COMMENT 'DC3967-010, 스타일 넘버',
  `sub_menu_id` int,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT products_sub_menu_id_fk FOREIGN KEY (sub_menu_id) REFERENCES products_sub_menu (id),
   CONSTRAINT products_style_id_uk UNIQUE (style_id)
)

-- migrate:down
DROP TABLE products;
