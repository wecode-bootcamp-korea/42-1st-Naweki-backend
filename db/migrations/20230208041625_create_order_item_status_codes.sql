-- migrate:up
CREATE TABLE `order_item_status_codes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(10)
)

-- migrate:down
DROP TABLE order_item_status_codes;
