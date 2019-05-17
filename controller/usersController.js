//引入users页面需要的数据 usersdb.js
const usersdb = require('../model/usersdb');

//渲染静态页面
module.exports = {
    //渲染页面和数据
    getUsers: (request, response) => {
        usersdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return response.send('出错了');
            }

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
        usersdb.query(addSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '新增用户成功'
            });
        });
    },
    //渲染所有用户的列表信息
    getAllUsers: (request, response) => {
        let allSql = `SELECT * FROM users`;
        //此时query方法中的回调函数 应该有两个参数 一个是err  一个是result
        usersdb.query(allSql, (err, result) => {
            //如何判断参数是否存在
            if (err) { //等价于 callback(err,null)
                return response.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            //能走到这里 说明没有错误 等价于 callback(null,result)
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
        usersdb.query(delSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                });
            }
            response.send({
                status: 200,
                msg: '删除成功'
            });
        })
    },
    //获取修改对应的用户
    getEdituser: (request, response) => {
        let id = request.query.id;

        let editSql = `SELECT * FROM users WHERE id=${id}`;

        usersdb.query(editSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '查询成功',
                data: result[0] //id 对应的用户对象
            })
        })

    },
    //修改用户信息
    postEditUser: (request, response) => {
        //接收参数
        // console.log(request.body);

        let editUserSql = `UPDATE user SET email='${request.body.email}',nickname='${request.body.nickname}',password='${request.body.password}' WHERE id = ${request.body.id}`;
        usersdb.query(editUserSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '修改成功'
            });
        })
    },
    //批量删除
    delUsers: (request, response) => {
        //post请求 参数放在请求体中
        //console.log(request.body); //{ id: [ '16', '17' ] }
        let ids = request.body.id.join(','); //16,17

        //执行sql语句
        let delsSql = `DELETE FROM users WHERE id in (${ids})`;
        usersdb.query(delsSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            response.send({
                status: 200,
                msg: '批量删除成功'
            });
        })

    }
};