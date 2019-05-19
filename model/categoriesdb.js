const db = require('./db');

module.exports = {
    query: db.query,
    //重新渲染页面的数据库操作
    categoriesData: callback => {
        db.query('SELECT * FROM categories', (err, result) => {
            callback(err, result);
        })
    },
    //删除对应的文章分类目录
    delCate: (id, callback) => {
        db.query(`DELETE FROM categories WHERE id=${id}`, (err, result) => {
            callback(err, result);
        })
    },
    //添加的数据库操作
    addCate: (obj, callback) => {
        //获取参数
        let addSql = `INSERT INTO categories (name,slug) VALUES ('${obj.name}','${obj.slug}')`;
        db.query(addSql, (err, result) => {
            callback(err, result);
        })
    },
    //编辑渲染对应的分类信息
    getEditCate: (id, callback) => {
        db.query(`SELECT * FROM categories WHERE id = ${id}`, (err, result) => {
            callback(err, result);
        })

    },
    //修改对应的文章分类
    editCate: (obj, callback) => {
        let editSql = `UPDATE categories SET name='${obj.name}',slug='${obj.slug}' WHERE id = ${obj.id}`;
        db.query(editSql, (err, result) => {
            callback(err, result);
        })
    },
    //批量删除操作数据库
    delCates: (ids, callback) => {
        //执行sql语句
        db.query(`DELETE FROM categories WHERE id in(${ids})`, (err, result) => {
            callback(err, result);
        });
    }

};

//-------------------------------------封装db.js之前的代码------------------------------------------------------
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