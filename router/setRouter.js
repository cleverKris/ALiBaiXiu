const express = require('express');

const setController = require('../controller/setController');

const router = express.Router();

router.get('/nav-menus', setController.getnavMenus) //得到导航菜单的静态页面
    .get('/getMenusData', setController.getMenusData) //动态渲染导航菜单列表中的数据
    .post('/addMenusData', setController.addMenusData) //添加新导航


module.exports = router;