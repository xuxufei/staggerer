// 操作文章的模块的方法函数
const db = require('../db/index')
// 获取文章列表
exports.getArticleCates = (req, res) => {
    // console.log(req.body)
    const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
    db.query(sql, (err, results) => {
        // sql语句错误
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取文章分类列表成功！',
            data: results,
        })
    })
}
// 新增文章列表
exports.addArticleCates = (req, res) => {
    // console.log(req.body)
    // 新增列表sql操作函数, 查询分类名称与别名是否被占用
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // sql语句错误
        if (err) return res.cc(err)
        //判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        // 分别判断 分类名称 和 分类别名 是否被占用
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用，请更换后重试！')
        //TODO插入操作
        // 插入文章分类
        const sqlStr = "insert into ev_article_cate set ?"
        db.query(sqlStr, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows != 1) return res.cc('插入失败')
            res.cc('插入成功')
        })
    })
}

// 对文章删除
exports.deleteCateById = (req, res) => {
    // sql删除文章
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, req.body.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除失败')
        res.cc('删除成功')
    })
}

// 根据id更新文章列表
exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    // Id<>?查询要更新的这条数据之外的其他数据有没有使用了这个分类名称和别称的
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`
    // 执行查重操作
    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断 分类名称 和 分类别名 是否被占用
        if (results.length === 2)
            return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用，请更换后重试！')
        // res.cc('ok')
        // TODO更新文章
        const sql = 'update ev_article_cate set ? where id=?'
        db.query(sql, [req.body, req.body.Id], (err, results) => {
            if (err) return res.cc(err)
            console.log(req.body)
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
            // 更新文章分类成功
            res.cc('更新文章分类成功！', 0)
        })
    })
}

// 增加分类
exports.addArticleCates = (req, res) => {
    const { name, alias } = req.body
    //定义查询sql语句  查询 分类名称 与 分类别名 是否被占用
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    //调用db.query()方法进行查重操作
    db.query(sql, [name, alias], (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        } else if (results.length === 2) {
            //判断分类名称 和  分类别名 是否被占用

            return res.cc('分类名称和别名被占用，请更换后重试')
        } else if (results.length === 1 && results[0].name === name) {
            //判断 分类名称  是否被占用
            return res.cc('分类名称被占用，请更换后重试！')
        } else if (results.length === 1 && results[0].alias === alias) {
            // 判断  分类别名 是否被占用
            return res.cc('分类别名被占用，请更换后重试！')
        }
    })
}
// 删除分类
exports.deleteCateById = (req, res) => {
    //定义根据id删除数据的sql 语句
    console.log(1);

    const sql = 'update ev_article_cate set is_delete=1 where id =?'
    //调用db.query()方法执行删除的sql语句
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败')

        res.cc('删除文章分类成功', 0)
        //如果执行sql语句失败
        // if (err) {
        //     return res.cc(err)
        // } else if (results.affectedRows !== 1) {
        //     //如果执行sql语句成功但是影响的行数不为1
        //     return res.cc('删除文章分类失败')
        // }

    })
    //return res.cc('删除成功', 0)
    //res.send('牛逼')
}
// 获取分类
exports.getArticleById = (req, res) => {
    //定义根据id获取的sql语句
    const sqlStr = 'select * from ev_article_cate where id=?'
    //调用db.query()方法执行sql语句
    db.query(sqlStr, req.params.id, (err, results) => {
        //如果执行sql语句失败
        if (err) {
            return res.cc(err)

        } else if (results.length !== 1) {
            //执行sql语句成功 但是没有查询到任何数据
            return res.cc('查询失败')
        } else {
            res.cc({
                status: 0,
                message: '获取文章分类成功',
                data: results[0]
            })
        }
    })
    // res.send('哈哈哈哈')
}
// 更新分类
exports.updateCateById = (req, res) => {
    let { Id, name, alias } = req.body
    //定义sql语句 查询 分类名称 与 分类别名 是否被占用的 SQL 语句  <>不等于
    // AND 表示必须同时满足多个条件，相当于 JavaScript 中的 && 运算符，例如 if (a !== 10 && a !== 20)
    //  OR 表示只要满足任意一个条件即可，相当于 JavaScript 中的 || 运算符，例如 if(a !== 10 || a !== 20)
    const sql = 'select * from ev_article_cate where Id<>? and (name=? or alias=?)'
    //调用 db.query() 执行查重的操作
    db.query(sql, [Id, name, alias], (err, results) => {
        //执行sql语句失败
        if (err) {
            return res.cc(err)
        } else if (results.length === 2) {
            //判断分类名称 和  分类别名 是否被占用

            return res.cc('分类名称和别名被占用，请更换后重试')
        } else if (results.length === 1 && results[0].name === name) {
            //判断 分类名称  是否被占用
            return res.cc('分类名称被占用，请更换后重试！')
        } else if (results.length === 1 && results[0].alias === alias) {
            // 判断  分类别名 是否被占用
            return res.cc('分类别名被占用，请更换后重试！')
        }
        //定义新增文章分类的sql语句
        const sql = `update ev_article_cate set ? where Id=?`
        //使用db.query()方法执行新增sql语句 


        db.query(sql, [req.body, Id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)

            // SQL 语句执行成功，但是影响行数不等于 1
            if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')

            // 更新文章分类成功
            res.cc('更新文章分类成功', 0)
        })
    })

    //  res.send('朕要一统天下')
}
