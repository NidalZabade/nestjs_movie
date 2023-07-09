import * as joi from 'joi';

const movieSchema = joi.object().keys({
  id: joi.number().required(),
  title: joi.string().required(),
  release_year: joi.number(),
  director_id: joi.number(),
  duration: joi.number(),
  stream_start_date: joi.date(),
  stream_end_date: joi.date(),
  deleted_at: joi.date(),
});

export default movieSchema;
