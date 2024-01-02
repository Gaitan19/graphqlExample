import * as Joi from "joi";

export const schemasCategory = {
  categoryPostSchema: Joi.object().keys({
    name: Joi.string().required(),
  }),
  categoryIdSchema: Joi.object().keys({
    categoryId: Joi.number().integer().min(1),
  }),
};
