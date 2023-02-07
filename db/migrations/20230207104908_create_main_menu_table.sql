-- migrate:up
CREATE TABLE main_menu (
  id int PRIMARY KEY,
  name varchar(255)
);

-- migrate:down
DROP TABLE main_menu;
