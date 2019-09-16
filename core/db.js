const Sequelize = require('sequelize')

const { dbName, host, port, user, password } = require('../config/config1').database

// 四个参数 dbName user pwd {...}
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',   // 数据库类型
  host,
  port,
  logging: true,      // 操作数据库时，会把原始sql打印在终端
  timezone: '+08:00', // 时区
  define: {
    timestamps: true, // createdAt & updatedAt
    paranoid: true,   // deletedAt
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'updated_at',
    underscored: true,  // 驼峰命名 -> 下划线
  },
})

sequelize.sync()

module.exports = {
  // db: sequelize, 导出重命名
  sequelize,
}