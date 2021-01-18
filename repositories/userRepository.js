const { User } = require('../models');



class UserRepository {
    async create(user) {
        return await User.create(user)
    }
    async findOne(email) {
        return await User.findOne({where: {email: email}})
    }
}

module.exports = new UserRepository();