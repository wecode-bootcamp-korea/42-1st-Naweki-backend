-- migrate:up
CREATE TABLE colors (
  id int PRIMARY KEY,
  value varchar(255),
  product_id int
);

-- migrate:down
DROP TABLE colors;
