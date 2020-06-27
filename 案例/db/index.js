const mysql = require('mysql')
const db = mysql.createPool({
    password: 'xufei6841808',
    database: "users",
    host: '127.0.0.1',
    user: 'root',
})
module.exports = db