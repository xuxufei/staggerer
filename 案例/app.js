//创建一个服务器实例
const express = require('express')
const app = express()
//引入解决跨域问题的模块
const joi = require('@hapi/joi')

app.use(express.urlencoded({ extended: false }))

const cors = require('cors')
app.use(cors())
// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
    // status 默认值为 1，表示失败的情况
    // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
    res.cc = function (err, status = 1) {
        res.send({
            status,
            // 判断错误类型
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})


// 引入路由文件
const routeruser = require('./router/user')
app.use('/api', routeruser)
//解析表单提供的数据express.urlencoder
// 错误中间件 
// 给token字符串解码
const expressJwt = require('express-jwt')
const config = require('./schema/config')
app.use(expressJwt({ secret: config.jwtSecretKey }).unless('/\/api\//'))

// 开始对用户信息操作，导入使用用户信息模块
const userinforouter = require('./router/userinfo')
app.use('/my', userinforouter)
app.use(function (err, req, res, next) { // 数据验证失败 
    if (err instanceof joi.ValidationError)
        // 不能同时写两个res.cc()要加return
        return res.cc(err)

    // ///在postman里的hender头里设置Authorization设置jwt字符串。dui api开头的不需要验证。
    if (err.name === 'UnauthorizedError')
        return res.cc('身份认证失败！')
    res.cc(err)
})
const artcates = require('./router/artcate')
// 对文章中心绑定路由
app.use('/my/article', artcates)

// 对发布新文章操作绑定路由
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)

app.listen(80, (req, res) => {
    console.log('server is running in http://127.0.0.1')
})
