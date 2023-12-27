const { Workout } = require("../models/workout");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllWorkouts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Workout.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json(result);
};

const getWorkout = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Workout.findById(id);

  if (!result || owner.toString() !== result.owner.toString()) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addWorkout = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Workout.create({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteWorkout = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Workout.findOneAndRemove({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "delete success" });
};

const updateWorkout = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Workout.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Workout.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getAllWorkouts: ctrlWrapper(getAllWorkouts),
  getWorkout: ctrlWrapper(getWorkout),
  addWorkout: ctrlWrapper(addWorkout),
  deleteWorkout: ctrlWrapper(deleteWorkout),
  updateWorkout: ctrlWrapper(updateWorkout),
  updateFavorite: ctrlWrapper(updateFavorite),
};
