import Joi from "joi";

import { BookReviewParams } from "./interfaces";

const validator = Joi.object({
  title: Joi.string().max(255).required(),
  body: Joi.string().required(),
  score: Joi.number().integer().min(1).max(5).required(),
  reviewer: Joi.ref("title"),
});

export function validate(params: BookReviewParams): string[] | undefined {
  const { error } = validator.validate(params, {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  });

  if (!error) {
    return;
  }

  return error.details.map(({ message }) => message);
}
