const db = require('./db');

module.exports = {
    query: db.query,
    //动态渲染前台页面index中的数据 提高seo优化
    getindexData: callback => {
        let sql = `SELECT options.value FROM options WHERE 
                    options.key = 'site_logo' OR 
                    options.key = 'site_name' OR 
                    options.key = 'site_description' OR 
                    options.key = 'site_keywords' OR 
                    options.key = 'site_footer'`;
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    }
};