const db = require('./db');
module.exports = {
    query: db.query,
    //登录验证的数据库操作
    loginPostData: (email, callback) => {
        let sql = `SELECT password FROM users WHERE email = '${email}'`;
        db.query(sql, (err, result) => {
            callback(err, result);
        });
    }

};