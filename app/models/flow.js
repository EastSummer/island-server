const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const { Art } = require('@models/art')
const { Favor } = require('@models/favor')

class Flow extends Model {
  static async getNextOrPrevous(index, uid) {
    const flow = await Flow.findOne({
      where: {
        index,
      }
    })
    if (!flow) {
      throw new NotFound()
    }
    const art = await Art.getData(flow.artId, flow.type)
    const likeNext = await Favor.userLikeIt(flow.artId, flow.type, uid)
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeNext)
    return art
  }
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