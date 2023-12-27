const express = require("express");
const ctrls = require("../controllers/workouts");
const { validateBody, isValidId, authenticate } = require("../middlewares");
const { schemas } = require("../models/workout");
const router = express.Router();

router.get("/", authenticate, ctrls.getAllWorkouts);

router.get("/:id", authenticate, isValidId, ctrls.getWorkout);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrls.addWorkout
);

router.delete("/:id", authenticate, isValidId, ctrls.deleteWorkout);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  ctrls.updateWorkout
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrls.updateFavorite
);

module.exports = router;