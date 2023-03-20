-- migrate:up
CREATE TABLE marts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  phone_number VARCHAR(200) NOT NULL,
  road_name_address VARCHAR(200) NOT NULL,
  description VARCHAR(500),
  latitude INT,
  longitude INT,
  region_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT marts_region_id_fkey FOREIGN KEY (region_id) REFERENCES regions(id)
)
-- migrate:down
DROP TABLE marts 
