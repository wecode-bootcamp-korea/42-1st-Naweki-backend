-- migrate:up
CREATE TABLE discount_season_sale (
  id int PRIMARY KEY,
  rate float,
  product_id int,

  CONSTRAINT discount_season_sale_product_id_uk UNIQUE (product_id)
);

-- migrate:down
DROP TABLE discount_season_sale;

