const db = require('./db');

module.exports = {
    query: db.query,
    //响应个人中心页面
    profile: (id, callback) => {
        db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
            callback(err, result);
        })
    },
    //修改个人信息
    //更新个人信息:别名 昵称 图片 说明
    updateProfile: (obj, callback) => {
        let updateSql = `UPDATE users SET slug='${obj.slug}',nickname='${obj.nickname}',bio='${obj.bio}',avatar='${obj.avatar}' WHERE id = ${obj.id}`;
        db.query(updateSql, (err, result) => {
            callback(err, result);
        })
    }
};

// const mysql = require('mysql');
//
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'alibaixiu'
// });
//
// //用户连接
// connection.connect();
//
// module.exports.query = (sql, callback) => {
//     connection.query(sql, (err, result) => {
//         if (err) {
//             return callback(err, null);  //将错误信息交给了回调函数
//         }
//         callback(null, result); //将result也交给了回调函数
//     });
//     //关闭连接
//     //connection.end();
// };