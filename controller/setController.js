const setdb = require('../model/setdb');

module.exports = {
    //得到导航菜单静态页面
    getnavMenus: (request, response) => {
        response.render('nav-menus', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        });
    },
    //动态渲染导航菜单列表中的数据
    getMenusData: (request, response) => {
        setdb.getMenusData((err, result) => {
            if (err) {
                //报错的原因请看setdb
                console.log(err.message);
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '获取数据成功',
                data: result
            })
        })
    },
    //添加新导航
    addMenusData: (request, response) => {

        setdb.addMenusData(request.body, (err, result) => {
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
        });
    }
};