import * as express from "express"
import { AppDataSource } from "../data-source"
import { Product } from "../entity/Products"
import { Category } from "../entity/Category"
import { InvoiceDetails } from "../entity/InvoiceDetails"
import { middleware } from "../../middlewares/middlewares"
import { schemasProducts } from "../../schemas/schemasProduct"


const productRouter = express.Router()

productRouter.get('/', async (req, res) => {
    const productRepository = AppDataSource.getRepository(Product)
    const products = await productRepository.find({
        relations: {
            category: true,
        }
    })
    res.json(products)
})

productRouter.get('/:productId', middleware(schemasProducts.productIdSchema, 'params'), async (req, res) => {
    const id = req.params.productId
    const response = await AppDataSource.getRepository(Product).createQueryBuilder().where("id = :id", { id }).getOne()

    res.json(response)
})

productRouter.post('/', middleware(schemasProducts.productPostSchema, 'body'), async (req, res) => {
    const { name, description, categoryId, invoiceDetailsId } = req.body

    const categoryFound = await AppDataSource.getRepository(Category).createQueryBuilder("category").where(
        "id = :id", { id: categoryId }
    ).getOne()

    const invoiceDetailsFound = await AppDataSource.getRepository(InvoiceDetails).createQueryBuilder("invoice").where(
        "id = :id", { id: invoiceDetailsId }
    ).getOne()

    const product = new Product()
    product.name = name
    product.description = description
    product.category = categoryFound
    product.invoiceDetails = invoiceDetailsFound
    const response = await AppDataSource.manager.save(product)

    res.json(response)
})

productRouter.put('/:productId', middleware(schemasProducts.productIdSchema, 'params'), middleware(schemasProducts.productPatchSchema, 'body'), async (req, res) => {
    const id = req.params.productId
    const { name, description } = req.body
    const response = await AppDataSource.createQueryBuilder().update(Product).set({ name, description }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

productRouter.delete('/:productId', middleware(schemasProducts.productIdSchema, 'params'), async (req, res) => {
    const id = req.params.productId
    const response = await AppDataSource.createQueryBuilder().delete().from(Product).where("id = :id", { id }).execute()
    res.json(response.raw)
})

productRouter.patch('/name/:productId', middleware(schemasProducts.productIdSchema, 'params'), middleware(schemasProducts.productPatchSchema, 'body'), async (req, res) => {
    const id = req.params.productId
    const { name: updatedName } = req.body

    const response = await AppDataSource.createQueryBuilder().update(Product).set({ name: updatedName }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

productRouter.patch('/description/:productId', middleware(schemasProducts.productIdSchema, 'params'), middleware(schemasProducts.productPatchSchema, 'body'), async (req, res) => {
    const id = req.params.productId
    const { description: updatedDescription } = req.body

    const response = await AppDataSource.createQueryBuilder().update(Product).set({ description: updatedDescription }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

export { productRouter }