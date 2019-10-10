const { Sequelize, Model } = require('sequelize')

const { sequelize } = require('../../core/db')

class Comment extends Model {
  static async addComment(bookID, content) {
    const comment = await Comment.findOne({
      where: {
        book_id: bookID,
        content,
      }
    })
    if (!comment) {
      return await Comment.create({
        book_id: bookID,
        content,
        nums: 1,
      })
    } else {
      return await comment.increment('nums', {
        by: 1,
      })
    }
  }

  static async getComments(bookID) {
    const comments = Comment.findAll({
      where: {
        book_id: bookID,
      }
    })
    return comments
  }

  // toJSON(){
  //   return {
  //     content:this.getDataValue('content'),
  //     nums:this.getDataValue('nums'),
  //   }
  // }

}

Comment.prototype.exclude = ['book_id','id']

Comment.init({
  content: Sequelize.STRING(12),
  nums: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  book_id: Sequelize.INTEGER,
}, {
  sequelize,
  tableName: 'comment',
})

module.exports = {
  Comment,
}