const db = require('./db');

module.exports = {
    query: db.query,
    //添加文章
    postSave: (obj, callback) => {
        let insertSql = `INSERT INTO posts (title,content,slug,category_id,created,status,user_id,feature) VALUES ('${obj.title}','${obj.content}','${obj.slug}','${obj.category_id}','${obj.created}','${obj.status}','${obj.user_id}','${obj.feature}')`;
        db.query(insertSql, (err, result) => {
            callback(err, result);
        })
    },
    //查询posts表中的所有的数据
    /**
     * 实现分页 不再一次性全部查出来
     * @param page     当前的第几页
     * @param pageSize 每页显示多少条数据
     */
    getPostsData: (obj, callback) => {
        // SELECT posts.*,                                             查询出posts表中的所有字段
        //        users.nickname,                                      查询出users表中的nickname字段
        //        categories.name                                      查询出categories表中的name字段
        // FROM posts                                                  从posts表中去查询
        // LEFT JOIN users ON posts.user_id = users.id                 联表:users表      posts表中的user_id等于users表中的id
        // LEFT JOIN categories ON posts.category_id = categories.id   联表:categories表 posts表中的category_id等于categories表表中的id
        // ORDER BY id DESC                                            按照posts表的id字段 desc降序进行排序
        // LIMIT 0,10                                                  查询出的是从0开始(不包括0)的10条数据

        /*
        * cate:    0--->所有分类
        * status: all--->所有状态
        * */

        //所有分类&所有状态 WHERE true 恒成立
        let sql = `SELECT posts.*,users.nickname,categories.name FROM posts
                    LEFT JOIN users ON posts.user_id = users.id
                    LEFT JOIN categories ON posts.category_id = categories.id WHERE 1 = 1 `;


        //声明一个变量 用来判断分类 和 状态
        let tiaojian = ``;

        //添加搜索条件 WHERE ... AND ...

        //1.不是所有分类
        if (obj.cate != 0) {
            tiaojian += `and posts.category_id = ${obj.cate} `;
        }
        //2.不是所有状态
        if (obj.status != 'all') {
            tiaojian += `and posts.status = '${obj.status}' `;
        }

        //将tiaojian筛选条件追加
        sql += tiaojian;

        //1.排序 2.分页:从 (page - 1) * pageSize开始,取pageSize条数据 3.搜索数据的总条数
        sql += `ORDER BY posts.id desc
                LIMIT ${(obj.page - 1) * obj.pageSize}, ${obj.pageSize};
                SELECT count(*) FROM posts WHERE 1 = 1 `;

        //最后也要加上
        sql += tiaojian;


        db.query(sql, (err, result) => {
            callback(err, result);
        })
    },
    //删除文章
    delArticle: (id, callback) => {
        db.query(`DELETE FROM posts WHERE id = ${id}`, (err, result) => {
            callback(err, result);
        })
    },
    //批量删除文章
    delArticles: (ids, callback) => {
        db.query(`DELETE FROM posts WHERE id in (${ids})`, (err, result) => {
            callback(err, result);
        })
    },
    //当前需要编辑的文章
    getEditDataById: (id, callback) => {
        //不但要渲染文章的数据 还要渲染分类中的内容
        let sql = `SELECT * FROM posts WHERE id = ${id};SELECT * FROM categories`;
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    },
    //修改文章
    updatePostsData: (obj, callback) => {
        let sql = `UPDATE posts SET title = '${obj.title}',content = '${obj.content}',slug = '${obj.slug}',category_id = ${obj.category},created = '${obj.created}',status = '${obj.status}',feature = '${obj.feature}' WHERE id = ${obj.id} `;
        db.query(sql, (err, result) => {
            callback(err, result);
        })
    }
};