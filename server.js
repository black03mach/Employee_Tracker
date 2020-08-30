const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("console.table");
const PasswordPrompt = require("inquirer/lib/prompts/password");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Ls3@1234",
    database: "ep_track"
});

connection.connect(function (err) {
    if (err) throw err;
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
                "Update Managers",
                "View Employee by Manager",
                "Remove Employee",
                "Remove Role",
                "Remove Dept",
                "View Budget by Department",
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
                case "Update Managers":
                    updateMang();
                    break;
                case "View Employee by Manager":
                    empByMgr();
                    break;
                case "Remove Employee":
                    removeEmp();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Remove Dept":
                    removeDept();
                    break;
                case "View Budget by Department":
                    viewBudget();
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
    connection.query("SELECT * FROM role", function (data) {
        inquirer.prompt([
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
        ]).then(response) {
            console.log(response);
            var roleNum = "";
            for (var i = 0; i < response.length; i++) {
                if (response[i].title === answer.role) {
                    roleNum = response[i].id
                }
            } connection.query("INSERT INTO employee SET ?",
                {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role_id: roleNum
                }, {
                start();
            });
        }
    })
}