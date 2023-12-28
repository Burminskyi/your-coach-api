const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: null,
    },
    userParams: [
      {
        date: {
          type: Date,
          required: true,
        },
        weight: {
          type: Number,
        },
        chestCircumference: {
          type: Number,
        },
        waistCircumference: {
          type: Number,
        },
        hipCircumference: {
          type: Number,
        },
        bicepsCircumference: {
          type: Number,
        },
        calfCircumference: {
          type: Number,
        },
        neckCircumference: {
          type: Number,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const updateAvatarSchema = Joi.object({
  avatar: Joi.string().required(),
});

const updateParamsSchema = Joi.object({
  date: Joi.date().required(),
  weight: Joi.number().allow(null), // Разрешить null для тех параметров, которые не требуется обновлять
  chestCircumference: Joi.number().allow(null),
  waistCircumference: Joi.number().allow(null),
  hipCircumference: Joi.number().allow(null),
  bicepsCircumference: Joi.number().allow(null),
  calfCircumference: Joi.number().allow(null),
  neckCircumference: Joi.number().allow(null),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateAvatarSchema,
  updateParamsSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
