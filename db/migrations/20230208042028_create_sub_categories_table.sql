-- migrate:up
CREATE TABLE `sub_categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20),
  `category_id` int NOT NULL,

  CONSTRAINT sub_categories_category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id)
)

-- migrate:down
DROP TABLE sub_categories;
