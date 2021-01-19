const userService = require("../services/userService");

const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class UserController {
  //Sign up
  signUp(req, res) {
    userService
      .findOne(req.body.email)
      .then((result) => {
        if (result) {
          return res.status(409).json({
            message: "Email already exists!",
          });
        } else {
          bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, function (err, hash) {
              const user = {
                name: req.body.name,
                email: req.body.email,
                password: hash,
              };
              userService
                .save(user)
                .then((result) => {
                  return res.status(201).json({
                    message: "User created successfully",
                  });
                })
                .catch((error) => {
                  return res.status(500).json({
                    message: "Something went wrong!",
                  });
                });
            });
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Something went wrong!",
          err: error,
        });
      });
  }

  //login
  login(req, res) {
    userService
      .findOne(req.body.email)
      .then((user) => {
        if (user === null) {
          return res.status(401).json({
            message: "Invalid credentials!"
          });
        } else {
          bcryptjs.compare(
            req.body.password,
            user.password,
            function (err, result) {
              if (result) {
                const token = jwt.sign(
                  {
                    email: user.email,
                    userId: user.id,
                  },
                  process.env.SECRET_JWT_KEY || "secreto",
                  { expiresIn: "24h" },
                  function (err, token) {
                    return res.status(200).json({
                      message: "Authentication successful!",
                      token: token
                    });
                  }
                );
              } else {
                return res.status(401).json({
                  message: "Invalid credentials!"
                });
              }
            }
          );
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong!",
          error
        });
      });
  }

  show(req, res) {
    const id = req.params.id;

    userService
      .show(id)
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404).json({
            message: "Post not found!"
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Something went wrong!",
          error
        });
      });
  }

  async index(req, res) {
    
    try {
      const response = await userService.findAll();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error,
      });
    }
  }
}

module.exports = new UserController();
