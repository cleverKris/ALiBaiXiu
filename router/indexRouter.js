const express = require('express');
const indexController = require('../controller/indexController');

const router = express.Router();

router.get('/', indexController.getindexData) //动态渲染前台页面index中的数据 提高seo优化

module.exports = router;