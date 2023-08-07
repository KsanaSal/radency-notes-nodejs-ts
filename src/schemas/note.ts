import Joi from 'joi';

const noteSchema = Joi.object({
  categoryId: Joi.string().required(),
  categoryName: Joi.string().required(),
  categoryImg: Joi.string().required(),
  content: Joi.string().required(),
  nameTitle: Joi.string().required(),
});

const patchNoteSchema = Joi.object({
  categoryId: Joi.string(),
  categoryName: Joi.string(),
  categoryImg: Joi.string(),
  content: Joi.string(),
  nameTitle: Joi.string(),
  archived: Joi.boolean(),
});
const schemas = {
  noteSchema,
  patchNoteSchema,
};

export default schemas;
