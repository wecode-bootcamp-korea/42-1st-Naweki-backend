-- migrate:up
CREATE TABLE `products` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `price` decimal(12, 2) NOT NULL DEFAULT 0,
  `description` text,
  `style_code` varchar(20) NOT NULL,
  `sub_category_id` int,
  `discount_rate` float NULL,
  `thumbnail_image` varchar(300) NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT products_sub_category_id_fk FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id),
   CONSTRAINT products_style_id_uk UNIQUE (style_code)
)

-- migrate:down
DROP TABLE products;
