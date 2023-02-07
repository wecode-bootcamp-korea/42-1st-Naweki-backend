-- migrate:up
CREATE TABLE products (
  id int PRIMARY KEY,
  name varchar(20) NOT NULL,
  price float NOT NULL DEFAULT 0,
  description text,
  uuid int NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  category_id int,

  CONSTRAINT products_category_id_fk FOREIGN KEY (category_id) REFERENCES categories (id)
);

-- migrate:down
DROP TABLE products;