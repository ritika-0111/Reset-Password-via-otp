// MYSQL connection
const mysql = require('mysql');
// MySQL Setup
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'users',
    charset : 'utf8'
});

module.exports = db;
