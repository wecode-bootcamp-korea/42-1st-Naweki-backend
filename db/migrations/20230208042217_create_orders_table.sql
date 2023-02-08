-- migrate:up
CREATE TABLE `orders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `uuid` varchar(20) COMMENT 'UNIQUE',
  `user_id` int,
  `email` varchar(20) NOT NULL,
  `payment_method` varchar(20) COMMENT '결제수단',
  `payment_amount` decimal(10) COMMENT '결제 금액',
  `order_status_code_id` int,
  `date_order_placed` datetime
);

-- migrate:down
DROP TABLE orders;
