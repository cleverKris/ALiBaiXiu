const indexdb = require('../model/indexdb');

module.exports = {
    //动态渲染前台页面index中的数据 提高seo优化
    getindexData: (request, response) => {
        indexdb.getindexData((err, result) => {
            if (err) {
                return response.send({
                    status: 400,
                    msg: '出错啦'
                })
            }
            response.render('index', {
                data: result
            });
        })

    }
};