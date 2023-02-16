-- migrate:up
ALTER TABLE cart CHANGE size size_id int NOT NULL;
ALTER TABLE cart ADD CONSTRAINT `cart_size_id_fk` FOREIGN KEY (size_id) REFERENCES sizes (id);