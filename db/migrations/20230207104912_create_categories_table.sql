-- migrate:up
CREATE TABLE categories (
  id int PRIMARY KEY,
  name varchar(255),
  menu_id int,

  CONSTRAINT categories_menu_id_fk FOREIGN KEY (menu_id) REFERENCES main_menu (id)
);

-- migrate:down
DROP TABLE categories;
