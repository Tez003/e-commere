const mysql = require('mysql2');

const conn_pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'system',
    database:'store',
    
})

module.exports = conn_pool.promise();