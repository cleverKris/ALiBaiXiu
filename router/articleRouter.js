const express = require('express');
const articleController = require('../controller/articleController');

const router = express.Router();

router.get('/post-add', articleController.getPostadd) //渲染写文章的静态页面
    .post('/postSave', articleController.postSave)  //添加文章
    .get('/posts', articleController.getPosts)  //渲染所有文章的静态页面
    .get('/getPostsData', articleController.getPostsData) //查询posts表中的所有的数据
    .get('/delArticle', articleController.delArticle) //删除文章
    .post('/delArticles', articleController.delArticles) //批量删除文章

module.exports = router;