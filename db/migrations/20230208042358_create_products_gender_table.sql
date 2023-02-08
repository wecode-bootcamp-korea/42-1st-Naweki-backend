-- migrate:up
CREATE TABLE `products_gender` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `product_id` int,

  CONSTRAINT products_gender_products_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE products_gender;
