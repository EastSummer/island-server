const { Sequelize, Model } = require('sequelize')

// const { sequelize: db } = require('../../core/db') 导入重命名
const { sequelize } = require('../../core/db')

class User extends Model {

}

User.init({
  id: {
    // 不设置的话，sequelize会自动生成
    type: Sequelize.INTEGER,
    primaryKey: true,     // 主键：不能重复、不能为空
    autoIncrement: true,  // id自增
  },
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },
}, {
  sequelize,
  tableName: 'user',  // 指定表名
})