const bcrypt = require('bcryptjs')
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
  email: {
    type: Sequelize.STRING(128),
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    set(val){
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    },
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true,
  },
}, {
  sequelize,
  tableName: 'user',  // 指定表名
})

module.exports = {
  User,
}