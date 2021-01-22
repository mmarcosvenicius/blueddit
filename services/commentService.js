const CommentRepository = require("../repositories/commentRepository");

class CommentService {
  async save(comment) {
    return await CommentRepository.save(comment);
  }

  async show(id) {
    return await CommentRepository.show(id);
  }

  async findAll() {
    return await CommentRepository.findAll();
  }

  async update(comment, obj) {
    return await CommentRepository.update(comment, obj);
  }

  async delete(comment) {
    return await CommentRepository.delete(comment);
  }
}

module.exports = new CommentService();
