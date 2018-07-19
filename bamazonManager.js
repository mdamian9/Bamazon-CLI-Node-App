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

// This is the main function
function manage() {

}

// This function displays every available item to the manager: the item IDs, names, prices, and quantities.
function viewAllProducts() {

};

// This function displays all items with an inventory count lower than five to the manager.
function viewLowInventory() {

};

// This function will display a prompt that will let the manager "add more" of any item currently in the store.
function addToInventory() {

};

// This function will allow the manager to add a completely new product to the store.
function addNewProduct() {

};
