// validators/user.validator.js
import Joi from 'joi';

export const userSchemaAccessValidator = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().trim().required(),
});
