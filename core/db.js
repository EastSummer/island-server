const { Sequelize, Model} = require('sequelize')
const { unset, clone, isArray } = require('lodash')

const { dbName, host, port, user, password } = require('../config/config').database

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
    // deletedAt: 'deleted_at',
    underscored: true,  // 驼峰命名 -> 下划线
    scopes: {
      bh: {
        attributes: {
          exclude: ['updatedAt', 'deletedAt', 'createdAt']
        }
      },
    },
  },
})

sequelize.sync({
  force: false,   // true 会把表删掉
})

Model.prototype.toJSON = function() {
  let data = clone(this.dataValues)
  unset(data, 'updatedAt')
  unset(data, 'createdAt')
  unset(data, 'deletedAt')

  if(isArray(this.exclude)){
    this.exclude.forEach(
      (value)=>{
        unset(data,value)
      }
    )
  }

  return data
}

module.exports = {
  // db: sequelize, 导出重命名
  sequelize,
}