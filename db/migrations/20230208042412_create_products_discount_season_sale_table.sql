-- migrate:up
CREATE TABLE `products_discount_season_sale` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `discount_rate` float,
  `product_id` int NOT NULL,

  CONSTRAINT products_discount_season_sale_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT products_discount_season_sale_product_id_uk UNIQUE (product_id)
)

-- migrate:down
DROP TABLE products_discount_season_sale;
