//把路由处理函数分离开
const express = require('express')
const router = express.Router()
// 引入功能方法模块
const ways = require('../router_handle/user')


// bug:::多写的代码，导致校验表单的没起到作用
// router.post('/reguser', ways.reguser)
// router.get('/login', ways.login)

// 1. 导入验证表单数据的中间件 
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象 
const { reg_login_schema } = require('../schema/user')
// 注册新用户 
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证 
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数 
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行 处理
router.post('/reguser', expressJoi(reg_login_schema), ways.reguser)
// 登录 
router.post('/login', expressJoi(reg_login_schema), ways.login)
module.exports = router