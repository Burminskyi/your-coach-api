const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const userParamsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userParamsSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  date: Joi.date().required(),
  age: Joi.number().required(),
  height: Joi.number().required(),
  weight: Joi.number().required(), // Разрешить null для тех параметров, которые не требуется обновлять
  chestCircumference: Joi.number().allow(null),
  waistCircumference: Joi.number().allow(null),
  hipCircumference: Joi.number().allow(null),
  bicepsCircumference: Joi.number().allow(null),
  calfCircumference: Joi.number().allow(null),
  neckCircumference: Joi.number().allow(null),
});

const updateSchema = Joi.object({
  age: Joi.number(),
  height: Joi.number(),
  weight: Joi.number(),
  chestCircumference: Joi.number(),
  waistCircumference: Joi.number(),
  hipCircumference: Joi.number(),
  bicepsCircumference: Joi.number(),
  calfCircumference: Joi.number(),
  neckCircumference: Joi.number(),
});

const schemas = {
  addSchema,
  updateSchema,
};

const Params = model("params", userParamsSchema);

module.exports = { Params, schemas };
