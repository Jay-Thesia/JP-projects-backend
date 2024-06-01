import { commonValidation } from '@common/validation';
import Joi from 'joi';
export const loginSchema = Joi.object({
    email: Joi.string().allow('').required(),
    password: commonValidation.passwordCommon.label('password'),
   
  }).options({
    abortEarly: false,
  });