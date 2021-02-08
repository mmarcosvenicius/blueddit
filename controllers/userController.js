const userService = require("../services/userService");

const { hashPassword, comparePassword } = require("../utils/_bcrypt");
// const jwt = require("jsonwebtoken");
const Validator = require("fastest-validator");

class UserController {
  //Sign up

  async signUp(req, res) {
    const user = Object.assign({});
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    const schema = {
      name: { type: "string", optional: false, max: '255' },
      email: { type: "string", optional: false, max: '255' },
      password: { type: "string", optional: false, min: '5' },
    };

    const v = new Validator();
    const validationResponse = v.validate(user, schema);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationResponse,
      });
    }

    try {

      const existsUser = await userService.findOne(user.email);

      if (existsUser) {
        return res.status(409).json({
          message: "Email already exists!",
        });
      }

      const hash = await hashPassword(user.password);
      user.password = hash;

      // const response = await userService.save(user);

      return res.status(201).json({
        message: "User created successfully",
        data: response
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error
      });
    }
  }

  //login
  async login(req, res) {

    try {
      let user = await userService.findOne(req.body.email);
      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials!"
        });
      }

      user = { ...user.dataValues };
      const token = await comparePassword(req.body.password, user);

      if (typeof token === 'string') {
        return res.status(200).json({
          message: "Authentication successful!",
          token
        });
      }
      return res.status(401).json({
        message: "Invalid credentials!"
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error
      });
    }

  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const response = await userService.show(id);
      if (response) {
        return res.status(200).json({
          message: 'Data obtained successfully',
          response
        });
      }
      return res.status(404).json({
        message: "User not found",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }

  async index(req, res) {

    try {
      const response = await userService.findAll();
      return res.status(200).json({
        message: 'Data obtained successfully',
        data: response
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }
}

module.exports = new UserController();
