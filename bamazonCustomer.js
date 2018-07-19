// Require npm inquirer, npm mysql, and npm console.table packages
var inquirer = require("inquirer");
var mysql = require("mysql");
require("console.table");

// Create connection to mySQL database
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

// The shop() function is the main function that lets the user shop for an item.
var totalCost = 0;
function shop() {
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
                totalCost = totalCost + (data[indexOfItem].price * response.numUnits);
                // Should the mySQL file be updated? Or where is this update being procesed?
                connection.query("UPDATE items SET stock_quantity = ? WHERE item_id = ?", [stockQuantity - response.numUnits, response.itemID]);
                connection.query("SELECT * FROM items", function (err, data) {
                    if (err) throw err;
                    console.table(data);
                    if (response.numUnits > 1) {
                        console.log("Successfully bought " + response.numUnits + " units of *" + itemName + "*\nYour total is: $" + totalCost);
                    } else if (response.numUnits == 1) {
                        console.log("Successfully bought " + response.numUnits + " unit of *" + itemName + "*\nYour total is: $" + totalCost);
                    } else if (response.numUnits == 0){
                        console.log("No worries.");
                    };
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "doneShopping",
                            message: "Are you done shopping?",
                            choices: ["Yes", "No"]
                        }
                    ]).then(function (response) {
                        if (response.doneShopping === "Yes") {
                            console.log("Total at checkout: $" + totalCost + "\nThank you for shopping with us!");
                            connection.end();
                        } else {
                            shop();
                        };
                    });
                });
            } else {
                console.table(data);
                console.log("There are insufficient items in stock. Please review items.");
                connection.end();
            };
        });
    });
};

// Connect to mySQL connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId + "\n");
    // Call main function "shop()" to begin app
    shop();
});




