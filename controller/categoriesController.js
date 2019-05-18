//引入数据库文件
const categoriesdb = require('../model/categoriesdb');

module.exports = {
    //获取静态页面
    categories: (request, response) => {
        response.render('categories', {});
    },
    //重新渲染所有文章数据
    categoriesData: (request, response) => {
        categoriesdb.query('SELECT * FROM categories', (err, result) => {
            if (err) {
                return response.send('出错了');
            }
            response.send({
                data: result,
                status: 200,
                msg: '重新渲染成功'
            });
        })
    },
    //删除对应的文章分类目录
    delCate: (request, response) => {
        //获取参数
        let id = request.query.id;
        //执行sql语句
        categoriesdb.query(`DELETE FROM categories WHERE id=${id}`, (err, result) => {
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
        });
    },
    //添加文章分类
    addCate: (request, response) => {
        //获取参数
        let addSql = `INSERT INTO categories (name,slug) VALUES ('${request.body.name}','${request.body.slug}')`;
        categoriesdb.query(addSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '添加成功'
            })
        })
    },
    //编辑渲染对应的分类信息
    getEditCate: (request, response) => {
        //获取参数
        let id = request.query.id;
        categoriesdb.query(`SELECT * FROM categories WHERE id = ${id}`, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错了'
                })
            }
            response.send({
                data: result[0],
                status: 200,
                msg: '获取数据成功'
            })
        });

    },
    //修改对应的文章分类
    editCate: (request, response) => {
        let editSql = `UPDATE categories SET name='${request.body.name}',slug='${request.body.slug}' WHERE id = ${request.body.id}`;
        categoriesdb.query(editSql, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '修改成功'
            })
        });
    },
    //批量删除
    delCates: (request, response) => {
        //console.log(request.body); //{ id: [ '4', '18' ] }
        let ids = request.body.id.join(',');  //4,18

        //执行sql语句
        categoriesdb.query(`DELETE FROM categories WHERE id in(${ids})`, (err, result) => {
            if (err) {
                response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '批量删除成功'
            });
        });
    }
};