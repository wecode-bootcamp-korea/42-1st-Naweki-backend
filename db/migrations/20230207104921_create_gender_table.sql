-- migrate:up
CREATE TABLE gender (
  id int PRIMARY KEY,
  name varchar(255),
  products_id int,

  CONSTRAINT gender_products_id_fk FOREIGN KEY (products_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE gender;
