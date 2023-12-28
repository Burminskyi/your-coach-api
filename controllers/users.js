const fs = require("fs/promises");
const path = require("path");
const { HttpError, ctrlWrapper } = require("../helpers");
const { User } = require("../models/user");

const avatarsPath = path.resolve("public", "avatars");

// const getCurrent = (req, res) => {
//   const { _id, name, email, avatar, birthday, skype, phone } = req.user;
//   res.json({
//     _id,
//     name,
//     email,
//     avatar,
//     birthday,
//     skype,
//     phone,
//   });
// };

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


module.exports = {
    updateUserAvatar: ctrlWrapper(updateUserAvatar),
  //   getCurrent: ctrlWrapper(getCurrent),
};
