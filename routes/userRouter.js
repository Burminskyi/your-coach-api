const express = require("express");

const { authenticate, upload } = require("../middlewares");
const userCtrl = require("../controllers/users")
const authCtrl = require("../controllers/auth")

const userRouter = express.Router();

// userRouter.get("/current", authenticate, ctrl.getCurrent);
userRouter.get("/current", authenticate, authCtrl.getCurrent);

userRouter.patch(
  "/edit",
  authenticate,
  upload.single("avatar", 1),
  userCtrl.updateUserAvatar
);

module.exports = userRouter;