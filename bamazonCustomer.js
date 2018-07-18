// Require npm inquirer, npm mysql, and npm console.table packages
var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

// Create connection
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonSeedsDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId + "\n");
});

console.log("Selecting all products...\n");
connection.query("SELECT * FROM items", function (err, data) {
    if (err) throw err;
    console.table(data);
    // Main prompt for user to choose item to buy
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "Enter the ID of the item you would like to purchase: ",
            validate: function validateItemID(name) {
                return name !== '';
            }
        },
        {
            type: "input",
            name: "numUnits",
            message: "Enter the number of units you would like to buy: ",
            validate: function validateNumUnits(name) {
                return name !== '';
            }
        }
    ]).then(function (response) {
        var indexOfItem = response.itemID - 1;
        var itemName = data[indexOfItem].product_name;
        var stockQuantity = data[indexOfItem].stock_quantity;
        if (stockQuantity >= response.numUnits) {
            var totalCost = data[indexOfItem].price * response.numUnits;
            // Should the mySQL file be updated? Or where is this update being procesed?
            connection.query("UPDATE items SET stock_quantity = ? WHERE item_id = ?", [stockQuantity - response.numUnits, response.itemID]);
            connection.query("SELECT * FROM items", function (err, data) {
                if (err) throw err;
                console.log("Successfully bought " + response.numUnits + " units of " + itemName + "\nYour total is: $" + totalCost);
                console.table(data);
                connection.end();
            });
        } else {
            console.log("There are insufficient items in stock. Please review items: ");
            console.table(data);
            connection.end();
        };
    });
});
