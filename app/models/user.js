const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')

// const { sequelize: db } = require('../../core/db') 导入重命名
const { sequelize } = require('../../core/db')
const { AuthFailed } = require('../../core/http-exception')

class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email,
      }
    })
    if (!user) {
      throw new AuthFailed('账号不存在')
    }
    if (!plainPassword) {
      throw new AuthFailed('请输入密码')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new AuthFailed('密码错误')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where:{
        openid,
      }
    })
    return user
  }

  static async registerUserByOpenid(openid) {
    return await User.create({
      openid,
    })
  }
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