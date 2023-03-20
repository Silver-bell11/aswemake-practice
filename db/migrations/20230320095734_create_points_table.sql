-- migrate:up
CREATE TABLE points (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  point DECIMAL(10,2),
  point_status_id INT,
  user_id INT NOT NULL,
  account_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT points_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT points_account_id_fkey FOREIGN KEY (account_id) REFERENCES accounts(id)
)

-- migrate:down
DROP TABLE points
