var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Marileheide8!",
  database: "employee_DB"
});

connection.connect(function(err) {
    if (err) {
      console.log(err);
    }
    console.log("connection id", connection.threadId);
    menu();
  });


function options() {
    inquirer
      .prompt({
        name: "optionList",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View All employees by deparment",
            "View all employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update employee manager",
            "View all roles",
            "Add role",
            "Remove role"
        ]
      })
      .then(function(answer) {
          console.log(answer.optionList)
        switch (answer.optionList) {
        case "View all employees":
          viewAllEmployees();
          break;
  
        case "View All employees by deparment":
          
          break;
  
        case "View all employees by manager":
          
          break;
  
        case "Add employee":
          
          break;
  
        case "Remove employee":
          
          break;

        case "Update employee role":
          
          break;

        case "Update employee manager":
          
          break;
  
        case "View all roles":
          
          break;

        case "Add role":
          
          break;

        case "Remove role":
          
          break;
        }
      });
  }

function viewAllEmployees(){
    var query = "SELECT * FROM employee";
    connection.query(query, { employee: answer.employee }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id);
        }
        options();
      });
}