const express = require('express');

const usersRouter = express();

//引入对应的逻辑代码
const usersController = require('../controller/usersController');

usersRouter.get('/users', (request, response) => {
    usersController.getUsers(request, response);
});

usersRouter.post('/postAddUsers', (request, response) => {
    usersController.postAddUsers(request, response);
});

usersRouter.get('/getAllUsers', (request, response) => {
    usersController.getAllUsers(request, response);
});

usersRouter.get('/delUser', (request, response) => {
    usersController.delUser(request, response);
});

module.exports = usersRouter;