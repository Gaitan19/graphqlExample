import * as express from "express"
import { AppDataSource } from "../data-source"
import { InvoiceDetails } from "../entity/InvoiceDetails"
import { Invoice } from "../entity/Invoice"
import { schemasInvoiceDetails } from "../../schemas/schemasInvoiceDetails"
import { middleware } from "../../middlewares/middlewares"

const invoiceDetailRouter = express.Router()

invoiceDetailRouter.get('/', async (req, res) => {
    const invoiceDetails = await AppDataSource.getRepository(InvoiceDetails).find({
        relations: {
            invoice: true,
        }
    })

    res.json(invoiceDetails)
})

invoiceDetailRouter.get('/:invoiceDetailId', middleware(schemasInvoiceDetails.invoiceDetailIdSchema, 'params'), async (req, res) => {
    const id = req.params.invoiceDetailId
    const response = await AppDataSource.getRepository(InvoiceDetails).createQueryBuilder().where("id = :id", { id }).getOne()

    res.json(response)
})

invoiceDetailRouter.post('/', middleware(schemasInvoiceDetails.invoiceDetailPostSchema, 'body'), async (req, res) => {
    const { quantity, price, invoiceId } = req.body

    const invoiceFound = await AppDataSource.getRepository(Invoice).createQueryBuilder("invoice").where(
        "id = :id", { id: invoiceId }
    ).getOne()

    const invoiceDetails = new InvoiceDetails()
    invoiceDetails.invoice = invoiceFound
    invoiceDetails.quantity = quantity
    invoiceDetails.price = price

    const response = await AppDataSource.manager.save(invoiceDetails)
    return res.json(response)
})

invoiceDetailRouter.put('/:invoiceDetailId', middleware(schemasInvoiceDetails.invoiceDetailIdSchema, 'params'), middleware(schemasInvoiceDetails.invoiceDetailPutSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceDetailId
    const { quantity, price } = req.body
    const response = await AppDataSource.createQueryBuilder().update(InvoiceDetails).set({ quantity, price }).where("id = :id", { id }).execute()

    res.json(response.raw)
})

invoiceDetailRouter.delete('/:invoiceDetailId', middleware(schemasInvoiceDetails.invoiceDetailIdSchema, 'params'), async (req, res) => {
    const id = req.params.invoiceDetailId
    const response = await AppDataSource.createQueryBuilder().delete().from(InvoiceDetails).where("id = :id", { id }).execute()
    res.json(response.raw)
})

invoiceDetailRouter.patch('/quantity/:invoiceDetailId', middleware(schemasInvoiceDetails.invoiceDetailIdSchema, 'params'), middleware(schemasInvoiceDetails.invoiceDetailPutSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceDetailId
    const { quantity } = req.body

    const response = await AppDataSource.createQueryBuilder().update(InvoiceDetails).set({ quantity }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

invoiceDetailRouter.patch('/price/:invoiceDetailId', middleware(schemasInvoiceDetails.invoiceDetailIdSchema, 'params'), middleware(schemasInvoiceDetails.invoiceDetailPutSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceDetailId
    const { price } = req.body

    const response = await AppDataSource.createQueryBuilder().update(InvoiceDetails).set({ price }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

export { invoiceDetailRouter }