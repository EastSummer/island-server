const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')

class Flow extends Model {

}

Flow.init({
  index: Sequelize.INTEGER,   // 期刊编号
  artId: Sequelize.INTEGER,  // 通过此id在实体表找相应数据
  type: Sequelize.INTEGER,    // 100:Move 200:Music 300:Sentence
}, {
  sequelize,
  tableName: 'flow',
})

module.exports = {
  Flow,
}