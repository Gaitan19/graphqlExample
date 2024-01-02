import * as Joi from "joi";

export const schemasInvoiceDetails = {
    invoiceDetailPostSchema: Joi.object().keys({
        quantity: Joi.number().min(1).max(100).required(),
        price: Joi.number().min(1).required(),
        invoiceId: Joi.number().required()
    }),
    invoiceDetailPutSchema: Joi.object().keys({
        quantity: Joi.number().min(1).max(100),
        price: Joi.number().min(1),
    }),
    invoiceDetailIdSchema: Joi.object().keys({
        invoiceDetailId: Joi.number().integer().min(1),
    }),
};
