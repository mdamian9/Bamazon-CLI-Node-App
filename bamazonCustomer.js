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
    console.log(data + "\n");
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
        }
    ]).then(function (response) {
        // var itemIDNum = parseInt(response.itemID);
        console.log("ID of item: " + (response.itemID) + "\nItem name: " + data[response.itemID - 1].product_name);
    });
    connection.end();
});
