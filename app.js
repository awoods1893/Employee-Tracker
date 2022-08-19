const mySQL = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

let secureEnv = require('secure-env');
global.env = secureEnv({secret:''}); //password obfuscated in the code but it works in the video. I also didn't upload the enc.env file to github


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
            case 'EXIT': 
                exitApp();
                    break;
            default:
                    break;
        }
    })
};

//all employees in the database
function employeeView() {
    var query = 'SELECT * FROM employee';
    sqlConnection.query(query, function(err, res){
        if(err)throw err;
        console.table('All Employees:', res);
        options();
    })
};

//all roles in the database
function rolesView(){
    var query = 'SELECT * FROM role';
    sqlConnection.query(query, function(err, res){
        if(err)throw err;
        console.table('All Roles:', res);
        options();
    })
};

//all departments in the database
function departmentView() {
    var query = 'SELECT * FROM department';
    sqlConnection.query(query, function(err, res){
        if(err) throw err;
        console.table('All Departments:', res);
        options();
    })
};

//adding an employee
function employeeAdd(){
    sqlConnection.query('SELECT * FROM role', function (err, res){
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: "What is the employee's first name?",
                },

                {
                    name: 'last_name',
                    type: 'input',
                    message: "What is the employee's last name?",
                },

                {
                    name: 'manager_id',
                    type: 'input',
                    message: `What is the employee's manager's ID number?`,
                },

                {
                    name: 'role',
                    type: 'list',
                    choices: function(){
                        var roleArray = [];
                        for (let i=0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },
                    message: `What is this employee's role?`
                }
                
                
            ]).then(function(answer){
                let role_id;
                for(let a=0; a < res.length; a++){
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                sqlConnection.query(
                    'INSERT INTO employee SET ?',
                    {
                        first_name : answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id : role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Employee Added!');
                        options();
                    })
                
            })
    })
};

function roleAdd(){
    sqlConnection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: `What is the role's salary?`
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArray = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArray.push(res[i].name);
                    }
                    return deptArray;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
            sqlConnection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('Role Added!');
                    console.table('All Roles:', res);
                    options();
                })
        })
    })
};

function departmentAdd() {
    inquirer
        .prompt([
            {
                name: 'newDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                sqlConnection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
                var query = 'SELECT * FROM department';
                sqlConnection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Department Added!');
                console.table('All Departments:', res);
                options();
                })
            })
};

function exitApp(){
    sqlConnection.end();
};
