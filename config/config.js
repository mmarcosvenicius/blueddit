module.exports = {
  development: {
    username: process.env.DEVELOP_USER,
    password: process.env.DEVELOP_PASSWORD,
    database: process.env.DEVELOP_DATABASE,
    host: process.env.DEVELOP_HOST,
    dialect: "mysql",
  },
  test: {
    username: process.env.TEST_USER,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: "mysql",
  },
  production: {
    username: process.env.PRODUCTION_USER,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE,
    host: process.env.PRODUCTION_HOST,
    dialect: "mysql",
  },
};
