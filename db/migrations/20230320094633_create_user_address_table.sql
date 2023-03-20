-- migrate:up
CREATE TABLE user_address (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT,
  zip_code INT NOT NULL,
  address VARCHAR(200) NOT NULL,
  detail_address VARCHAR(200),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT user_address_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
)

-- migrate:down
DROP TABLE user_address
