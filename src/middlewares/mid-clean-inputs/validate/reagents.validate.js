import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

export const reagentSchemaCreateValidator = Joi.object({
  casNumber: Joi.string().trim().required(),
  reagentName: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  classe: Joi.string().trim().required(),
  quantity: Joi.number().min(1).required(),
  composition: Joi.array()
    .items(
      Joi.object({
        substance: Joi.string().trim().allow('', null),
        concentration: Joi.string().trim().allow('', null),
      })
    )
    .optional(),
  brand: Joi.string().trim().required(),
  manufactureDate: Joi.date().required(),
  expiryDate: Joi.date().required(),
  information: Joi.array().items(Joi.string().trim()).optional(),
  classification: Joi.string().trim().required(),
  local: Joi.string().trim().required(),
  volume: Joi.string().trim().required(),
  weight: Joi.string().trim().required(),
  molecularFormula: Joi.string().trim().required(),
  molecularWeight_g_per_mol: Joi.string().trim().required(),
  furtherInformations: Joi.string().trim().allow('').optional(),
  createdBy: objectIdValidator.optional(),
});

export const reagentSchemaUpdateValidator = reagentSchemaCreateValidator;
