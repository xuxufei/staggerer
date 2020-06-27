const express = require('express')
const router = express.Router()

// 引入路由处理函数
const article_handle = require('../router_handle/article')

// 获取要验证的内容
const { add_article_schema } = require('../schema/article')

//导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })
// const { upload } = require('../router_handle/article')
// 引入对内容验证的中间件
const expressjoi = require('@escook/express-joi')

// 发布新文章路由
// 注意：在当前的路由中，先后使用了两个中间件：upload.single()是multer提供的局部中间件
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post('/add', upload.single('cover_img'), expressjoi(add_article_schema), article_handle.addArticle)

// 暴露路由
module.exports = router