// Require mysql and inquirer npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// connection for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

// Enter password to root here. 
  password: "",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  console.log("connected as id " + connection.threadId + "\n");
  managerOptions();
});

function managerOptions() {
  console.log("Welcome Bamazon manager!\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer.prompt({
      type: "list",
      name: "manager_menu",
      message: "Please select what you would like to do:\n",
      choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product"]
    })
    .then(function(answer) {
      if (answer.manager_menu === "View products for sale") {
      	console.log("Viewing list of products for sale:\n");
        for (var i=0; i< res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + "$" + res[i].price + " || quantity: " + res[i].stock_quantity);
  	    }
      }
      if (answer.manager_menu === "View low inventory") {
      	console.log("Viewing low inventory:\n");
      	for (var j=0; j<res.length; j++) {
      		// console.log(res[j].stock_quantity)
      	  if (res[j].stock_quantity <=5) {
            console.log("Item ID: " + res[j].item_id + " || Product: " + res[j].product_name + " || Price: " + "$" + res[j].price + " || quantity: " + res[j].stock_quantity);
      	  } 
        }
      }
      if (answer.manager_menu === "Add to inventory") {
      	console.log("Add to inventory...\n");
      }	
      if (answer.manager_menu === "Add a new product") {
      	console.log("Add a new product...\n");
      }	
    })
  })
}