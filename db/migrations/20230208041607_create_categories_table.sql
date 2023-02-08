-- migrate:up
CREATE TABLE `categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20)
);

-- migrate:down
DROP TABLE categories;
