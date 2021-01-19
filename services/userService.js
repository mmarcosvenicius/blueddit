const UserRepository = require("../repositories/userRepository");

class UserService {
  async save(user) {
    return await UserRepository.save(user);
  }

  async show(id) {
    return await UserRepository.show(id);
  }

  async findAll() {
    return await UserRepository.findAll();
  }

  async findOne(email) {
    return await UserRepository.findOne(email);
  }
}

module.exports = new UserService();
