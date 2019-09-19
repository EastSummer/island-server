const { Op } = require('sequelize')
const { flatten } = require('lodash')
const { Movie, Music, Sentence } = require('../models/classic')

class Art {

  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: [],
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      const ids = artInfoObj[key]
      if (!ids.length) continue
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return flatten(arts)
  }

  static async _getListByType(ids, type) {
    let arts = []
    const finder = {
      where: {
        id: { [Op.in]: ids },
      }
    }
    const scope = 'bh'
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findOne(finder)
        break;
      case 200:
        arts = await Music.scope(scope).findOne(finder)
        break;
      case 300:
        arts = await Sentence.scope(scope).findOne(finder)
        break;
      case 400:
        
        break;
    
      default:
        break;
    }

    return arts
  }

  static async getData(art_id, type, useScope=true) {
    let art = null
    const finder = {
      where: {
        id: art_id,
      }
    }
    const scope = useScope ? 'bh' : null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(finder)
        break;
      case 200:
        art = await Music.scope(scope).findOne(finder)
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(finder)
        break;
      case 400:
        
        break;
    
      default:
        break;
    }

    return art
  }
}

module.exports = {
  Art,
}