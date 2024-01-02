import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Product } from "./entity/Products"
import { Invoice } from "./entity/Invoice"
import { InvoiceDetails } from "./entity/InvoiceDetails"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "typeormdb",
    synchronize: true,
    logging: false,
    entities: [ Category, Product, Invoice, InvoiceDetails],
    migrations: [],
    subscribers: [],
})
