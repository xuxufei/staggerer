// 导入定义验证规则的模块,对个人文章中心的操作
const joi = require('@hapi/joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    },
}
// 删除文章规则
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    body: {
        id,
    },
}
// 用id更新文章 规则
exports.update_cate_schema = {
    body: {
        Id: id,
        name,
        alias,
    },
}

// 发布新文章
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state,
    },
}