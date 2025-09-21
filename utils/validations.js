const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).max(15),
});

const loginSchema = Joi.object({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).max(15),
});

module.exports = {
  signupSchema,
  loginSchema,
};
