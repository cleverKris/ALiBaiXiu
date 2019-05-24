const express = require('express');
const articleController = require('../controller/articleController');

const router = express.Router();

router.get('/post-add', articleController.getPostadd) //渲染写文章的静态页面
    .post('/postSave', articleController.postSave)  //添加文章
    .get('/posts', articleController.getPosts)  //渲染所有文章的静态页面
    .get('/getPostsData', articleController.getPostsData) //查询posts表中的所有的数据
    .get('/delArticle', articleController.delArticle) //删除文章
    .post('/delArticles', articleController.delArticles) //批量删除文章
    .get('/post-edit', articleController.getpostEdit) //渲染编辑文章的静态页面
    .get('/getEditDataById', articleController.getEditDataById) //渲染当前需要编辑文章的信息
    .post('/updatePostsData', articleController.updatePostsData) //修改文章信息
    .get('/bg-index', articleController.getBgindex) //渲染仪表盘的静态页面
    .get('/getTotalData', articleController.getTotalData)  //动态渲染站点内容统计

module.exports = router;