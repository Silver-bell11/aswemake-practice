-- migrate:up
CREATE TABLE opening_hours (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  mart_id INT NOT NULL,
  day VARCHAR(200),
  opening_hour VARCHAR(200),
  CONSTRAINT opening_hours_mart_id_fkey FOREIGN KEY (mart_id) REFERENCES marts(id)
)

-- migrate:down
DROP TABLE marts
