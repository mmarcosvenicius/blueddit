const { Router } = require('express');
const userController = require('./controllers/userController');
const routes = Router();


routes.post('/sign-up', userController.signUp);
routes.post('/login', userController.login)

module.exports = routes;