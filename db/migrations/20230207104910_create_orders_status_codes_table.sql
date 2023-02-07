-- migrate:up
CREATE TABLE orders_status_codes (
  id int PRIMARY KEY,
  description text
);

-- migrate:down
DROP TABLE orders_status_codes;
