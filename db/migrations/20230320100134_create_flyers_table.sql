-- migrate:up
CREATE TABLE flyers (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  mart_id INT NOT NULL,
  user_id INT NOT NULL,
  flyer_status_id INT,
  end_date VARCHAR(200),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT flyers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT flyers_mart_id_fkey FOREIGN KEY (mart_id) REFERENCES marts(id),
  CONSTRAINT flyers_flyer_status_id_fkey FOREIGN KEY (flyer_status_id) REFERENCES flyer_status(id)
)
-- migrate:down
DROP TABLE flyers
