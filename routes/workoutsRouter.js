const express = require("express");
const ctrls = require("../controllers/workouts");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { schemas } = require("../models/workout");
const router = express.Router();

router.get("/", authenticate, ctrls.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrls.getContact);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrls.addContact
);

router.delete("/:id", authenticate, isValidId, ctrls.deleteContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrls.updateContact
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrls.updateFavorite
);

module.exports = router;