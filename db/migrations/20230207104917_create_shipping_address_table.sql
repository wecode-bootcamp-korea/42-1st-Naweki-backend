-- migrate:up
CREATE TABLE shipping_address (
  id int PRIMARY KEY,
  last_name varchar(20) NOT NULL,
  first_name varchar(20) NOT NULL,
  main_address varchar(20) NOT NULL,
  sub_address varchar(20) NULL,
  province varchar(20) NOT NULL,
  city varchar(20) NOT NULL,
  zone varchar(20),
  postal_code varchar(20) NOT NULL,
  phone_number varchar(20) NOT NULL,
  country varchar(20) NOT NULL,
  isDefault boolean NOT NULL DEFAULT false,
  user_id int NOT NULL,

  CONSTRAINT shipping_address_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down

DROP shipping_address;
