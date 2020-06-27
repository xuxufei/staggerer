// exports.userinfo = (req, res) => {
//     res.send('ok')
// }

// 获取用户信息
const db = require('../db/index')
const bcrypt = require('bcryptjs')


exports.userinfo = (req, res) => {
    // 获取用户信息
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        // console.log(results)
        // 不能忘了length
        if (results.length !== 1) return res.cc('获取信息失败')
        // console.log(results[0].userame)
        res.send({
            status: 0,
            // message: '获取成功',
            data: results[0],
            message: '获取用户信息成功'
        })
    })

}
// 更新用户信息
exports.updateuserinfo = (req, res) => {
    const sql = `update ev_users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败 
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但影响行数不为 1 
        if (results.affectedRows !== 1) return res.cc('修改用户基本信息失败！')
        // 修改用户信息成功 
        return res.cc('修改用户基本信息成功！', 0)
    })
}
// 重置密码
exports.updatePassword = (req, res) => {
    // 根据 id 查询用户的信息
    const sql = `select * from ev_users where id=?`
    // 执行根据 id 查询用户的信息的 SQL 语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 判断结果是否存在
        if (results.length !== 1) return res.cc('用户不存在！')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误！')

        // 定义更新密码的 SQL 语句
        const sql = `update ev_users set password=? where id=?`
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        // 调用 db.query() 执行 SQL 语句
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // 判断影响的行数
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            // 成功
            res.cc('更新密码成功', 0)
        })
    })
}


// 更新头像
module.exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => { // 执行 SQL 语句失败 
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新头像失败！')
        // 更新用户头像成功 
        return res.cc('更新头像成功！', 0)
    })
}