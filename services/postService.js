const PostRepository = require("../repositories/postRepository");

class PostService {
  async save(user) {
    return await PostRepository.save(user);
  }

  async show(id) {
    return await PostRepository.show(id);
  }

  async findAll() {
    return await PostRepository.findAll();
  }

  async update(post, obj) {
    return await PostRepository.update(post, obj);
  }

  async delete(post) {
    return await PostRepository.delete(post);
  }
}

module.exports = new PostService();
