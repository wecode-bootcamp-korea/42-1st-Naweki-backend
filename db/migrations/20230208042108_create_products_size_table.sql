-- migrate:up
CREATE TABLE `products_size` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` int,
  `product_id` int NOT NULL,

   CONSTRAINT products_size_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE products_size;
