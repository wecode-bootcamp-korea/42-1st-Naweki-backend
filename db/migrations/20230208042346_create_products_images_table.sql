-- migrate:up
CREATE TABLE `products_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(20) NOT NULL,
  `is_thumbnail` boolean NOT NULL DEFAULT false,
  `product_id` int NOT NULL,

  CONSTRAINT products_images_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE products_images;
