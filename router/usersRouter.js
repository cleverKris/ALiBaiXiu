const express = require('express');

const usersRouter = express();

//引入对应的逻辑代码
const usersController = require('../controller/usersController');


//身份验证的中间件
// usersRouter.use((request, response, next) => {
//     //验证是否登录
//     if (request.session.obj) {
//         next();
//     } else {
//         response.send(`<script>alert('您还有没登录');window.location='/login';</script>`);
//     }
// });

//使用链式编程:
usersRouter.get('/users', usersController.getUsers) //渲染用户页面
    .post('/postAddUsers', usersController.postAddUsers) //添加用户数据
    .get('/getAllUsers', usersController.getAllUsers)//渲染所有用户的列表信息
    .get('/delUser', usersController.delUser) //删除指定的用户数据
    .get('/getEdituser', usersController.getEdituser) //获取修改对应的用户
    .post('/postEditUser', usersController.postEditUser) //修改用户
    .post('/delUsers', usersController.delUsers) //批量删除
    .get('/profile', usersController.profile) //响应个人中心页面
    .post('/updateProfile', usersController.updateProfile) //添加一个修改个人信息的路由

module.exports = usersRouter;