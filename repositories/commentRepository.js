const { Comment, User } = require("../models");

class CommentRepository {
  async save(comment) {
    return await Comment.create(comment);
  }

  async show(id) {
    return await Comment.findByPk(id, {
      attributes: ['id', 'comment', 'createdAt'],
      include: [{ model: User, attributes: ['id', 'name'] }]
    });
  }

  async findAll() {
    return await Comment.findAll({
      where: { deletedAt: null },
      attributes: ['id', 'comment', 'createdAt'],
      include: [{ model: User, attributes: ['id', 'name'] }]
    });
  }

  async update(comment, obj) {
    return await Comment.update(comment, {
      where: { id: obj.id, userId: obj.userId },
    });
  }

  async delete(id) {
    return await Comment.destroy(id);
  }
}

module.exports = new CommentRepository();
