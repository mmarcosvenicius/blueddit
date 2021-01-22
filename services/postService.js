const PostRepository = require("../repositories/postRepository");

class PostService {
  async save(post) {
    return await PostRepository.save(post);
  }

  async show(id) {
    return await PostRepository.show(id);
  }

  async findAll() {
    return await PostRepository.findAll();
  }

  async findAllPaginated(condition, limit, offset) {
    return await PostRepository.findAllPaginated(condition, limit, offset);
  }

  async update(post, obj) {
    return await PostRepository.update(post, obj);
  }

  async delete(post) {
    return await PostRepository.delete(post);
  }
}

module.exports = new PostService();
