-- migrate:up
CREATE TABLE accounts (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(200),
  account_bank VARCHAR(200),
  account_number VARCHAR(200),
  account_status_id INT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT accounts_account_status_id_fkey FOREIGN KEY (account_status_id) REFERENCES account_status(id)
)
-- migrate:down
DROP TABLE accounts
