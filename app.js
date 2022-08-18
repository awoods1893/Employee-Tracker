const mySQL = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const secureEnv = require('secure-env');
global.env = secureEnv({secret:'mySecretPassword'});

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

