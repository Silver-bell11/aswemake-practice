-- migrate:up
CREATE TABLE account_status (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  status VARCHAR(200)
)

-- migrate:down
DROP TABLE account_status
