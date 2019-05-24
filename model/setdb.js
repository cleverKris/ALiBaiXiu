const db = require('./db');

module.exports = {
    query: db.query,
    //动态渲染导航菜单列表中的数据
    getMenusData: callback => {
        //报错是因为key是MySQL中的关键字
        let sql = `SELECT * FROM options WHERE options.key = 'nav_menus'`;
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    },
    //添加新导航
    addMenusData: function (obj, callback) {
        //得到之前的导航菜单列表中的数据
        this.getMenusData((err, result) => {
            //验证错误
            if (err) {
                return callback(err, null);
            }
            let dataArr = JSON.parse(result[0]['value']);

            let newObj = {
                icon: `fa fa-phone`,
                text: obj.text,
                title: obj.title,
                link: obj.href
            };

            dataArr.push(newObj);

            //将对象转为字符串
            let dataStr = JSON.stringify(dataArr);

            let sql = `UPDATE options SET options.value = '${dataStr}' WHERE options.key = 'nav_menus'`;
            db.query(sql, (err, result) => {
                callback(err, result);
            })
        })
    }
};