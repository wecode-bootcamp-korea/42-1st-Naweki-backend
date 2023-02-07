-- migrate:up
CREATE TABLE order_item_status_codes (
  id int PRIMARY KEY,
  description varchar(255)
);

-- migrate:down
DROP TABLE order_item_status_code;
