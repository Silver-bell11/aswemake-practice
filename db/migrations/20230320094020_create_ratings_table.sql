-- migrate:up
CREATE TABLE ratings (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  rating INT,
  user_id INT NOT NULL,
  mart_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT ratings_mart_id_fkey FOREIGN KEY (mart_id) REFERENCES marts(id)
)
-- migrate:down
DROP TABLE ratings
