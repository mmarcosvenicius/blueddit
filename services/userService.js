const UserRepository = require('../repositories/userRepository');



class UserService {
    async create (user) {
        return await UserRepository.create(user);
    }
    
    async findOne (email) {
        return await UserRepository.findOne(email);
    }
}

module.exports = new UserService();