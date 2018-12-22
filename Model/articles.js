const Sequelize = require('sequelize')
const sequelize = require('../lib/mysql')
const articles = sequelize.define(  //定义模型，告诉Sequelize如何映射表
    'articles',
    {
        id: {
            type: Sequelize.STRING(11),
            primaryKey: true
        },
        postId: Sequelize.STRING(11),
        date: Sequelize.BIGINT(100),
        tags: Sequelize.STRING(500),
        title: Sequelize.STRING(100),
        desc: Sequelize.STRING(1000),
        detail: Sequelize.STRING(10000),
        readNum: Sequelize.STRING(11),
        wordCount: Sequelize.STRING(11)
    },
    {
        timestamps: false
    }
)

module.exports = articles