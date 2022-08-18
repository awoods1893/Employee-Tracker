const mySQL = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const secureEnv = require('secure-env');


//creating the connection to the mysql database
const sqlConnection = mySQL.createConnection({
    host: global.env.DB_HOST,
    port: global.env.DB_PORT,
    user: global.env.DB_USER,
    password: global.env.DB_PASS,
    database: 'employees_db',
})

//connecting to the database
sqlConnection.connect(function(err){
    if (err) throw err;
    options();
})

function options() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Welcome to the employee database! Please choose an option.',
        choices: [
            'View all employees',
            'View all departments',
            'View all roles',
            'Add an employee',
            'Add a department',
            'Add a role',
            "Update employee role",
            'Delete an employee',
            'Exit',
        ]
    }).then (function (answer){
        switch (answer.action){
            case 'View all employees':
                employeeView();
                break;
            case 'View all departments':
                departmentView();
                break;
            case 'View all roles':
                rolesView();
                break;
            case 'Add an employee':
                employeeAdd();
                break;
            case 'Add a department':
                departmentAdd();
                break;
            case 'Add a role':
                roleAdd();
                break;
            case 'Update employee role':
                roleUpdate();
                    break;
            case 'Delete an employee':
                employeeDelete();
                    break;
            case 'EXIT': 
                exitApp();
                    break;
            default:
                    break;
        }
    })
}