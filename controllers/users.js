const fs = require("fs/promises");
const path = require("path");
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");
const { Params } = require("../models/userParams");

const avatarsPath = path.resolve("public", "avatars");

const updateUserAvatar = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  fs.rename(oldPath, newPath);
  const avatar = path.join("public", "posters", filename);
  const result = await User.findOneAndUpdate(req.user._id, {
    ...req.body,
    avatar,
  });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "User info successfully updated" });
};

const getAllParams = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Params.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");

  res.json(result);
};

const getParams = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Params.findById(id);

  if (!result || owner.toString() !== result.owner.toString()) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addParams = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Params.create({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteParams = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Params.findOneAndRemove({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "delete success" });
};

const updateParams = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Params.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
  getAllParams: ctrlWrapper(getAllParams),
  getParams: ctrlWrapper(getParams),
  addParams: ctrlWrapper(addParams),
  deleteParams: ctrlWrapper(deleteParams),
  updateParams: ctrlWrapper(updateParams),
};
