-- migrate:up
CREATE TABLE `products_reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` varchar(20) NOT NULL,
  `rating` float,
  `order_item_id` int,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT products_reviews_order_id_fk FOREIGN KEY (order_item_id) REFERENCES order_items (id)
)

-- migrate:down
DROP TABLE products_reviews;
