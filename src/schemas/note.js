import Joi from 'joi';
// const { object, string } = Joi;

const noteSchema = Joi.object({
  categoryId: Joi.string().required(),
  categoryName: Joi.string().required(),
  categoryImg: Joi.string().required(),
  content: Joi.string().required(),
  nameTitle: Joi.string().required(),
});

export default noteSchema;
