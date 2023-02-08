-- migrate:up
CREATE TABLE `products_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(20) NOT NULL,
  `is_thumbnail` boolean NOT NULL DEFAULT false,
  `product_id` int
)

-- migrate:down
DROP TABLE products_images;
