-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birthday` datetime NOT NULL,
  `password` varchar(100) NOT NULL,
  `shopping_preference` varchar(20) NOT NULL,
  `profile_image` varchar(20) NULL,
  `phone_number` varchar(20) NULL,
  `country` varchar(20) NOT NULL,
  `gender` varchar(20) NULL,
  `point` decimal(12, 2) NOT NULL DEFAULT 1000000,
  `primary_address` varchar(20) NULL,
  `secondary_address` varchar(20) NULL,
  `province` varchar(20) NULL,
  `city` varchar(20) NULL,
  `postal_code` varchar(20) NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT users_email_uk UNIQUE (email)
)

-- migrate:down
DROP TABLE users;
