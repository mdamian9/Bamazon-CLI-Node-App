DROP DATABASE IF EXISTS bamazonSeedsDB;

CREATE DATABASE bamazonSeedsDB;

USE bamazonSeedsDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  itemName VARCHAR(50) NULL,
  category VARCHAR(50) NULL,
  price FLOAT NULL,
  PRIMARY KEY (id)
);

-- Starting items list
-- INSERT INTO items (itemName, category, price)
-- VALUES ("Laptop", "Electronics", 300.99), ("Honda Civic '04", "Automobile", 2000.99), ("PS4", "Electronics", 195.50), 
-- ("Refrigerator", "Appliances", 600.99);