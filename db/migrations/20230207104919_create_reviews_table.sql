-- migrate:up
CREATE TABLE reviews (
  id int PRIMARY KEY,
  title varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  rating float,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  order_id int,

  CONSTRAINT reviews_order_id_fk FOREIGN KEY (order_id) REFERENCES order_items(id)
);

-- migrate:down
DROP TABLE reviews;
