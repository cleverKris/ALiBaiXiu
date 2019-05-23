//引入users页面需要的数据 usersdb.js
const usersdb = require('../model/usersdb');
const formidable = require('formidable');
const path = require('path');

//渲染静态页面
module.exports = {
    //渲染页面和数据
    getUsers: (request, response) => {
        //如果是浏览器的主动请求 那么响应的是script标签 浏览器是认识的
        if (isBrowserLogin(request, response)) {
            return; //直接返回
        }

        usersdb.query('SELECT * FROM users', (err, result) => {
            if (err) {
                return response.send('出错了');
            }

            //调用ejs中的render方法
            response.render('users', {
                result: result, //查询时,返回的是一个数组 [RowDataPacket{},RowDataPacket{}]
                nickname: request.session.users.nickname,
                avatar: request.session.users.avatar
            });
        })
    },
    //添加用户数据
    postAddUsers: (request, response) => {
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }


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
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }

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
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }

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
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }

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
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }

        //接收参数
        // console.log(request.body);

        let editUserSql = `UPDATE users SET email='${request.body.email}',nickname='${request.body.nickname}',password='${request.body.password}' WHERE id = ${request.body.id}`;
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
        //如果是ajax请求 那么是不认识script标签的 那么返回的是 isXhrLogin方法中 在没有身份验证的情况下 返回的是true
        //条件成立  返回的是 {status: 304,msg: '还没有登录'}
        if (isXhrLogin(request, response)) {
            return;
        }

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

    },
    //响应个人中心页面
    profile: (request, response) => {
        //得到当前登录的用户的id
        let id = request.session.users.id;
        ///console.log(id) //在session中保存着
        usersdb.profile(id, (err, result) => {
            if (err) {
                //如果出错了 则跳转回users页面
                return response.send(`<script>alert('出错啦');window.location='/users';</script>`);
            }
            //result : [  {}  ]
            response.render('profile', result[0]);
        })

    },
    //添加一个修改个人信息的路由
    updateProfile: (request, response) => {
        //接收参数 使用formidable
        let form = new formidable.IncomingForm();

        //修改图片上传后保存的路径
        let imgPath = path.join(__dirname, '../uploads');
        form.uploadDir = imgPath;

        //保留图片后缀
        form.keepExtensions = true;

        form.parse(request, (err, fields, files) => { //fields:请求的参数    files:请求的文件
            if (err) {
                return response.send({
                    status: 400,
                    msg: '修改失败'
                })
            }

            // console.log(fields);
            // console.log(files); //没有上传新图片的话 接收到的是空对象{}
            //判断是否有上传新图片:
            console.log(files.avatar);
            if (files.avatar) {  //如果有上传新图片
                let name = path.basename(files.avatar.path);
                //files.avatar.path: (这是被上面修改过的路径,已经将临时保存地址修改为了当前项目的uploads目录下)'D:\\黑马前端33期就业班\\阿里百秀\\阿里百秀5-2第4天\\ALiBaiXiu\\uploads\\upload_4e4e80d4928deea38a652cd2a8b1bff0.jpg',
                //path.basename:取得是 upload_4e4e80d4928deea38a652cd2a8b1bff0.jpg  这样可以解决一个问题:将之前的图片全部仍然保留在此路径 避免静态页面渲染失败 但是新添加的图片的名字不会和之前的图片的名字有冲突
                fields.avatar = '/static/uploads/' + name;
            }

            //当修改了个人信息中的图片和昵称后 需要将session 中的信息进行更新
            request.session.users.nickname = fields.nickname;
            request.session.users.avatar = fields.avatar;

            usersdb.updateProfile(fields, (err1, result) => {
                if (err1) {
                    return response.send({
                        status: 400,
                        msg: '修改失败'
                    })
                }
                response.send({
                    status: 200,
                    msg: '修改成功'
                })
            });
        })

    },
    //响应修改密码的页面
    getPwdReset: (request, response) => {
        if (isBrowserLogin(request, response)) {
            return;
        }
        response.render('password-reset', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        })
    },
    //修改密码
    resetPwd: (request, response) => {
        //获取当前session中的密码(这样可以不用操作数据库 直接与session中对比)
        //console.log(request.session.users.password);

        //接收参数
        //用户输入的旧密码:
        let old = request.body.old;
        //新密码:
        let newPwd = request.body.new;
        //获取到当前需要修改的是哪个用户的密码
        //console.log(request.session.users.id);

        //将旧密码与session中存放的密码进行判断
        if (old != request.session.users.password) {
            return response.send({
                status: 400,
                msg: '您输入的旧密码有误'
            })
        } else {
            //将新密码更新到session中
            //request.session.users.password = newPwd;
            //其实好像也没必要保存 因为修改成功后会重新登录 那个时候又会对session中的数据进行重新赋值


            //输入的旧密码正确, 可以修改为新密码
            usersdb.resetPwd(request.session.users.id, newPwd, (err, result) => {
                if (err) {
                    return response.send({
                        status: 401,
                        msg: '修改失败'
                    })
                }
                //解决bug:修改密码成功之后,再次访问别的页面 是可以访问成功的 所以需要清除当前的session
                request.session.users = null;
                response.send({
                    status: 200,
                    msg: '修改密码成功，请重新登录'
                })
            });


        }
    }
};

//验证是否有进行身份验证
/**
 * 属于异步对象的请求的响应
 * @param request
 * @param response
 * @return {boolean}
 */
function isXhrLogin(request, response) {
    if (!request.session.users) {
        response.send({
            status: 304,
            msg: '还没有登录'
        });
        return true;//是true 说明没有登录
    }
    return false;//是false 说明已经登录了
}

/**
 * 属于浏览器的请求的响应
 * @param request
 * @param response
 * @return {*}
 */
function isBrowserLogin(request, response) {
    if (!request.session.users) {
        //return .. 后的 在布尔类型中是true
        return response.send(`<script>alert('还没有登录');window.location='/login';</script>`);
    }

}