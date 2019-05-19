const logindb = require('../model/logindb');

module.exports = {
    //得到静态页面
    getLogin: (request, response) => {
        response.render('login', {});
    },
    //登录验证
    loginPostData: (request, response) => {
        //console.log(request.body); // { email: '751359974@qq.com', password: '123' }

        //这句话是根据获取到的email 去匹配对应的password
        //如果数据库中没有对应的email 则result 是 []
        //如果数据库中有对应的 email  则result 是[{password:'123'}]
        logindb.loginPostData(request.body.email, (err, result) => {
            //sql语句写错
            if (err) {
                return response.send({
                    status: 400,
                    msg: '验证出错'
                })
            }
            //邮箱出错
            if (result.length == 0) {
                return response.send({
                    status: 401,
                    msg: '您输入的邮箱或密码有误'
                })
            }
            //邮箱对了 但是数据库中该邮箱对应的密码有误
            if (request.body.password != result[0].password) {
                return response.send({
                    status: 402,
                    msg: '您输入的密码有误'
                })
            }

            //登录成功
            //将登录的信息保存到session中
            request.session.obj = {
                email: request.body.email,
                password: request.body.password
            };
            response.send({
                status: 200,
                msg: '登录成功'
            })
        })
    }
};