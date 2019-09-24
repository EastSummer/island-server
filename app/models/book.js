const { Sequelize, Model, Op } = require('sequelize')
const axios = require('axios')
const util = require('util')

const { sequelize } = require('../../core/db')
const { detailUrl, keywordUrl } = require('../../config/config').yushu

class Book extends Model {
  constructor(id) {
    super()
    this.id = id
  }

  async detail() {
    const url = util.format(detailUrl, this.id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async searchFromYuShu(q, start, count, summary=1) {
    const url = util.format(keywordUrl, encodeURI(q), start, count, summary)
    const result = await axios.get(url)
    return result.data
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    default: 0,
  }
},{
  sequelize,
  tableName: 'book',
})

module.exports = {
  Book,
}