-- migrate:up
CREATE TABLE `colors` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `value` varchar(20)
);

-- migrate:down
DROP TABLE colors;
