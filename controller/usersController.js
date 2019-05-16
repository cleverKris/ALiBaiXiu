//引入users页面需要的数据 usersdb.js
const usersdb = require('../model/usersdb');

//渲染静态页面
module.exports = {
    //渲染页面和数据
    getUsers: (request, response) => {
        usersdb.query('SELECT * FROM users', result => {
            //调用ejs中的render方法
            response.render('users', {
                result: result //查询时,返回的是一个数组 [RowDataPacket{},RowDataPacket{}]
            });
        })
    },
    //添加用户数据
    postAddUsers: (request, response) => {
        //接收参数 使用body-parser
        //执行sql语句
        let addSql = `INSERT INTO users (slug,email,password,nickname,status) VALUES ('${request.body.slug}','${request.body.email}','${request.body.password}','${request.body.nickname}','activated')`;
        usersdb.query(addSql, result => {
            response.send({
                status: 200,
                msg: '新增用户成功'
            });
        });
    },
    //渲染所有用户的列表信息
    getAllUsers: (request, response) => {
        let allSql = `SELECT * FROM users`;
        usersdb.query(allSql, result => {
            response.send({
                data: result,
                status: 200,
                msg: '数据获取成功'
            });
        });
    },
    //删除指定的用户数据
    delUser: (request, response) => {
        //获取参数
        let id = request.query.id;
        //执行sql语句
        let delSql = `DELETE FROM users WHERE id = ${id}`;
        usersdb.query(delSql, result => {
            response.send({
                status: 200,
                msg: '删除成功'
            });
        })
    }
};