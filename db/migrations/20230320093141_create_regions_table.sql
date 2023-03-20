-- migrate:up
CREATE TABLE regions (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(200)
)
-- migrate:down
DROP table regions
