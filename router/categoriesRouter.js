const express = require('express');
const categoriesController = require('../controller/categoriesController');

const router = express.Router();

router.get('/categories', categoriesController.categories) //获取静态页面
    .get('/categoriesData', categoriesController.categoriesData) //重新渲染所有文章数据
    .get('/delCate', categoriesController.delCate) //删除对应的文章分类目录
    .post('/addCate', categoriesController.addCate) //添加文章分类
    .get('/getEditCate', categoriesController.getEditCate) //编辑渲染对应的分类信息
    .post('/editCate', categoriesController.editCate)  //修改对应的文章分类
    .post('/delCates', categoriesController.delCates); //批量删除

module.exports = router;
