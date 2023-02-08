-- migrate:up
CREATE TABLE `orders_cart` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int COMMENT '카트 제품에 대한 수량',
  `user_size` int COMMENT '장바구니에서 유저가 상품에대해 입력한 사이즈',

  CONSTRAINT orders_cart_user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT orders_cart_product_id_fk FOREIGN KEY (product_id) REFERENCES products (id)
)

-- migrate:down
DROP TABLE orders_cart;
