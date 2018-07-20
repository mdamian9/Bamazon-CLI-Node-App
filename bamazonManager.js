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

// This function displays every available item to the manager: the item IDs, names, prices, and quantities.
function viewAllProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM items", function (err, data) {
        if (err) throw err;
        console.table(data);
        askIfDone();
    });
};

// This function displays all items with an inventory count lower than five to the manager.
function viewLowInventory() {
    connection.query("SELECT * FROM items WHERE stock_quantity < 5", function (err, data) {
        if (err) throw err;
        if (data == "") {
            console.log("Inventory stock is doing okay.\n");
        } else {
            console.log("Selecting all products low on inventory...\n");
            console.table(data);
        };
        askIfDone();
    });
};

// This function will display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM items", function (err, data) {
        if (err) throw err;
        console.table(data);
        inquirer.prompt([
            {
                type: "input",
                name: "itemID",
                message: "Enter the ID of the item you would like to add inventory to: ",
                validate: function validateItemID(name) {
                    return name !== '';
                }
            },
            {
                type: "input",
                name: "numUnits",
                message: "Enter the number of units you would like to add: ",
                validate: function validateNumUnits(name) {
                    return name !== '';
                }
            }
        ]).then(function (response) {
            var convertedNumUnits = parseInt(response.numUnits);
            var indexOfItem = response.itemID - 1;
            var itemName = data[indexOfItem].product_name;
            var stockQuantity = data[indexOfItem].stock_quantity;
            connection.query("UPDATE items SET stock_quantity = ? WHERE item_id = ?", [stockQuantity + convertedNumUnits, response.itemID]);
            connection.query("SELECT * FROM items", function (err, data) {
                if (err) throw err;
                console.table(data);
                if (convertedNumUnits > 1) {
                    console.log("Successfully added " + response.numUnits + " units of *" + itemName + " to inventory.\n");
                } else if (convertedNumUnits == 1) {
                    console.log("Successfully added " + response.numUnits + " unit of *" + itemName + "* to inventory.\n");
                } else if (convertedNumUnits == 0) {
                    console.log("Added zero units.\n");
                };
                askIfDone();
            });
        });
    });
};

// This function will allow the manager to add a completely new product to the store.
function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "Enter the name of the new item to add: "
        },
        {
            type: "input",
            name: "itemCategory",
            message: "Enter the category of the new item: "
        },
        {
            type: "input",
            name: "itemPrice",
            message: "Enter item price: "
        },
        {
            type: "input",
            name: "itemStock",
            message: "Enter the stock quantity of new item: "
        }
    ]).then(function (response) {
        connection.query("INSERT INTO items (product_name, department_name, price, stock_quantity) " +
            "VALUES (?, ?, ?, ?)", [response.itemName, response.itemCategory, parseFloat(response.itemPrice),
            parseFloat(response.itemStock)]);
        console.log("Selecting all products...\n");
        connection.query("SELECT * FROM items", function (err, data) {
            if (err) throw err;
            console.table(data);
            if (response.itemStock > 0) {
                console.log("Successfully added new item to inventory:\nName: " + response.itemName + "\nCategory: " +
                    response.itemCategory + "\nPrice: $" + response.itemPrice + "\nStock quantity: " + response.itemStock + "\n");
            } else {
                console.log("Nothing was added.\n");
            };
            askIfDone();
        });
    });
};

// This function asks the user if they are done with the manager app.
function askIfDone() {
    inquirer.prompt([
        {
            type: "list",
            name: "doneManaging",
            message: "Are you finished using the manager app?",
            choices: ["Yes", "No"]
        }
    ]).then(function (response) {
        if (response.doneManaging === "Yes") {
            console.log("Have a great day!\n");
            connection.end();
        } else {
            manage();
        };
    });
}

// This is the main function
function manage() {
    // Ask user for command to begin manager app
    inquirer.prompt([
        {
            type: "list",
            name: "command",
            message: "What would you like to do?",
            choices: ["View all products", "View low inventory", "Add to inventory", "Add new product"]
        }
    ]).then(function (response) {
        var userCommand = response.command;
        switch (userCommand) {
            case "View all products":
                viewAllProducts();
                break;
            case "View low inventory":
                viewLowInventory();
                break;
            case "Add to inventory":
                addToInventory();
                break;
            case "Add new product":
                addNewProduct();
                break;
        };
    });
};

// Connect to mySQL connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId + "\n");
    // Call main function "manage()" to begin app
    manage();
});
