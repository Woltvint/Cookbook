CREATE TABLE labels (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(255) NOT NULL
);


CREATE TABLE recept (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  img VARCHAR(45),
  labels_id VARCHAR(45),
  summary TEXT,
  ingredients_id VARCHAR(45),
  howTo TEXT,
  totalTime INT,
  servings INT,
  FOREIGN KEY (labels_id) REFERENCES labels(id)
);

CREATE TABLE ingredients (
  receprt_name VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  ingredient_values INT,
  units VARCHAR(45)
);

INSERT INTO labels (name)
VALUES ("snídaně"),("oběd"),("večeře"),("pití");

INSERT INTO recept (name, img, labels_id, summary, ingredients_id, howTo, totalTime, servings )
VALUES ("tortila","toritla.jpg","2,3","výborná tortila :d","mouka,voda,olej","smíchej a rozválej :D", 30, 2)

INSERT INTO ingredients (recept_id, name, ingredient_values, units)
VALUES ("tortila","mouka",100,"g"),("tortila","voda",50,"ml"),("tortila","olej",10,"ml"),

