const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ls3@1234",
    database: "ep_track"
});

connection.connect(function () {
    start()
});

const start = () => {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "Please choose one of the following:",
            choices: [
                "View all Employees",
                "View all Depts",
                "View all Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Role",
                "Remove Employee",
                "Exit",
            ]
        }).then(function (data) {
            switch (data.menu) {
                case "View all Employees":
                    viewAll();
                    break;
                case "View all Depts":
                    viewDept();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Department":
                    addDept();
                    break;
                case "Add Role":
                    addRole()
                    break;
                case "Update Role":
                    updateRole();
                    break;
                case "Remove Employee":
                    removeEmp();
                    break;
                case "Exit":
                    exit();
                    break;
            };
        });
};

// View all employees:
const viewAll = function () {
    connection.query("SELECT * FROM employee", function (data) {
        console.table(data);
        start();
    })
};

// View all departments
const viewDept = function () {
    connection.query("SELECT * FROM department", function (data) {
        console.table(data);
        start();
    })
};
// View all roles
const viewRoles = function () {
    connection.query("SELECT * FROM role", function (data) {
        console.table(data);
        start();
    })
};

// Add employee

const addEmployee = function () {
    connection.query("SELECT * FROM role", function (err, data) {
        inquirer
            .prompt([
                {
                    name: "first_name",
                    type: "input",
                    message: "Please enter the new employee's first name."
                },
                {
                    name: "last_name",
                    type: "input",
                    message: "Please enter the new employee's last name."
                },
                {
                    name: "role",
                    type: "list",
                    choices: function () {
                        var roles = [];
                        for (var i = 0; i < data.length; i++) {
                            roles.push(data[i].title);
                        } return roles;
                    },
                    message: "Please enter the new employee's role."
                },
            ]).then(function (response) {
                console.log(response);
                var roleNum = "";
                for (var i = 0; i < response.length; i++) {
                    if (response[i].title === response.role) {
                        roleNum = response[i].id
                    }
                } connection.query("INSERT INTO employee SET ?",
                    {
                        first_name: response.first_name,
                        last_name: response.last_name,
                        role_id: roleNum
                    },
                    {
                        function() {
                            start();
                        }
                    });
            }
            );
    });
}

const addDept = function () {
    inquirer
        .prompt([
            {
                name: "new_dept",
                type: "input",
                message: "please enter the department you would like to add."
            }
        ]).then(function (response) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: response.new_dept
                }
            );
            start();

        })
};

const addRole = function () {
    connection.query("SELECT * FROM department", function (err, data) {
        console.log(data);
        inquirer
            .prompt([
                {
                    name: "role",
                    type: "input",
                    message: "Please enter the role you would like to add."
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Please enter the salary of this role."
                },
                {
                    name: "department_id",
                    type: "list",
                    choices: function () {
                        var roles = [];
                        for (var i = 0; i < data.length; i++) {
                            roles.push(data[i].id + ". " + data[i].name);
                        } return roles;
                    },
                    message: "Please select the department this role belongs to."
                }
            ]).then(function (response) {
                console.log(response);
                connection.query(
                    "INSERT INTO role SET ?",
                    {
                        title: response.role,
                        salary: response.salary,
                        department_id: (response.department_id).slice(0, 1),
                    }, function (err, data) {
                        if (err)
                            console.log(err);
                        else
                            console.log(response);
                    }
                );
                start();

            })
    })
};

const updateRole = function () {
    connection.query("SELECT * FROM role", function (err, data) {
        console.log(data);
        inquirer
            .prompt([
                {
                    name: "roleChoice",
                    type: "list",
                    choices: function () {
                        var roles = [];
                        for (var i = 0; i < data.length; i++) {
                            roles.push(data[i].id + ". Role: " + data[i].title + " - Salary: " + data[i].salary + " - Department ID: " + data[i].department_id);
                        } return roles;
                    },
                    message: "Please select the role you want to edit"
                },
                {
                    name: "role",
                    type: "input",
                    message: "What are you changing this title to?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What is the new salary of this role?"
                },
                {
                    name: "department_id",
                    type: "input",
                    message: "what is the new department ID of this role?"
                }
            ]).then(function (response) {
                connection.query(
                    "UPDATE role SET ? WHERE ?",
                    [
                        {
                            title: response.role,
                            salary: response.salary,
                            department_id: response.department_id
                        },
                        {
                            id: (response.roleChoice).slice(0, 1),
                        }
                    ]
                    , function (err, data) {
                        if (err)
                            console.log(err);
                        else
                            console.log(data);
                    }
                );
                start();

            })
    })
};

const removeEmp = function () {
    let employees = [];
    connection.query("SELECT first_name FROM employee", function (req, res) {
        // console.log(res);
        for (i = 0; i < res.length; i++) {
            employees.push(res[i].first_name);
        }
        // console.log(employees);
        inquirer
            .prompt([{
                name: "xEmp",
                type: "list",
                message: "Choose which employee to terminate.",
                choices: employees
            }
            ]).then(data => {
                console.log(data.xEmp);
                connection.query("DELETE FROM employee WHERE ?",
                    {
                        first_name: data.xEmp
                    }, function (err, data) {
                        if (err)
                            console.log(err);
                        else
                            console.log(data);
                    })
                start();
            });
    })
};

const exit = function () {
    connection.end;
}
