-- migrate:up 
CREATE TABLE favorites (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  mart_id INT NOT NULL,
  favorites_status Boolean,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT favorites_mart_id_fkey FOREIGN KEY (mart_id) REFERENCES marts(id)
)
  
-- migrate:down
DROP TABLE favorites
