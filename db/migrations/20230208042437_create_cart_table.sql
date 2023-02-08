-- migrate:up
CREATE TABLE `cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_options_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT cart_product_options_id FOREIGN KEY (product_options_id) REFERENCES products_options (id),
  CONSTRAINT cart_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE orders_cart;
