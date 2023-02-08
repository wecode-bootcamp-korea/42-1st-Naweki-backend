-- migrate:up
CREATE TABLE `reviews` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `rating` float,
  `order_item_id` int,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT reviews_order_id_fk FOREIGN KEY (order_item_id) REFERENCES order_items (id)
)

-- migrate:down
DROP TABLE reviews;
