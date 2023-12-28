const express = require("express");

const { authenticate, upload, validateBody, isValidId } = require("../middlewares");
const userCtrl = require("../controllers/users");
const authCtrl = require("../controllers/auth");
const { schemas } = require("../models/userParams");

const userRouter = express.Router();

userRouter.get("/current", authenticate, authCtrl.getCurrent);

userRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatar", 1),
  userCtrl.updateUserAvatar
);

userRouter.get("/params", authenticate, userCtrl.getAllParams);

userRouter.get("/params/:id", authenticate, isValidId, userCtrl.getParams);

userRouter.post(
  "/params",
  authenticate,
  validateBody(schemas.addSchema),
  userCtrl.addParams
);

userRouter.delete("/params/:id", authenticate, isValidId, userCtrl.deleteParams);

userRouter.put(
  "/params/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  userCtrl.updateParams
);

module.exports = userRouter;
