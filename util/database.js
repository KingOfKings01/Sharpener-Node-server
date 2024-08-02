const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'KingOfKings',
    database: 'test_db'
})

module.export = pool.promise()