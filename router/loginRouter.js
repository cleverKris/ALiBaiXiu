const express = require('express');

const loginController = require('../controller/loginController');
const router = express.Router();

router.get('/login', loginController.getLogin) //得到login的静态页面
    .post('/loginPostData', loginController.loginPostData) //登录验证
    .get('/loginout', loginController.loginout) //退出登录


module.exports = router;