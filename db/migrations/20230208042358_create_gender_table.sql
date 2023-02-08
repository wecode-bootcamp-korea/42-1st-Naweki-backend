-- migrate:up
CREATE TABLE `gender` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `product_id` int NOT NULL,

  CONSTRAINT gender_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE gender;
