-- migrate:up
CREATE TABLE users (
  id int PRIMARY KEY,
  first_name varchar(10) NOT NULL,
  last_name varchar(10) NOT NULL,
  email varchar(20) NOT NULL,
  password varchar(20) NOT NULL,
  thumbnail varchar(64),
  phone_number varchar(20) NOT NULL,
  gender varchar(10),
  birthday datetime NOT NULL,
  point decimal(10) NOT NULL DEFAULT 0,
  primary_address varchar(20) NOT NULL,
  secondary_address varchar(20),
  province varchar(20) NOT NULL,
  city varchar(20) NOT NULL,
  postal_code varchar(20) NOT NULL,
  country varchar(20) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  CONSTRAINT users_email_uk UNIQUE (email)
);

-- migrate:down
DROP TABLE users;