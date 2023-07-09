import * as joi from 'joi';

export const historySchema = joi.object().keys({
  id: joi.number().required(),
  user_id: joi.number().required(),
  movie_id: joi.number().required(),
  watching_time: joi.number(),
  is_completed: joi.boolean(),
  deleted_at: joi.date(),
});
