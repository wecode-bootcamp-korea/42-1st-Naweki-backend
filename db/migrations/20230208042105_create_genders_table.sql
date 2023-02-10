-- migrate:up
CREATE TABLE `genders` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `type` varchar(20)
)

-- migrate:down
DROP TABLE genders;
