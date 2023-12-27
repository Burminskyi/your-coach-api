const express = require("express");

const { validateBody, authenticate } = require("../middlewares");
const { schemas } = require("../models/user")
const ctrl = require("../controllers/auth")

const authRouter = express.Router();

authRouter.post("/register", validateBody(schemas.registerSchema), ctrl.register)

authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

module.exports = authRouter;
