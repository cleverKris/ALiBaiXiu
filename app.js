// 职责：开启服务器
// 1.0 引入 express
// 2.0 搭建服务器
// 3.0 处理静态文件
// 4.0 处理路由文件
const express = require('express');
//引入ejs
const ejs = require('ejs');
const bodyParser = require('body-parser');


//引入测试文件
const demoRouter = require('./router/demoRouter');
//引入后台用户管理
const userRouter = require('./router/usersRouter');

const app = express();


//配置ejs模板引擎
app.set('views', './views'); //设置模板引擎的静态页面
app.set('view engine', 'ejs');//设置模板引擎渲染的文件的后缀名

//配置bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//统一配置静态资源
app.use('/assets', express.static('./assets'));//users的header.ejs中需要的文件
app.use('/static/uploads', express.static('./uploads'));//users的aside.ejs中需要的图片

//使用外置路由
app.use(demoRouter);
app.use(userRouter);

app.listen(3000, () => {
    console.log('running...');
});