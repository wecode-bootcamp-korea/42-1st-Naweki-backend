-- migrate:up
CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` float NOT NULL DEFAULT 0,
  `description` text,
  `uuid` int NOT NULL COMMENT 'DC3967-010, 스타일 넘버',
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp COMMENT 'on update now()',
  `sub_menu_id` int,

   CONSTRAINT products_sub_menu_id_fk FOREIGN KEY (sub_menu_id) REFERENCES products_sub_menu (id)
)

-- migrate:down
DROP TABLE products;
