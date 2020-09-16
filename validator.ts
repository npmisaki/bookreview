import Joi from "joi";

export const validator = Joi.object({
  title: Joi.string().max(255).required(),
  body: Joi.string().required(),
  score: Joi.number().integer().min(1).max(5).required(),
  reviewer: Joi.string().max(255).required(),
});
