
// 个人中心：获取信息

const express = require('express')
const { route } = require('./user')
const router = express.Router()
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { reg_login_schema, update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')

// 引入抽离的文件
const handle_userinfo = require('../router_handle/userinfo')

// 个人中心，更新信息
// 获取信息路由接口
router.get('/userinfo', handle_userinfo.userinfo)
// 更新路由接口,中间路由，对导入的验证规则对象加密
router.post('/userinfo', expressJoi(update_userinfo_schema), handle_userinfo.updateuserinfo)
// 重置密码路由接口,验证必须有oldPwd和newPwd
router.get('/updatepwd', expressJoi(update_password_schema), handle_userinfo.updatePassword)
// 更换头像的路由 
router.post('/updateavatar', expressJoi(update_avatar_schema), handle_userinfo.updateAvatar)
module.exports = router