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

    },
    //渲染所有文章的静态页面
    getPosts: (request, response) => {
        response.render('posts', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar,
        });
    },
    //查询posts表中的所有的数据
    getPostsData: (request, response) => {
        //接收参数:
        let page = request.query.page;    //浏览器端传过来的当前是第几页
        let pageSize = request.query.pageSize; //浏览器端传过来的每页显示多少条数据

        let cate = request.query.cate;    //选择的分类
        let status = request.query.status; //选择的状态

        let obj = {
            cate,
            status,
            page,
            pageSize
        };

        articledb.getPostsData(obj, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '查询成功',
                data: result
            })
        })

    },
    //删除文章
    delArticle: (request, response) => {
        let id = request.query.id;
        articledb.delArticle(id, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '删除失败'
                })
            }
            response.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },
    //批量删除文章
    delArticles: (request, response) => {
        //console.log(request.body); //{ id: [ '3', '4' ] }

        let ids = request.body.id.join(',');

        articledb.delArticles(ids, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '删除失败'
                })
            }
            response.send({
                status: 200,
                msg: '删除成功'
            })
        })
    },
    //渲染编辑文章的静态页面
    getpostEdit: (request, response) => {
        response.render('post-edit', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        })
    },
    //渲染编辑文章数据信息
    getEditDataById: (request, response) => {
        let id = request.query.id;

        articledb.getEditDataById(id, (err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '数据获取成功',
                data: result[0][0],
                cateData: result[1]
            })
        })
    },
    //修改文章信息
    updatePostsData: (request, response) => {
        if (isXhrLogin(request, response)) {
            return;
        }


        let form = new formidable.IncomingForm();
        //设置保存的路径
        form.uploadDir = path.join(__dirname, '../uploads');
        //保留后缀名
        form.keepExtensions = true;

        form.parse(request, (err, fields, files) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            //如果上传了图片
            if (files.feature) {
                fields.feature = '/static/uploads/' + path.basename(files.feature.path);
            }
            articledb.updatePostsData(fields, (err1, result) => {
                if (err1) {
                    return response.send({
                        status: 400,
                        msg: '出错啦'
                    })
                }
                response.send({
                    status: 200,
                    msg: '修改成功'
                })
            })


        })
    },
    //渲染仪表盘静态页面
    getBgindex: (request, response) => {
        if (isBrowserLogin(request, response)) {
            return
        }
        response.render('bg-index', {
            nickname: request.session.users.nickname,
            avatar: request.session.users.avatar
        })
    },
    //动态渲染站点内容统计
    getTotalData: (request, response) => {
        if (isXhrLogin(request, response)) {
            return;
        }

        articledb.getTotalData((err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.send({
                status: 200,
                msg: '获取数据成功',
                data: result
            })
        })
    }
};


//验证是否有进行身份验证
/**
 * 属于异步对象的请求的响应
 * @param request
 * @param response
 * @return {boolean}
 */
function isXhrLogin(request, response) {
    if (!request.session.users) {
        response.send({
            status: 304,
            msg: '还没有登录'
        });
        return true;//是true 说明没有登录
    }
    return false;//是false 说明已经登录了
}

/**
 * 属于浏览器的请求的响应
 * @param request
 * @param response
 * @return {*}
 */
function isBrowserLogin(request, response) {
    if (!request.session.users) {
        //return .. 后的 在布尔类型中是true
        return response.send(`<script>alert('还没有登录');window.location='/login';</script>`);
    }

}