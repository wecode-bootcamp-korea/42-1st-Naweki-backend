-- migrate:up
CREATE TABLE `orders_status_codes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(10)
)

-- migrate:down
DROP TABLE orders_status_codes;
