const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function hashPassword(password, saltRounds = 10) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcryptjs.hash(password.toString(), saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });

  return hashedPassword;
}

async function comparePassword(bodyPassword, user) {
  const comparedPassword = await new Promise((resolve, reject) => {
    bcryptjs.compare(bodyPassword.toString(), user.password, function (err, result) {
      if (err) {
        reject(err);
      }
      const jwtToken = jwt.sign(
        {
          email: user.email,
          userId: user.id,
          isActive: user.isActive
        },
        process.env.SECRET_JWT_KEY || "secreto",
        { expiresIn: "24h" },
        function (err, token) {
          resolve(token);
        }
      );
    });

  });

  return comparedPassword;
}


module.exports = { hashPassword, comparePassword };
