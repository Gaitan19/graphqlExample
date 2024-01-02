import * as Joi from "joi";

export const schemasProducts = {
    productPostSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        categoryId: Joi.number().min(1).required(),
        invoiceDetailsId: Joi.number().min(1).required(),
    }),
    productPatchSchema: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
    }),
    productIdSchema: Joi.object().keys({
        productId: Joi.number().integer().min(1),
    }),
};
