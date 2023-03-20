-- migrate:up
CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  identification VARCHAR(200) NOT NULL,
  password VARCHAR(200) NOT NULL,
  birth VARCHAR(200) NOT NULL,
  phone_number VARCHAR(200) NOT NULL,
  gender VARCHAR(200) NOT NULL,
  refresh_token VARCHAR(200),
  flyer_registration_number INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
)

-- migrate:down
DROP TABLE users
