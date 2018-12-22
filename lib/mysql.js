const Sequelize = require('sequelize')
const config = require('../config/default.js')
//建立数据库连接池
const sequelize = new Sequelize(  //创建一个Sequelize实例
    config.database.DATABASE,
    config.database.USERNAME,
    config.database.PASSWORD,
    {
        host: config.database.HOST,
        dialect: 'mysql',
        operatorsAliases: false,

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

module.exports = sequelize