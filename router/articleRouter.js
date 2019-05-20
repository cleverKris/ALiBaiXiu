const express = require('express');
const articleController = require('../controller/articleController');

const router = express.Router();

router.get('/post-add', articleController.getPostadd) //渲染写文章的静态页面
    .post('/postSave', articleController.postSave)  //添加文章

module.exports = router;