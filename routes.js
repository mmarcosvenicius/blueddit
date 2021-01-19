const { Router } = require("express");
const postController = require("./controllers/postController");
const userController = require("./controllers/userController");

const auth = require("./middlewares/auth");

const routes = Router();

routes.post("/sign-up", userController.signUp);
routes.post("/login", userController.login);
routes.get("/users", auth.checkAuth, userController.index);
routes.get("/users/:id", auth.checkAuth, userController.show);

routes.post("/posts", auth.checkAuth, postController.save);
routes.get("/posts", auth.checkAuth, postController.index);
routes.get("/posts/:id", auth.checkAuth, postController.show);
routes.patch("/posts/:id", auth.checkAuth, postController.update);
routes.delete("/posts/:id", auth.checkAuth, postController.delete);

module.exports = routes;
