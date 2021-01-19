const { Post, User } = require("../models");

class PostRepository {
  async save(post) {
    return await Post.create(post);
  }

  async show(id) {
    return await Post.findByPk(id, {
      attributes: ['id', 'description', 'createdAt'],
      include : [{ model: User, attributes: ['id', 'name'] }]
    });
  }

  async findAll() {
    return await Post.findAll({
      where: {deletedAt: null},
      attributes: ['id', 'description', 'createdAt'],
      include: [{ model: User, attributes: ['id', 'name'] }]
    });
  }

  async update(post, obj) {
    return await Post.update(post, {
      where: { id: obj.id, userId: obj.userId },
    });
  }

  async delete(id) {
    return await Post.destroy(id);
  }
}

module.exports = new PostRepository();
