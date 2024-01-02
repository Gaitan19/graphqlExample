import * as Joi from "joi";

export const schemasInvoice = {
    invoicePostSchema: Joi.object().keys({
        total: Joi.number().min(1).max(100).required(),
        client: Joi.string().required()
    }),
    invoicePatchSchema: Joi.object().keys({
        total: Joi.number().min(1).max(100),
        client: Joi.string()
    }),
    invoiceIdSchema: Joi.object().keys({
        invoiceId: Joi.number().integer().min(1),
    }),
};
