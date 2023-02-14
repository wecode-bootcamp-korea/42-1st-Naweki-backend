-- migrate:up
CREATE TABLE `order_status` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `message` varchar(30),

  CONSTRAINT order_status_message_uk UNIQUE (message)
)

-- migrate:down
DROP TABLE order_status;
