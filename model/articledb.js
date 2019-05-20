const db = require('./db');

module.exports = {
    query: db.query,
    //添加文章
    postSave: (obj, callback) => {
        let insertSql = `INSERT INTO posts (title,content,slug,category_id,created,status,user_id,feature) VALUES ('${obj.title}','${obj.content}','${obj.slug}','${obj.category_id}','${obj.created}','${obj.status}','${obj.user_id}','${obj.feature}')`;
        db.query(insertSql, (err, result) => {
            callback(err, result);
        })
    }
};