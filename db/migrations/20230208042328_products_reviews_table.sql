-- migrate:up
CREATE TABLE `products_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` varchar(20) NOT NULL,
  `rating` float,
  `created_at` timestamp DEFAULT (now()),
  `updated_at` timestamp COMMENT 'on update now()',
  `order_id` int,

  CONSTRAINT products_reviews_order_id_fk FOREIGN KEY (order_id) REFERENCES order_items (id)
)

-- migrate:down
DROP TABLE products_reviews;
