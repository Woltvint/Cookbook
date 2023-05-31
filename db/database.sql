CREATE TABLE labels (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  units VARCHAR(45)
);

CREATE TABLE recept (
  id INT AUTO_INCREMENT PRIMARY KEY,
  img BLOB,
  labels_id INTEGER,
  summary TEXT,
  ingredients_id VARCHAR(45),
  name VARCHAR(255),
  howTo TEXT,
  totalTime BIGINT,
  servings BIGINT,
  FOREIGN KEY (labels_id) REFERENCES labels(id),
  FOREIGN KEY (ingredients_id) REFERENCES ingredients(id)
);


