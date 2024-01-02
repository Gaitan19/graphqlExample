import * as express from "express"
import { AppDataSource } from "../data-source"
import { Category } from "../entity/Category"
import { schemasCategory } from "../../schemas/schemasCategory"
import { middleware } from "../../middlewares/middlewares"

const categoryRouter = express.Router()

categoryRouter.get('/', async (req, res) => {
    const categoryRepository = AppDataSource.getRepository(Category)
    const categories = await categoryRepository.find({
        relations: {
            products: true,
        }
    })
    res.json(categories)
})


// categoryRouter.get('/:categoryId', async (req, res) => {
//     const id = req.params.categoryId
//     const response = await AppDataSource.getRepository(Category).createQueryBuilder().where("id = :id", { id }).getOne()
//     res.json(response)
// })

categoryRouter.get('/:categoryId', middleware(schemasCategory.categoryIdSchema, 'params'), async (req, res) => {
    const id = req.params.categoryId
    const response = await AppDataSource.getRepository(Category).createQueryBuilder().where("id = :id", { id }).getOne()
    res.json(response)
})

categoryRouter.post('/', middleware(schemasCategory.categoryPostSchema, 'body'), async (req, res) => {
    const { name } = req.body;
    const response = await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([
            { name: name },
        ])
        .execute()

    res.json(response.raw);
})

categoryRouter.put('/:categoryId', middleware(schemasCategory.categoryPostSchema, 'body'), async (req, res) => {
    const id = req.params.categoryId
    const { name } = req.body
    const response = await AppDataSource.createQueryBuilder().update(Category).set({ name }).where("id = :id", { id }).execute()
    res.json(response.raw)
})

categoryRouter.delete('/:categoryId', middleware(schemasCategory.categoryIdSchema, 'params'), async (req, res) => {
    const id = req.params.categoryId

    const response = await AppDataSource.createQueryBuilder().delete().from(Category).where("id = :id", { id }).execute()
    res.json(response.raw)
})

categoryRouter.patch("/name/:categoryId", middleware(schemasCategory.categoryPostSchema, 'body'), async (req, res) => {
    const id = req.params.categoryId
    const { name: updatedName } = req.body

    const response = await AppDataSource.getRepository(Category).createQueryBuilder().update().set({ name: updatedName }).where("id = :id", { id }).execute()
    res.json(response.raw)
})


export { categoryRouter }
