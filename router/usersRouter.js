const express = require('express');

const usersRouter = express();

//引入对应的逻辑代码
const usersController = require('../controller/usersController');

//使用链式编程:
usersRouter.get('/users', usersController.getUsers) //渲染用户页面
    .post('/postAddUsers', usersController.postAddUsers) //添加用户数据
    .get('/getAllUsers', usersController.getAllUsers)//渲染所有用户的列表信息
    .get('/delUser', usersController.delUser) //删除指定的用户数据
    .get('/getEdituser', usersController.getEdituser) //获取修改对应的用户
    .post('/postEditUser', usersController.postEditUser) //修改用户
    .post('/delUsers', usersController.delUsers); //批量删除

module.exports = usersRouter;