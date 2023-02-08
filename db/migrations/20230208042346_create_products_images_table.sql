-- migrate:up
CREATE TABLE `products_images` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `url` varchar(300) NOT NULL,
  `product_id` int NOT NULL,

  CONSTRAINT products_images_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE products_images;
