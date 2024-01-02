import * as express from "express"
import { AppDataSource } from "../data-source"
import { Invoice } from "../entity/Invoice"
import { schemasInvoice } from "../../schemas/schemasInvoice"
import { middleware } from "../../middlewares/middlewares"

const invoiceRouter = express.Router()

invoiceRouter.get('/', async (req, res) => {
    const invoice = await AppDataSource.getRepository(Invoice).find({
        relations: {
            invoiceDetails: true
        }
    })

    res.json(invoice)
})

invoiceRouter.get('/:invoiceId', middleware(schemasInvoice.invoiceIdSchema, 'params'), async (req, res) => {
    const id = req.params.invoiceId
    const response = await AppDataSource.getRepository(Invoice).createQueryBuilder().where("id = :id", { id }).getOne()

    res.json(response)
})

invoiceRouter.post('/', middleware(schemasInvoice.invoicePostSchema, 'body'), async (req, res) => {
    const { total, client } = req.body

    const invoice = new Invoice()
    invoice.total = total
    invoice.client = client

    const response = await AppDataSource.manager.save(invoice)

    return res.json(response)
})

invoiceRouter.put('/:invoiceId', middleware(schemasInvoice.invoiceIdSchema, 'params'), middleware(schemasInvoice.invoicePostSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceId
    const { total, client } = req.body
    const response = await AppDataSource.createQueryBuilder().update(Invoice).set({ total, client }).where("id = :id", { id }).execute()

    res.json(response.raw)
})

invoiceRouter.delete('/:invoiceId', middleware(schemasInvoice.invoiceIdSchema, 'params'), async (req, res) => {
    const id = req.params.invoiceId
    const response = await AppDataSource.createQueryBuilder().delete().from(Invoice).where("id = :id", { id }).execute()
    res.json(response.raw)
})

invoiceRouter.patch('/total/:invoiceId', middleware(schemasInvoice.invoiceIdSchema, 'params'), middleware(schemasInvoice.invoicePatchSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceId
    const { total } = req.body

    const response = await AppDataSource.createQueryBuilder().update(Invoice).set({ total }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

invoiceRouter.patch('/client/:invoiceId', middleware(schemasInvoice.invoiceIdSchema, 'params'), middleware(schemasInvoice.invoicePatchSchema, 'body'), async (req, res) => {
    const id = req.params.invoiceId
    const { client } = req.body

    const response = await AppDataSource.createQueryBuilder().update(Invoice).set({ client }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

export { invoiceRouter }