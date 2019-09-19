const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')
const { Movie, Music, Sentence } = require('../models/classic')
const { Art } = require('../models/art')
const { LikeError, DislikeError } = require('../../core/http-exception')

class Favor extends Model {
  static async like(art_id, type, uid) {
    // 0 查询是否存在
    // 1 添加一条记录
    // 2 修改classc fav_num
    const favor = await Favor.findOne({
      where: {
        art_id, type, uid,
      }
    })
    if (favor) {
      throw new LikeError()
    }
    return sequelize.transaction(async t => {
      await Favor.create({ art_id, type, uid }, {transaction: t})
      const art = await Art.getData(art_id, type, false)
      await art.increment('fav_nums', {by: 1, transaction: t})
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: {
        art_id, type, uid,
      }
    })
    if (!favor) {
      throw new DislikeError()
    }
    return sequelize.transaction(async t => {
      await favor.destroy({ force: true, transaction: t })
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', {by: 1, transaction: t})
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid }
    })
    return favor ? true : false
  }

}

Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'favor',
}) 

module.exports = {
  Favor,
}