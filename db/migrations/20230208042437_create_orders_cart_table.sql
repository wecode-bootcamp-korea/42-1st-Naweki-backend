-- migrate:up
CREATE TABLE `orders_cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `product_id` int,
  `size` int COMMENT '카트 제품에 대한 사이즈',
  `quantity` int COMMENT '카트 제품에 대한 수량',

  CONSTRAINT orders_cart_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE orders_cart;
