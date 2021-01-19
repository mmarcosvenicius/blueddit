const { User } = require("../models");

class UserRepository {
  async save(user) {
    return await User.create(user);
  }

  async show(id) {
    return await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'isActive']
    });
  }

  async findAll() {
    return await User.findAll({
      attributes: ['id', 'name', 'email', 'isActive']
    });
  }

  async findOne(email) {
    return await User.findOne({ where: { email: email } });
  }
}

module.exports = new UserRepository();
