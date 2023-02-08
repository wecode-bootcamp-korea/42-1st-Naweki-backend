-- migrate:up
CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL COMMENT '이름',
  `last_name` varchar(20) NOT NULL COMMENT '성',
  `email` varchar(20) NOT NULL COMMENT 'unique',
  `thumbnail` varchar(20),
  `phone_number` varchar(20) NOT NULL,
  `gender` varchar(20),
  `birthday` datetime NOT NULL COMMENT '생년월일',
  `point` decimal(10) NOT NULL DEFAULT 0,
  `primary_address` varchar(20) NOT NULL COMMENT '도로명 주소',
  `secondary_address` varchar(20) COMMENT '상세 주소',
  `province` varchar(20) NOT NULL COMMENT '도',
  `city` varchar(20),
  `postal_code` varchar(20) NOT NULL,
  `country` varchar(20) NOT NULL COMMENT '국가',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

   CONSTRAINT users_email_uk UNIQUE (email)
)

-- migrate:down
DROP TABLE users;
