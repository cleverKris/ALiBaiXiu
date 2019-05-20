//引入数据库文件
const categoriesdb = require('../model/categoriesdb');

module.exports = {
    //获取静态页面
    categories: (request, response) => {
        //传入nickname
        response.render('categories', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        });
    },
    //重新渲染所有文章数据
    categoriesData: (request, response) => {
        //request.body 是一个对象
        categoriesdb.categoriesData((err, result) => {
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
        categoriesdb.delCate(request.query.id, (err, result) => {
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
        categoriesdb.addCate(request.body, (err, result) => {
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
        categoriesdb.getEditCate(request.query.id, (err, result) => {
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
        categoriesdb.editCate(request.body, (err, result) => {
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

        categoriesdb.delCates(ids, (err, result) => {
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