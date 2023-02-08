-- migrate:up
CREATE TABLE `order_status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(30)
)

-- migrate:down
DROP TABLE order_status_codes;
