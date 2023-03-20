-- migrate:up
CREATE TABLE flyer_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status VARCHAR(200)
)

-- migrate:down
DROP TABLE flyer_status
