const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'alibaixiu',
    //允许mysql第三方包 同时执行多条sql语句
    multipleStatements: true
});

//用户连接
connection.connect();

module.exports.query = (sql, callback) => {
    connection.query(sql, (err, result) => {
        if (err) {
            return callback(err, null);  //将错误信息交给了回调函数
        }
        callback(null, result); //将result也交给了回调函数
    });
    //关闭连接
    //connection.end();
};