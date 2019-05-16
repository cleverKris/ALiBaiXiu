const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'alibaixiu'
});

//用户连接
connection.connect();

module.exports.query = (sql, callback) => {
    connection.query(sql, (err, result) => {
        if (err) {
            return console.log(err.message);
        }
        callback(result);
    });
    //关闭连接
    //connection.end();
};