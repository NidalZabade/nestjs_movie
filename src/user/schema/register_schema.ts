import * as joi from 'joi';

const registerSchema = joi.object().keys({
  id: joi.number().required(),
  name: joi.string().required(),
  address: joi.string(),
  mobile: joi.string().required(),
  email: joi.string().required(),
  username: joi.string(),
  password: joi.string(),
  subscribed: joi.boolean(),
  deleted_at: joi.date(),
});

export default registerSchema;
