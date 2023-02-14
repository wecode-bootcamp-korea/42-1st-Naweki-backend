-- migrate:up
CREATE TABLE `shipping_address` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `last_name` varchar(20) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `primary` varchar(20) NOT NULL,
  `secondary` varchar(20) NULL,
  `province` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `zone` varchar(20) NULL,
  `postal_code` varchar(20) NOT NULL,
  `phone_number` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `is_default` boolean NOT NULL DEFAULT false,
  `user_id` int NOT NULL,

   CONSTRAINT users_shipping_address_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
)

-- migrate:down
DROP TABLE shipping_address;
