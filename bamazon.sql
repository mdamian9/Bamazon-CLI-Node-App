DROP DATABASE IF EXISTS bamazonSeedsDB;

CREATE DATABASE bamazonSeedsDB;

USE bamazonSeedsDB;

CREATE TABLE items (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NULL,
  department_name VARCHAR(50) NULL,
  price FLOAT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Doom", "Video Games", 14.99, 100), 
("Uncharted 4", "Video Games", 12.99, 100), 
("Final Fantasy XV", "Video Games", 19.99, 100), 
("Ace Predator Helios 300", "Computers", 999.99, 100), 
("Dell Inspiron 15", "Computers", 499.99, 100), 
("Soccer Ball", "Sports", 10.99, 100), 
("Baseball Bat", "Sports", 6.99, 100),
("LG Refrigerator", "Appliances", 600.99, 100), 
("Kenmore Dishwasher", "Appliances", 300.99, 100),
("HTML & CSS", "Books", 14.99, 100), 
("JavaScript & jQuery", "Books", 14.99, 100), 
("Mini Security Safe", "Safes", 20.99, 100), 
("Jumbo Security Safe", "Safes", 49.99, 100), 
("Hawaiian T-Shirt", "Clothing", 10.99, 100), 
("V-Neck T-Shirt", "Clothing", 11.99, 100), 
("Claw Hammer", "Hand Tools", 9.99, 100), 
("Hand Wrench", "Hand Tools", 7.99, 100), 
("Pulp Fiction", "Movies", 7.99, 100),
("Snatch", "Movies", 6.99, 100),
("The Hateful Eight", "Movies", 10.99, 100);

SELECT * FROM `items`;
