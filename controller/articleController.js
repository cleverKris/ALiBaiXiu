const articledb = require('../model/articledb');
const formidable = require('formidable');
const path = require('path');
module.exports = {
    //渲染写文章的静态页面
    getPostadd: (request, response) => {
        response.render('post-add', {
            //去session中获取aside需要的两个参数
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        });
    },
    //添加文章
    postSave: (request, response) => {
        //接收参数
        let form = new formidable.IncomingForm();

        //修改图片上传后保存的路径
        let imgPath = path.join(__dirname, '../uploads');
        form.uploadDir = imgPath;

        //保留图片的后缀
        form.keepExtensions = true;

        form.parse(request, (err, fields, files) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '保存失败'
                })
            }
            //创建一个文章对象
            let obj = {
                title: fields.title,
                content: fields.content,
                slug: fields.slug,
                category_id: fields.category_id,
                created: fields.created,
                status: fields.status,
                //作者的id
                user_id: request.session.users.id
            };

            //console.log(files);
            //针对图片的处理
            if (files.feature) {
                //console.log(path.basename(files.feature.path)); //upload_b46bc3d404832cfd39d59f709aa97660.jpg
                obj.feature = '/static/uploads/' + path.basename(files.feature.path);
            } else {
                obj.feature = '/static/uploads/avatar.jpg';
            }
            articledb.postSave(obj, (err1, result) => {
                if (err1) {
                    return response.send({
                        status: 400,
                        msg: '添加失败'
                    })
                }
                response.send({
                    status: 200,
                    msg: '添加成功'
                });
            });


        });

    }
};