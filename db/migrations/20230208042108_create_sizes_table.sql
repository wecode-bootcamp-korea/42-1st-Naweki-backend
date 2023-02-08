-- migrate:up
CREATE TABLE `sizes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` varchar(20)
)

-- migrate:down
DROP TABLE sizes;
