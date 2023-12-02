const config = require('../../config');

// 连接数据库，并根据环境选择不同配置
const dbConfig = config[process.env.NODE_ENV].database;
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

const db = pool.promise();

module.exports = db
