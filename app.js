const mySQL = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPassword = "SA@!$SDdfgFU%564$FSCVS"

//async hashing and encryption function for password security
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPassword, salt, function(err, hash) {
    });
});

//creating the connection to the mysql database
const sqlConnection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'myuser',
    password: myPassword,
    database: 'employees_db',
})

//connecting to the database
sqlConnection.connect(function(err){
    if (err) throw err;
    options();
})

