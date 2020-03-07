var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

const departments = ["Sales", "Engineering", "Finance", "Legal"];
const roles = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Accountant", "Legal Team Lead", "Lawyer"];
const managers = ["Emma Smith", "Bobby Hayes", "Lisa Brown", "Sam Taylor"]


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
                "Add department",
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
                    upEmployRole();
                    break;

                case "Add employee":
                    addEmploy();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add department":
                    addDepart();
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
            "Legal", 
            "HR"
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

function upEmployRole(){
    connection.query("SELECT id, first_name, last_name FROM employee", function(err, result) {
    if (err) throw err;
    const employeeName = [];
    for (let i = 0; i < result.length; i++) {
        const choices = (result[i].first_name + " " + result[i].last_name);
        employeeName.push(choices);
    }
    inquirer.prompt([{
                name: "employee",
                type: "list",
                message: "Which employee would you like to update?",
                choices: employeeName
            },
            {
                name: "newTitle",
                type: "list",
                message: "What is the employee's new role?",
                choices: ["Sales Lead",
                    "Salesperson",
                    "Lead Engineer",
                    "Software Engineer",
                    "Accountant",
                    "Legal Team Lead",
                    "Lawyer",
                    "Lead Engineer"
                ]
            }
        ])
        .then(function(answer) {
            const employeeName = answer.employee;
            if (answer.newTitle === "Sales Lead") {
                var roleID = "1";
            } else if (answer.newTitle === "Salesperson") {
                var roleID = "2";
            } else if (answer.newTitle === "Lead Engineer") {
                var roleID = "3";
            } else if (answer.newTitle === "Software Engineer") {
                var roleID = "4";
            } else if (answer.newTitle === "Accountant") {
                var roleID = "5";
            } else if (answer.newTitle === "Legal Team Lead") {
                var roleID = "6";
            } else if (answer.newTitle === "Lawyer") {
                var roleID = "7";
            } else if (answer.newTitle === "Lead Engineer") {
                var roleID = "8";
            }
            connection.query(`UPDATE employee SET ? WHERE ?`, [{
                        role_id: answer.roleID
                    },
                    {
                        id: answer.id
                    }
                ],
                function(err, ) {
                    if (err) throw err;

                })
        })
})
}

function addEmploy() {
    inquirer.prompt([{
        name: "first",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "last",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        name: "role",
        type: "list",
        message: "What is the employee's role?",
        choices: roles
    },
    {
        name: "man",
        type: "list",
        message: "Who is the employee's manager?",
        choices: managers
    }
]).then(function(answer) {
    if (answer.role === "Sales Lead") {
        var roleid = "5"
    } else if (answer.role === "Salesperson") {
        var roleid = "6"
    } else if (answer.role === "Lead Engineer") {
        var roleid = "7"
    } else if (answer.role === "Software Engineer") {
        var roleid = "8"
    } else if (answer.role === "Accountant") {
        var roleid = "9"
    } else if (answer.role === "Legal Team Lead") {
        var roleid = "10"
    } else if (answer.role === "Lawyer") {
        var roleid = "11"
    };
    if (answer.man === "Emma Smith") {
        var manid = "3"
    } else if (answer.man === "Bobby Hayes") {
        var manid = "1"
    } else if (answer.man === "Lisa Brown") {
        var manid = "6"
    } else if (answer.man === "Sarah Salvini") {
        var manid = "2"
    }
    connection.query(
        `INSERT INTO employee SET ?`, {
            first_name: answer.first,
            last_name: answer.last,
            role_id: roleid,
            manager_id: manid,
        },
        function(err) {
            if (err) throw err;
            console.log("Employee Added Successfully");
            viewAllEmployees();
        }
    )
})
}

function addRole(){
    inquirer.prompt([{
        name: "role",
        type: "input",
        message: "Which role would you like to add?"
    }, {
        name: "dept",
        type: "list",
        message: "Into which department would you like to assign this role?",
        choices: departments
    }, {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
    }])
    .then(function(answer) {
        if (answer.dept === "Sales") {
            var depID = "1"
        } else if (answer.dept === "Engineering") {
            var depID = "2"
        } else if (answer.dept === "Finance") {
            var depID = "3"
        } else if (answer.dept === "Legal") {
            var depID = "4"
        }
        connection.query(
            `INSERT INTO role SET ?`, {
                title: answer.role,
                salary: answer.salary,
                department_id: depID
            },
            function(err) {
                if (err) throw err;
                console.log("Role Created Successfully");
                viewRoles();
            }
        );

    })
}

function addDepart(){
    inquirer.prompt([{
        name: "dep",
        type: "input",
        message: "Which department would you like to add?"
    }])
    .then(function(answer) {
        connection.query(
            `INSERT INTO department SET ?`, {
                name: answer.dep,
            },
            function(err) {
                if (err) throw err;
                console.log("Department Created Successfully");
                departs()
            }
        )
    })
}