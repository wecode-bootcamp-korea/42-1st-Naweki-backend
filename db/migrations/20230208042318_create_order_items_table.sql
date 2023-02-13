-- migrate:up
CREATE TABLE `order_items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `quantity` int,
  `price` float,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_status_id` int NOT NULL,

  CONSTRAINT order_items_order_id_fk FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT order_items_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id),
  CONSTRAINT order_items_order_status_id_fk FOREIGN KEY (order_status_id) REFERENCES order_status (id)
)

-- migrate:down
DROP TABLE order_items;
