const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

class Auth {
  checkAuth(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_JWT_KEY
      );
      req.userData = decodedToken;
      next();
    } catch (e) {
      return res.status(401).json({
        message: "Invalid or expired token provided!",
        error: e,
      });
    }
  }
}

module.exports = new Auth();
