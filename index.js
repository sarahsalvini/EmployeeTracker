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

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    console.log("connection id", connection.threadId);
    options();
});


function options() {
    inquirer
        .prompt({
            name: "optionList",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "View employees by deparment",
                "Update employee role",
                "Update employee manager",
                "Add employee",
                "Add role",
                "Remove role",
                "Remove employee"
            ]
        })
        .then(function (answer) {
            console.log(answer.optionList)
            switch (answer.optionList) {
                case "View all employees":
                    viewAllEmployees();
                    break;

                case "View All employees by deparment":
                    employeesDepart();
                    break;

                case "View all departments":
                    departs();
                    break;

                case "View all roles":
                    viewRoles();
                    break;

                case "Update employee role":

                    break;

                case "Update employee manager":

                    break;

                case "Add employee":
            
                    break;

                case "Add role":

                    break;
                
                case "Remove employee":

                    break;

                case "Remove role":

                    break;
            }
        });
}

function viewAllEmployees() {
    var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager `
    query += "FROM employee LEFT JOIN role ON employee.role_id = role.id ";
    query += "LEFT JOIN department ON department.id = role.department_id ";
    query += "LEFT JOIN employee AS manager ON manager.id = employee.manager_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        options()
    })
}

function employeesDepart() {
    inquirer.prompt({
        name: "departments",
        type: "list",
        message: "Please select the department of the employee",
        choices: ["Sales",
            "Engineering",
            "Finance",
            "Legal"
        ]
    }).then(function (answer) {
        const department = answer.departments;
        var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary `
        query += `FROM employee LEFT JOIN role ON employee.role_id = role.id `;
        query += `LEFT JOIN department ON role.department_id = department.id WHERE department.name="${department}"`;
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res)
            options()
        })
    })
}

function departs(){
    var query = `SELECT department.id, department.name FROM department`
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        options()
    })
}

function viewRoles(){
    var query = `SELECT role.id, role.title, role.salary, department.name as department FROM role
                 LEFT JOIN department ON role.department_id = department.id`
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res)
        options()
    })
}