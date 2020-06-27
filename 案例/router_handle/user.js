const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// d导入存有密钥的模块
const { jwtSecretKey, expiresIn } = require('../schema/config')

// 注册方法
exports.reguser = (req, res) => {
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法！' })
    // }
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        // 判断用户名是否被占用
        if (results.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // 定义插入新用户的 SQL 语句
        const sql = 'insert into users.ev_users set ?'
        // 调用 db.query() 执行 SQL 语句

        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            // 判断 SQL 语句是否执行成功
            // if (err) return res.send({ status: 1, message: err.message })
            if (err)

                // bug:
                // //////使用send会报错
                // 当端口多次被占用，重启vsc
                // header is not set after set to client重启或者语法错误
                return res.cc(err.message)
            // 判断影响行数是否为 1
            // if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            // 注册用户成功
            // res.send({ status: 0, message: '注册成功！' })
            res.cc('注册成功！', 0)
        })

    })

}
// 登录页面
exports.login = (req, res) => {
    const userinfo = req.body
    // console.log(userinfo)
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        // sql语句错误
        if (err) return res.cc(err.message)
        // 执行 SQL 语句成功，但是获取到的数据条数不等于 1
        if (results.length !== 1) return res.cc('登录失败')
        // 登录密码检测
        // 很多以Sync结尾的api都是同步
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) return res.cc('登陆失败')
        // res.send('login is ok')
        // es6高级语法 ...xx获取里面所有内容，后面参数会覆盖展开的内容
        const user = { ...results[0], password: '', user_pic: '' }
        // 合并对象方法二
        // object.assign()可以对对象做浅拷贝，浅深拷贝看修改属性是否影响自身。


        // const user = object.assign({ ...results[0] }, { password: '', user_pic: '' })
        // // 对用户的信息进行加密，生成 Token 字符串
        const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn })

        // // 调用 res.send() 将 Token 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: `Bearer ${tokenStr}`,
        })
    })
}



