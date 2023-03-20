-- migrate:up
CREATE TABLE flyer_images (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  image_url VARCHAR(3000),
  flyer_id INT NOT NULL,
  CONSTRAINT flyer_images_flyer_id_fkey FOREIGN KEY (flyer_id) REFERENCES flyers(id)
)
-- migrate:down
DROP TABLE flyer_images
