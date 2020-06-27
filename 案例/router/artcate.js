const express = require('express')
const router = express.Router()
const artcates_handle = require('../router_handle/artcate')
const expressJoi = require('@escook/express-joi')
//获取文章列表路由
router.get('/cates', artcates_handle.getArticleCates)
// 新增文章内容
// 新增文章分类的路由,对表单验证，最后添加进数据库
const { add_cate_schema, delete_cate_schema, update_cate_schema } = require('../schema/articate')
// router.post('/addcates', expressjoi(add_cate_schema), artcates_handle.addArticleCates)


// // 文章删除：定义路由和处理函数，验证表单，进行删除操作
// router.get('/deletecate', expressjoi(delete_cate_schema), artcates_handle.deleteCateById)
// module.exports = router


// // 根据文章id更新文章分类数据
// router.post('/updatecate', expressjoi(update_cate_schema), artcates_handle.updateCateById)

//文章分类的路由 增加
router.post('/addcates', expressJoi(add_cate_schema), artcates_handle.addArticleCates)// 
//根据id删除
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcates_handle.deleteCateById)//

//根据id获取
router.get('/cates/:id', artcates_handle.getArticleById)
//根据id更新
router.post('/updatecate', expressJoi(update_cate_schema), artcates_handle.updateCateById)
module.exports = router
