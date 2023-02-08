-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `order_number` varchar(30),
  `user_id` int,
  `email` varchar(100) NOT NULL,
  `payment_method` varchar(30),
  `payment_amount` decimal(12, 2),
  `order_status_code_id` int,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT orders_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_order_number_uk UNIQUE (order_number)
);

-- migrate:down
DROP TABLE orders;
