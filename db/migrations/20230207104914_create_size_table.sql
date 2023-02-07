-- migrate:up
CREATE TABLE size (
  id int PRIMARY KEY,
  value int,
  product_id int,

  CONSTRAINT size_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
);

-- migrate:down
DROP TABLE size;
