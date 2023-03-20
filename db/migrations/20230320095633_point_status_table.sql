-- migrate:up
CREATE TABLE point_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status VARCHAR(200)
)

-- migrate:down
DROP TABLE point_status
